# 🚀 Como Executar o Projeto

Este guia centraliza as opções de execução do projeto **Desenvolvimento Avançado com JavaScript ES6+**. Você pode rodar a aplicação e sua suíte de testes TDD/BDD tanto **Localmente (Node.js / Laragon)** quanto em **Containers Docker**.

---

## 📋 Escolha o seu Modo de Execução

| Modo de Execução | Quando Utilizar | Guia Detalhado |URL Principal |
| :--- | :--- | :--- | :--- |
| **1. Execução Local (Nativo / Laragon)** | Desenvolvimento rápido no Windows/Linux/macOS utilizando Node.js instalado na máquina. | [📄 COMO_EXECUTAR_LOCAL.md](./COMO_EXECUTAR_LOCAL.md) | `http://localhost:3000` |
| **2. Execução via Docker (Containers)** | Ambiente isolado pronto para produção/homologação com Node.js 20 Alpine, Nginx, MySQL 8.0 e phpMyAdmin. | [📄 COMO_EXECUTAR_DOCKER.md](./COMO_EXECUTAR_DOCKER.md) | `http://localhost:8080` |

---

## ⚡ Resumo Rápido de Comandos

### Opção A — Rodar Localmente
```bash
# 1. Copiar variáveis de ambiente (já configurado para uso local por padrão)
cp .env.example .env

# 2. Instalar dependências (Mocha, Chai, Sinon)
npm install

# 3. Executar a suíte de testes TDD/BDD
npm test

# 4. Iniciar o servidor web interativo na porta 3000
npm start
```

### Opção B — Rodar com Docker Compose
```bash
# 1. Subir toda a stack (App Node.js + Nginx + MySQL + phpMyAdmin)
docker compose up -d --build

# 2. Executar a suíte de testes dentro do container
docker compose exec app npm test

# 3. Acompanhar os logs da aplicação
docker compose logs -f app
```

---

## 🔗 Documentação Complementar

- [🔐 Acessos, Credenciais e Guia de Testes](./ACESSOS_TESTES.md)
- [💻 Guia Completo de Execução Local](./COMO_EXECUTAR_LOCAL.md)
- [🐳 Guia Completo de Execução com Docker](./COMO_EXECUTAR_DOCKER.md)
