<h1 align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="38" align="center" alt="JavaScript" />
  Desenvolvimento Avançado com JavaScript ES6+
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="38" align="center" alt="Node.js" />
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000" alt="JavaScript ES6+" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Mocha-TDD%2FBDD-8D6748?style=for-the-badge&logo=mocha&logoColor=white" alt="Mocha" />
  <img src="https://img.shields.io/badge/Chai-Assertions-A30701?style=for-the-badge&logo=chai&logoColor=white" alt="Chai" />
  <img src="https://img.shields.io/badge/Sinon-Spies%20%26%20Mocks-222222?style=for-the-badge" alt="Sinon" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Nginx-Reverse%20Proxy-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
</p>

## 📝 Descrição

<cite>Laboratório prático, suíte de testes automatizados (TDD/BDD com Mocha, Chai e Sinon) e painel web interativo para domínio dos recursos avançados do JavaScript ES6+ (Arrow Functions, Default Arguments, Rest/Spread, Destructuring, Generators, Promises, Async/Await e EventEmitter).</cite>

---

## 📌 Status do Projeto

✅ **Concluído, Refatorado e Dockerizado** — Suíte de testes unitários/comportamentais 100% funcional, servidor web interativo com autenticação e perfis de demonstração integrado, e infraestrutura completa para execução Local e Docker.

---

## 🏛️ Arquitetura do Sistema

O projeto é estruturado em camadas desacopladas para facilitar tanto a validação via linha de comando (CLI) quanto a experimentação visual pelo navegador:

1. **Core ES6+ (`src/math.js`)**: Implementa a classe `Math` estendendo `EventEmitter`, além de `Users` e `CustomError`, encapsulando operações síncronas, callbacks assíncronos, Rest/Spread, Destructuring, Generators (`*numberGenerator`) e Promises (`calculateAsync`).
2. **Servidor HTTP & API REST (`src/server.js`)**: Servidor Node.js zero-dependency que provê rotas de autenticação (`/api/auth/login`, `/api/auth/logout`, `/api/auth/session`), healthcheck (`/api/health`) e execução dinâmica dos módulos ES6+ (`/api/es6/execute`).
3. **Interface Web Interativa (`public/login.html` e `public/index.html`)**: Painel moderno com login rápido em 1 clique e execução em tempo real de cada módulo ES6+ e da suíte TDD/BDD.
4. **Suíte de Especificações TDD/BDD (`test/math.spec.js`)**: Testes automatizados utilizando **Mocha**, asserções expressivas com **Chai (`expect`)** e interceptação de chamadas com **Sinon (`spy`)**.
5. **Infraestrutura Containerizada (`Dockerfile` + `docker-compose.yml`)**: Build multi-stage em `node:20-alpine`, proxy reverso **Nginx** (`8080:80`), banco de dados **MySQL 8.0** (`3308:3306`) e **phpMyAdmin** (`8085:80`).

---

## ⚙️ Pré-requisitos

### Para Execução Local
- **Node.js** `v20.x LTS` ou `v22.14.0+`
- **NPM** `v10.x+` ou `v11.4.2+`
- **Git** `v2.40+`
- *(Opcional)* **Laragon** `6.0.0` (MySQL na porta `3307`, PHP `8.4.6`, Composer `2.8.12`, Laravel `13.15.0`)

### Para Execução com Docker
- **Docker Engine** `v24.0+` / **Docker Desktop**
- **Docker Compose** `v2.20+`

---

## 🚀 Tecnologias Utilizadas

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="34" alt="JavaScript" title="JavaScript ES6+" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="34" alt="Node.js" title="Node.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" width="34" alt="Mocha" title="Mocha" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="34" alt="HTML5" title="HTML5" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="34" alt="CSS3" title="CSS3" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="34" alt="Docker" title="Docker" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="34" alt="Nginx" title="Nginx" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="34" alt="MySQL" title="MySQL 8.0" />
</p>

