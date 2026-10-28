# 🐳 Como Executar com Docker (Containers)

Este guia descreve como executar o projeto **Desenvolvimento Avançado com JavaScript ES6+** utilizando **Docker** e **Docker Compose**, provisionando automaticamente a aplicação Node.js, proxy reverso Nginx, banco de dados MySQL 8.0 e phpMyAdmin.

---

## 🏗️ 1. Arquitetura dos Containers (`docker-compose.yml`)

| Serviço | Container Name | Imagem Base | Porta Externa -> Interna | Função |
| :--- | :--- | :--- | :--- | :--- |
| **`app`** | `es6_avancado_app` | `node:20-alpine` (Multi-stage) | `3000` (interna na rede) | Servidor Node.js ES6+ e executor Mocha/Chai/Sinon |
| **`nginx`** | `es6_avancado_nginx` | `nginx:1.27-alpine` | `8080:80` | Proxy reverso com compressão Gzip e DNS dinâmico (`127.0.0.11`) |
| **`mysql`** | `es6_avancado_mysql` | `mysql:8.0` | `3308:3306` | Banco de dados relacional com volume persistente e healthcheck |
| **`phpmyadmin`** | `es6_avancado_phpmyadmin` | `phpmyadmin/phpmyadmin:latest` | `8085:80` | Interface web para administração do MySQL (`PMA_HOST=mysql`) |

---

## ⚙️ 2. Configuração do `.env` para Docker

Caso deseje sincronizar seu `.env` local com as variáveis dos containers, comente o bloco `# MODO 1: EXECUÇÃO LOCAL` e descomente o bloco `# MODO 2: EXECUÇÃO DOCKER` no arquivo `.env`:

```env
APP_URL=http://localhost:8080

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=es6_avancado
DB_USERNAME=es6_user
DB_PASSWORD=secret
DB_ROOT_PASSWORD=root_secret
```

> **Nota:** O `docker-compose.yml` já injeta essas variáveis diretamente no container `app`, garantindo funcionamento imediato mesmo sem edição manual.

---

## 🚀 3. Subindo os Containers

Na raiz do projeto, execute:

```bash
docker compose up -d --build
```

O script de inicialização (`docker/scripts/start-app.sh`) executará automaticamente o `npm test` para validar a integridade da suíte ES6+ e, em seguida, iniciará o servidor HTTP na porta interna `3000`, exposta pelo Nginx na porta `8080`.

---

## 🌐 4. Acessando os Serviços

- **Aplicação Web (via Nginx):** `http://localhost:8080`
- **Tela de Login (1 Clique):** `http://localhost:8080/login`
- **Healthcheck da API:** `http://localhost:8080/api/health`
- **phpMyAdmin:** `http://localhost:8085` (Servidor: `mysql`, Usuário: `root`, Senha: `root_secret` ou `es6_user` / `secret`)
- **MySQL Externo:** `127.0.0.1:3308`

---

## 🛠️ 5. Comandos Úteis de Operação

```bash
# Verificar status e saúde (healthy) dos containers
docker compose ps

# Executar a suíte de testes Mocha/Chai/Sinon dentro do container
docker compose exec app npm test

# Visualizar logs da aplicação em tempo real
docker compose logs -f app

# Parar e remover os containers (mantendo o volume de dados)
docker compose down

# Parar e remover containers + volumes de banco de dados
docker compose down -v
```
