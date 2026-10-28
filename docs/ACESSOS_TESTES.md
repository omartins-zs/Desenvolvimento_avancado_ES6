# 🔐 Acessos, Credenciais e Guia de Testes

Este documento consolida todas as URLs de acesso, credenciais de demonstração e procedimentos de validação automatizada (TDD/BDD) e interativa do projeto **Desenvolvimento Avançado com JavaScript ES6+**.

---

## 🌐 1. URLs de Acesso por Ambiente

| Serviço | Ambiente Local (Node.js / Laragon) | Ambiente Docker (Nginx + Containers) | Descrição |
| :--- | :--- | :--- | :--- |
| **Painel Interativo ES6+** | `http://localhost:3000` | `http://localhost:8080` | Workbench interativo de funções ES6+ e suíte TDD/BDD |
| **Tela de Login** | `http://localhost:3000/login` | `http://localhost:8080/login` | Autenticação com preenchimento rápido em 1 clique |
| **Healthcheck API** | `http://localhost:3000/api/health` | `http://localhost:8080/api/health` | Verificação de disponibilidade do servidor |
| **phpMyAdmin** | `http://localhost/phpmyadmin` | `http://localhost:8085` | Gerenciador visual do banco de dados MySQL |
| **MySQL (Porta Externa)** | `127.0.0.1:3307` | `127.0.0.1:3308` | Porta TCP para clientes SQL (DBeaver, TablePlus, etc.) |

---

## 👤 2. Perfis e Credenciais de Demonstração (Login)

A aplicação possui autenticação integrada com suporte a **sessão via Cookie HttpOnly e Bearer Token**, além de **botões de preenchimento automático em 1 clique** na tela `/login`:

| Perfil / Cargo | Nome de Exibição | E-mail (Login) | Senha Padrão | Permissões Atribuídas |
| :--- | :--- | :--- | :--- | :--- |
| **Admin / Tech Lead** | Administrador ES6 | `admin@es6.dev` | `Password@123` | `full_access`, `run_tests`, `manage_modules`, `inspect_metrics` |
| **Instrutor** | Instrutor Celso / DIO | `instrutor@es6.dev` | `Password@123` | `run_tests`, `manage_modules` |
| **Developer** | Desenvolvedor Aluno | `dev@es6.dev` | `Password@123` | `run_tests` |

---

## 🗄️ 3. Credenciais de Banco de Dados

### Modo Local (`.env` padrão - Laragon)
- **Host:** `127.0.0.1`
- **Porta:** `3307`
- **Database:** `es6_avancado`
- **Usuário:** `root`
- **Senha:** *(vazia)*

### Modo Docker (`docker-compose.yml`)
- **Host Interno (entre containers):** `mysql` (porta `3306`)
- **Host Externo (máquina host):** `127.0.0.1` (porta `3308`)
- **Database:** `es6_avancado`
- **Usuário da Aplicação:** `es6_user` / **Senha:** `secret`
- **Usuário Root:** `root` / **Senha Root:** `root_secret`

---

## 🧪 4. Como Executar os Testes Automatizados (Mocha, Chai e Sinon)

A suíte de testes unitários e comportamentais fica localizada em `test/math.spec.js` e valida todos os módulos em `src/math.js`.

### Execução Local via CLI
```bash
npm test
```

### Execução via Docker
```bash
docker compose exec app npm test
```

### O que é validado na suíte `test/math.spec.js`:
1. **Soma Assíncrona (`Math.sum`)**: Valida callbacks assíncronos com controle de `done()` e `this.timeout(3000)` no Mocha.
2. **Default Function Arguments (`Math.multiply`)**: Verifica multiplicação com parâmetros explícitos e valor padrão (`b = 1`).
3. **Asserções Expressivas com Chai (`expect`)**: Compara propriedades de objetos (`to.have.property`) e igualdade profunda (`to.deep.equal`).
4. **Mocks e Spies com Sinon (`Math.printSum`)**: Intercepta o método `res.load` com `sinon.spy()`, garantindo que foi invocado exatamente uma vez (`calledOnce`) com os argumentos `'index'` e `10`.
5. **Rest & Spread Operator (`Math.sumRest` / `Math.mergeObjects`)**: Soma múltiplos argumentos ilimitados (`...args`) e clona/mescla objetos imutavelmente.
6. **Generators & Iterators (`*numberGenerator`)**: Valida geração sob demanda com `yield` e espalhamento `[...gen]`.
7. **Promises & Async/Await (`Math.calculateAsync`)**: Testa resolução assíncrona e tratamento de exceções customizadas (`CustomError`).
8. **EventEmitter (`Math.Users`)**: Verifica emissão e escuta de eventos assíncronos (`User logged`).
