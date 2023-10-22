# API de Gestão de Contas

Esta é uma API de gestão de contas pix que permite criar, busca e excluir contas. A API é documentada usando o Swagger para facilitar o uso e a integração.

## Documentação do Swagger

Você pode acessar a documentação da API no Swagger em [http://localhost:3003/api/documentation/](http://localhost:3003/api/documentation/) após a implantação.

## Pré-requisitos

- Docker: [Instale o Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instale o Docker Compose](https://docs.docker.com/compose/install/)

## Implantação com Docker Compose

Siga estas etapas para implantar a API em um container Docker usando Docker Compose:

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/api-gestao-contas.git
   cd api-gestao-contas

2. Execute o seguinte comando no terminal para construir a imagem Docker e iniciar os contêineres:
docker-compose up -d

3. Encerrando os Contêineres
docker-compose down
