const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const MathClass = require('./math');

const PORT = Number(process.env.PORT || process.env.APP_PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

const DEMO_USERS = [
  {
    id: 1,
    name: 'Administrador ES6',
    email: 'admin@es6.dev',
    password: 'Password@123',
    role: 'Admin / Tech Lead',
    permissions: ['full_access', 'run_tests', 'manage_modules', 'inspect_metrics'],
  },
  {
    id: 2,
    name: 'Instrutor Celso / DIO',
    email: 'instrutor@es6.dev',
    password: 'Password@123',
    role: 'Instrutor',
    permissions: ['run_tests', 'manage_modules'],
  },
  {
    id: 3,
    name: 'Desenvolvedor Aluno',
    email: 'dev@es6.dev',
    password: 'Password@123',
    role: 'Developer',
    permissions: ['run_tests'],
  },
];

const sessions = new Map();
const math = new MathClass();
const usersEmitter = new MathClass.Users();
const activityLog = [];

usersEmitter.on('User logged', (payload) => {
  activityLog.unshift({
    event: 'User logged',
    user: payload.user,
    email: payload.email,
    role: payload.role,
    timestamp: new Date().toISOString(),
  });
  if (activityLog.length > 25) activityLog.pop();
});

function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((acc, part) => {
    const [k, ...v] = part.trim().split('=');
    if (k) acc[k] = decodeURIComponent(v.join('='));
    return acc;
  }, {});
}

function getSessionUser(req) {
  const cookies = parseCookies(req.headers.cookie || '');
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const token = bearerToken || cookies.es6_session;

  if (!token || !sessions.has(token)) return null;
  return { token, ...sessions.get(token) };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) req.destroy();
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(new Error('JSON inválido no corpo da requisição.'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  });
  res.end(body);
}

