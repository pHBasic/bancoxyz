# Sistema de Caixa do Banco XYZ (Incompleto)

Este projeto é uma simulação do sistema de caixa de um banco, desenvolvido para um desafio técnico. A aplicação permite operações bancárias como cadastro de contas, depósitos, saques, transferências entre contas e geração de extratos. O backend foi construído utilizando Java (Spring Boot), enquanto o frontend foi desenvolvido com Angular.

## Funcionalidades

- **Cadastro de Contas**: Permite criar novas contas bancárias com saldo inicial.
- **Depósito**: Realiza depósitos em uma conta existente.
- **Saque**: Permite saques de uma conta, verificando se há saldo suficiente.
- **Transferência**: Transfere fundos entre contas, utilizando os métodos de saque e depósito.
- **Extrato**: Exibe um histórico de todas as operações realizadas em uma conta.

## Tecnologias Utilizadas

### Backend
- **Java**: Linguagem principal utilizada para o desenvolvimento do servidor.
- **Spring Boot**: Framework para criação de microserviços e API RESTful.
- **Maven**: Gerenciador de dependências e automação de builds.
- **JPA/Hibernate**: Para mapeamento objeto-relacional (ORM).
- **H2 Database**: Banco de dados em memória para desenvolvimento.

### Frontend
- **Angular**: Framework front-end para construção de interfaces de usuário.
- **Typescript**: Linguagem utilizada no frontend.
- **HTML/CSS**: Para a estruturação e estilização das páginas.

## Requisitos

- **JDK 17+**: Para executar o backend.
- **Node.js 16+**: Para executar o frontend.
- **Maven**: Para gerenciar o projeto Java.

## Configuração e Execução

1. Execute o comando

```bash
    cd lotusbank-front
```

2. Antes de executar o Frontend, instale as dependências do projeto com o seguinte comando:

```bash
    npm install
```

3. Para executar o Frontend, utilize, no terminal, o comando:

```bash
    npm run start
```

### API Endpoints

- POST api/accounts: Cria uma nova conta.
- PUT /api/accounts/deposit/{id}: Realiza um depósito em uma conta.
- PUT /api/accounts/withdraw/{id}: Realiza um saque de uma conta.
- PUT /api/accounts/transfer/{id}: Transfere fundos entre contas.
- GET /accounts/transactions/{id}: Exibe o extrato de uma conta.
