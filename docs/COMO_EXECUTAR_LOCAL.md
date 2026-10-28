# 💻 Como Executar Localmente (Node.js / Laragon)

Este guia detalha o passo a passo para configurar e executar o projeto **Desenvolvimento Avançado com JavaScript ES6+** diretamente na sua máquina local, sem necessidade de containers Docker.

---

## 🛠️ 1. Ambiente de Referência Homologado

O projeto foi validado e padronizado considerando o seguinte ecossistema de desenvolvimento local:

| Ferramenta / Tecnologia | Versão de Referência | Papel no Ecossistema |
| :--- | :--- | :--- |
| **Laragon** | `6.0.0` | Ambiente de desenvolvimento local integrado (MySQL `3307`, Apache/Nginx) |
| **PHP** | `8.4.6` | Runtime de referência do ecossistema local Laragon |
| **Composer** | `2.8.12` | Gerenciador de pacotes do ecossistema Laragon |
| **Laravel** | `13.15.0` | Framework de referência de padronização de variáveis `.env` |
| **Node.js** | `22.14.0+` (ou `20.x LTS`) | Runtime JavaScript principal para execução de `src/server.js` e `src/math.js` |
| **NPM** | `11.4.2+` (ou `10.x+`) | Gerenciador de pacotes para instalação de Mocha, Chai e Sinon |

---

## ⚙️ 2. Configuração do Arquivo `.env` (Modo Local)

Por padrão, o arquivo `.env.example` já vem com o bloco **MODO 1: EXECUÇÃO LOCAL** ativo e o bloco Docker comentado.

1. Caso ainda não possua o arquivo `.env`, crie-o a partir do exemplo:
   ```bash
   cp .env.example .env
   ```
2. Verifique se as variáveis locais estão ativas no seu `.env`:
   ```env
   APP_NAME="Desenvolvimento Avançado ES6"
   APP_ENV=local
   APP_DEBUG=true
   PORT=3000
   APP_URL=http://localhost:3000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3307
   DB_DATABASE=es6_avancado
   DB_USERNAME=root
   DB_PASSWORD=
   ```

---

## 📦 3. Instalação das Dependências

No terminal, na raiz do projeto, instale as dependências listadas no `package.json`:

```bash
npm install
```

---

## 🧪 4. Executando os Testes Automatizados (Mocha, Chai e Sinon)

Para rodar a suíte completa de testes unitários e comportamentais (`test/math.spec.js`):

```bash
npm test
```

Saída esperada:
- Todos os 10 cenários da suíte `Math class & ES6+ Advanced Features` aprovados (`passing`).

---

## ▶️ 5. Iniciando o Servidor Web Interativo

Para subir o painel interativo e o fluxo de autenticação local:

```bash
npm start
```

- **Painel Principal:** `http://localhost:3000`
- **Tela de Login:** `http://localhost:3000/login`
- **Healthcheck JSON:** `http://localhost:3000/api/health`

Consulte as credenciais de acesso em [docs/ACESSOS_TESTES.md](./ACESSOS_TESTES.md).
