#!/bin/sh
set -e

echo "[Docker Entrypoint] Validando suite de testes ES6+ (Mocha, Chai, Sinon)..."
npm test

echo "[Docker Entrypoint] Iniciando servidor web interativo na porta ${PORT:-3000}..."
exec node src/server.js