- **JavaScript (ES6 / ECMAScript 2015+)**: Arrow Functions, Default Function Arguments, Enhanced Object Literals, Rest/Spread Operator, Destructuring, Symbols, Iterators, Generators, Promises e Async/Await.
- **Node.js (`http`, `events`, `crypto`, `assert`)**: Runtime de servidor, emissão de eventos (`EventEmitter`) e gerenciamento de sessões.
- **Mocha (`^7.1.2`)**: Test runner para execução de testes unitários e assíncronos (`done`, `async/await`, hooks `beforeEach`).
- **Chai (`^4.2.0`)**: Biblioteca de asserções BDD (`expect`, `to.equal`, `to.have.property`, `to.deep.equal`).
- **Sinon (`^9.0.2`)**: Criação de Spies e Mocks para inspecionar invocações de métodos (`sinon.spy()`, `calledOnce`).
- **Docker, Nginx & MySQL 8.0**: Orquestração multi-container com proxy reverso, compressão Gzip e persistência de dados.

---

## ✨ Funcionalidades

- [x] **Módulo I — Funções Avançadas do ES6**: Arrow functions com escopo léxico, parâmetros com valores padrão (`Default Function Arguments`) e objetos literais aprimorados (`Enhanced Object Literals`).
- [x] **Módulo II — Rest, Spread Operator e Destructuring**: Soma de argumentos ilimitados com `...args` (`Math.sumRest`), clonagem/mesclagem imutável de objetos (`Math.mergeObjects`) e desestruturação de parâmetros (`Math.sumDestructured`).
- [x] **Módulo III — Symbols, Iterators e Generators**: Geração preguiçosa (lazy evaluation) de sequências numéricas sob demanda com `function*` e `yield` (`*numberGenerator`).
- [x] **Módulo IV — Callbacks, Promises, Async/Await e EventEmitter**: Operações assíncronas encadeadas (`Math.calculateAsync`) e emissão de eventos de domínio com a classe `Users extends EventEmitter`.
- [x] **Módulo V — Qualidade de Código e Testes (TDD & BDD)**: Suíte completa em `test/math.spec.js` cobrindo cenários síncronos, assíncronos e mocks com Mocha, Chai e Sinon.
- [x] **Módulo VI — Tratamento de Exceções e Debugging**: Classe `CustomError extends Error` com metadados estruturados de diagnóstico.
- [x] **Autenticação e Perfis de Demonstração (1 Clique)**: Tela de login em `/login` com 3 perfis pré-configurados (`Admin`, `Instrutor` e `Developer`), controle de sessão por Cookie `HttpOnly` + Bearer Token e logout seguro.
- [x] **Workbench Web Interativo**: Painel visual em `/` permitindo testar todos os métodos da classe `Math` e rodar a suíte TDD/BDD diretamente pelo navegador.

---

## 📖 Sobre o Projeto

Originalmente concebido durante o curso **Desenvolvimento Avançado com JavaScript ES6** (Digital Innovation One), este repositório foi integralmente refatorado e evoluído para funcionar tanto como uma **referência prática de estudos e testes automatizados** quanto como uma **aplicação web interativa pronta para execução local ou em containers Docker**.

---

## 🖥️ Preview e Endpoints Principais

| Rota / Recurso | Método | Descrição |
| :--- | :--- | :--- |
| `/login` | `GET` | Interface de login com botões de preenchimento rápido em 1 clique |
| `/` | `GET` | Painel interativo ES6+ para execução de funções e suíte TDD/BDD |
| `/api/health` | `GET` | Healthcheck JSON do servidor |
| `/api/auth/login` | `POST` | Autenticação de usuário e emissão de sessão + evento `User logged` |
| `/api/auth/session` | `GET` | Validação da sessão ativa |
| `/api/auth/logout` | `POST` | Encerramento da sessão ativa |
| `/api/es6/execute` | `POST` | Executa operações ES6+ (`sum`, `multiply`, `rest`, `generator`, `promise`, `tests`) |

---

## 📚 Documentação do Projeto

Toda a documentação operacional e de testes está organizada no diretório [`docs/`](./docs):

