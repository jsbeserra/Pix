# Guia de Execução do Projeto

Este guia fornece instruções detalhadas sobre como executar o projeto e interagir com os serviços disponíveis.

## 1. Como Executar

### 1.1 Executando as dependencias

Para começar, abra um terminal e execute o comando abaixo para iniciar as dependencias usando Docker Compose:

```bash
docker-compose up
```

1.2 Iniciando os Microserviços Pix, navegue até a pasta pix-service, pix-accounts-manager e pix-api-transactions. Abra um terminal em cada uma delas e execute o seguinte comando para iniciar os microserviços Pix:


```bash
yarn dev
```

## 2. Explorando o Swagger
Agora que os serviços estão em execução, você pode acessar a documentação Swagger em:

http://localhost:3007/api

http://localhost:3008/api

### 2.1 Cadastrando banco
1.1 Abra a url http://localhost:3007/api

1.2 Navegue até a aba banco e prencha o payload como indicado abaixo.
```bash
{
    "name": "Voltz",
    "url_for_transaction": "http://localhost:3005/api/transaction/pix/deposit",
    "url_for_refund": "http://localhost:3005/api/transaction/pix/refund"
}
```
1.3 execute a requisição e guarde o resultado dela que é um id

# 3. Iniciando aplicação bancaria

1.1 Navegue até a pasta banco-exemplo

1.2 Abra o .env e na linha BANK_ID adicione o id que você tinha guardado anteriormente

1.3 Abra um terminal no direotio atual e digite o comando

```bash
yarn dev
```
</br>

# 4. Explorando os Endpoints
Agora, você pode explorar os endpoints disponíveis no "banco-exemplo". Este serviço funciona como um banco e também é um gateway para operações Pix.

Sinta-se à vontade para realizar operações Pix e explorar as funcionalidades do sistema.

Lembre-se de que este guia pressupõe que você tenha Docker e Node.js instalados e as dependências do projeto configuradas adequadamente.




