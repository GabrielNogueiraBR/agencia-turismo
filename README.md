# Agência de Turismo

A proposta da aplicação é facilitar a aquisição de pacotes completos de
turismo proporcionando ao usuário a comodidade de reservar hotéis, organizar
voos e adquirir ingressos para eventos de entretenimento, como cinema, teatro
e shows. Para viabilizar essa experiência, foi desenvolvido uma aplicação web
que integra múltiplos serviços distintos (APIs), cada um dedicado a gerenciar
individualmente as reservas de hotéis e voos.

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js 18

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório:

   ```bash
   git clone https://github.com/GabrielNogueiraBR/agencia-turismo.git
   cd seu-projeto
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Certifique-se de ter o Docker e o Docker Compose instalados.

4. Construa e inicie os contêineres Docker:

   ```bash
   docker-compose up -d
   ```

   Isso criará os contêineres especificados no arquivo `docker-compose.yml`.

5. Execute o seguinte comando para construir a infraestrutura básica para utilização:

   ```bash
   npm run setup
   ```

6. Inicie o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

   Isso iniciará o servidor Next.js em modo de desenvolvimento.

7. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

## Comandos Úteis

- `npm run dev`: Inicia o servidor Next.js em modo de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm start`: Inicia o servidor Next.js em modo de produção.

## Contribuindo

1. Faça um fork do repositório.
2. Crie uma branch para suas alterações: `git checkout -b feature/nova-feature`.
3. Faça commit de suas alterações: `git commit -m 'Adiciona nova feature'`.
4. Faça push para a branch: `git push origin feature/nova-feature`.
5. Abra um pull request.