- 📄 **[Guia Geral de Execução (`docs/COMO_EXECUTAR.md`)](./docs/COMO_EXECUTAR.md)**
- 💻 **[Como Executar Localmente (`docs/COMO_EXECUTAR_LOCAL.md`)](./docs/COMO_EXECUTAR_LOCAL.md)**
- 🐳 **[Como Executar via Docker (`docs/COMO_EXECUTAR_DOCKER.md`)](./docs/COMO_EXECUTAR_DOCKER.md)**
- 🔐 **[Acessos, Credenciais e Guia de Testes (`docs/ACESSOS_TESTES.md`)](./docs/ACESSOS_TESTES.md)**

---

## 💻 Comandos de Execução

> ⚠️ **AVISO IMPORTANTE:** O arquivo `.env` já vem configurado por padrão para **Execução Local** (`APP_URL=http://localhost:3000`, `DB_HOST=127.0.0.1`, `DB_PORT=3307`). Caso opte por executar via **Docker**, consulte [`docs/COMO_EXECUTAR_DOCKER.md`](./docs/COMO_EXECUTAR_DOCKER.md) para detalhes sobre as variáveis de container (`APP_URL=http://localhost:8080`, `DB_HOST=mysql`, `DB_PORT=3306`).

### Execução Local (Node.js)
```bash
# 1. Criar arquivo .env a partir do modelo
cp .env.example .env

# 2. Instalar dependências
npm install

# 3. Rodar a suíte de testes (Mocha + Chai + Sinon)
npm test

# 4. Iniciar o servidor web interativo (http://localhost:3000)
npm start
```

### Execução com Docker Compose
```bash
# 1. Construir e iniciar os containers (App + Nginx + MySQL + phpMyAdmin)
docker compose up -d --build

# 2. Executar os testes automatizados dentro do container da aplicação
docker compose exec app npm test

# 3. Acessar no navegador:
# Aplicação Web: http://localhost:8080
# phpMyAdmin:    http://localhost:8085
```

---

## 📂 Estrutura do Projeto

```text
Desenvolvimento_avancado_ES6/
├── docker/
│   ├── nginx/
│   │   └── default.conf          # Proxy reverso Nginx com Gzip e DNS dinâmico
│   └── scripts/
│       └── start-app.sh          # Entrypoint: roda testes e inicia o servidor
├── docs/
│   ├── ACESSOS_TESTES.md         # Credenciais, URLs, portas e guia de testes
│   ├── COMO_EXECUTAR.md          # Visão geral dos modos de execução
│   ├── COMO_EXECUTAR_DOCKER.md   # Passo a passo detalhado para Docker
│   └── COMO_EXECUTAR_LOCAL.md    # Passo a passo detalhado para ambiente Local
├── public/
│   ├── index.html                # Painel interativo ES6+ e executor TDD/BDD
│   └── login.html                # Tela de login com acesso rápido em 1 clique
├── src/
│   ├── math.js                   # Classe Math, Users (EventEmitter) e CustomError
│   └── server.js                 # Servidor HTTP, autenticação e API ES6+
├── test/
│   └── math.spec.js              # Especificações unitárias com Mocha, Chai e Sinon
├── .dockerignore                 # Exclusões de contexto de build Docker
├── .env.example                  # Template de variáveis (Modos Local e Docker)
├── .gitignore                    # Arquivos ignorados pelo Git
├── Dockerfile                    # Build multi-stage otimizado (node:20-alpine)
├── docker-compose.yml            # Orquestração App, Nginx, MySQL 8.0 e phpMyAdmin
├── package.json                  # Scripts e dependências do projeto
└── README.md                     # Documentação principal no Padrão Gabriel Martins
```

---

## 🔮 Melhorias Futuras

- [ ] Persistência de histórico de execuções ES6+ e métricas de testes diretamente no banco MySQL.
- [ ] Exportação de relatório de cobertura de código com `nyc` / `c8` (Istanbul).
- [ ] Pipeline de Integração Contínua (GitHub Actions) executando `npm test` a cada Pull Request.

---

<p align="center">
  Feito com ❤️ por <strong>Gabriel Martins</strong> 🚀
</p>