function serveStaticFile(res, filePath, contentType = 'text/html; charset=utf-8') {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      sendJson(res, 404, { error: 'Arquivo não encontrado' });
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

async function runAutomatedSpecSuite() {
  const results = [];
  const record = async (title, fn) => {
    const start = Date.now();
    try {
      const detail = await fn();
      results.push({
        title,
        status: 'passed',
        durationMs: Date.now() - start,
        detail,
      });
    } catch (error) {
      results.push({
        title,
        status: 'failed',
        durationMs: Date.now() - start,
        error: error.message,
      });
    }
  };

  await record('Math.sum (Assíncrono com Callback)', () =>
    new Promise((resolve, reject) => {
      math.sum(5, 5, (val) => {
        if (val !== 10) return reject(new Error(`Esperado 10, obtido ${val}`));
        resolve('5 + 5 = 10 (callback)');
      });
    })
  );

  await record('Math.multiply (Default Function Arguments)', async () => {
    const r1 = math.multiply(0, 5);
    const r2 = math.multiply(7);
    if (r1 !== 0 || r2 !== 7) throw new Error('Falha na multiplicação padrão');
    return 'multiply(0, 5) = 0 | multiply(7) = 7';
  });

  await record('Math.printSum (Spy / Mock de res.load)', async () => {
    let calledWith = null;
    const reqMock = {};
    const resMock = {
      load(view, total) {
        calledWith = { view, total };
      },
    };
    math.printSum(reqMock, resMock, 5, 5);
    if (!calledWith || calledWith.view !== 'index' || calledWith.total !== 10) {
      throw new Error('Spy não capturou chamada correta');
    }
    return `res.load('${calledWith.view}', ${calledWith.total}) verificado`;
  });

  await record('Math.sumRest (Rest Operator ...args)', async () => {
    const res = math.sumRest(5, 5, 10, 20, 15);
    if (res !== 55) throw new Error(`Esperado 55, obtido ${res}`);
    return 'sumRest(5, 5, 10, 20, 15) = 55';
  });

  await record('Math.numberGenerator (ES6 Generator & Symbol.iterator)', async () => {
    const seq = [...math.numberGenerator(10, 4, 5)];
    if (seq.join(',') !== '10,15,20,25') throw new Error('Sequência incorreta');
    return `Sequência gerada: [${seq.join(', ')}]`;
  });

  await record('Math.calculateAsync (Promises & Async/Await)', async () => {
    const out = await math.calculateAsync(8, 7, 'multiply');
    if (out.result !== 56) throw new Error('Resultado assíncrono incorreto');
    return `8 * 7 = ${out.result} (${out.status})`;
  });

  return {
    total: results.length,
    passed: results.filter((r) => r.status === 'passed').length,
    failed: results.filter((r) => r.status === 'failed').length,
    results,
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, {
      status: 'ok',
      service: 'curso-javascript-es6-avancado',
      environment: process.env.APP_ENV || 'local',
      timestamp: new Date().toISOString(),
    });
  }

  if (req.method === 'GET' && pathname === '/api/auth/demo-users') {
    return sendJson(res, 200, {
      users: DEMO_USERS.map(({ id, name, email, password, role, permissions }) => ({
        id,
        name,
        email,
        password,
        role,
        permissions,
      })),
    });
  }

  if (req.method === 'POST' && pathname === '/api/auth/login') {
    try {
      const body = await readJsonBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');

      const found = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email && u.password === password
      );

      if (!found) {
        return sendJson(res, 401, {
          authenticated: false,
          message: 'Credenciais inválidas. Utilize um dos perfis de demonstração.',
        });
      }

      const token = crypto.randomBytes(24).toString('hex');
      const sessionData = {
        user: {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role,
          permissions: found.permissions,
        },
        loggedInAt: new Date().toISOString(),
      };
      sessions.set(token, sessionData);
      usersEmitter.userLogged({
        user: found.name,
        email: found.email,
        role: found.role,
      });

      return sendJson(
        res,
        200,
        {
          authenticated: true,
          token,
          user: sessionData.user,
          loggedInAt: sessionData.loggedInAt,
        },
        {
          'Set-Cookie': `es6_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
        }
      );
    } catch (err) {
      return sendJson(res, 400, { message: err.message });
    }
  }

  if (req.method === 'POST' && pathname === '/api/auth/logout') {
    const current = getSessionUser(req);
    if (current && current.token) {
      sessions.delete(current.token);
    }
    return sendJson(
      res,
      200,
      { authenticated: false, message: 'Sessão encerrada com sucesso.' },
      {
        'Set-Cookie': 'es6_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
      }
    );
  }

  if (req.method === 'GET' && pathname === '/api/auth/session') {
    const current = getSessionUser(req);
    if (!current) {
      return sendJson(res, 200, { authenticated: false, user: null });
    }
    return sendJson(res, 200, {
      authenticated: true,
      user: current.user,
      loggedInAt: current.loggedInAt,
    });
  }

  if (req.method === 'POST' && pathname === '/api/es6/execute') {
    const current = getSessionUser(req);
    if (!current) {
      return sendJson(res, 401, { message: 'Sessão expirada ou usuário não autenticado.' });
    }

    try {
      const body = await readJsonBody(req);
      const { feature, params = {} } = body;

      if (feature === 'sum') {
        const a = Number(params.a ?? 5);
        const b = Number(params.b ?? 5);
        const result = await new Promise((resolve) => math.sum(a, b, resolve));
        return sendJson(res, 200, {
          feature: 'Arrow Functions & Async Callback (Math.sum)',
          input: { a, b },
          output: result,
        });
      }

      if (feature === 'multiply') {
        const a = Number(params.a ?? 7);
        const b = params.b === undefined || params.b === '' ? undefined : Number(params.b);
        const result = math.multiply(a, b);
        return sendJson(res, 200, {
          feature: 'Default Function Arguments (Math.multiply)',
          input: { a, b: b ?? '(default = 1)' },
          output: result,
        });
      }

      if (feature === 'rest') {
        const values = Array.isArray(params.values)
          ? params.values.map(Number)
          : String(params.values || '5, 10, 15, 20')
              .split(',')
              .map((n) => Number(n.trim()))
              .filter((n) => !Number.isNaN(n));
        const result = math.sumRest(...values);
        return sendJson(res, 200, {
          feature: 'Rest & Spread Operator (Math.sumRest)',
          input: values,
          output: result,
        });
      }

      if (feature === 'generator') {
        const start = Number(params.start ?? 1);
        const count = Math.min(Math.max(Number(params.count ?? 6), 1), 20);
        const step = Number(params.step ?? 2);
        const output = [...math.numberGenerator(start, count, step)];
        return sendJson(res, 200, {
          feature: 'Generators & Symbol.iterator (*numberGenerator)',
          input: { start, count, step },
          output,
        });
      }

      if (feature === 'promise') {
        const a = Number(params.a ?? 8);
        const b = Number(params.b ?? 7);
        const operation = params.operation === 'multiply' ? 'multiply' : 'sum';
        const output = await math.calculateAsync(a, b, operation);
        return sendJson(res, 200, {
          feature: 'Promises & Async/Await (Math.calculateAsync)',
          input: { a, b, operation },
          output,
        });
      }

      if (feature === 'tests') {
        const report = await runAutomatedSpecSuite();
        return sendJson(res, 200, {
          feature: 'TDD / BDD Automated Spec Suite (Mocha + Chai + Sinon)',
          output: report,
        });
      }

      return sendJson(res, 400, { message: 'Funcionalidade ES6 não reconhecida.' });
    } catch (err) {
      return sendJson(res, 400, { message: err.message });
    }
  }

  if (req.method === 'GET' && pathname === '/api/es6/events') {
    return sendJson(res, 200, { events: activityLog });
  }

  if (req.method === 'GET' && (pathname === '/login' || pathname === '/login.html')) {
    return serveStaticFile(res, path.join(__dirname, '..', 'public', 'login.html'));
  }

  if (req.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
    return serveStaticFile(res, path.join(__dirname, '..', 'public', 'index.html'));
  }

  return sendJson(res, 404, { error: 'Rota não encontrada' });
});

if (require.main === module) {
  server.listen(PORT, HOST, () => {
    console.log(`[ES6 Lab Server] Executando em http://${HOST}:${PORT}`);
  });
}

module.exports = server;
