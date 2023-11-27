# Agência de Turismo

Descrição curta do seu projeto.

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js 18

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Inicie o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

   Isso iniciará o servidor Next.js em modo de desenvolvimento.

4. Certifique-se de ter o Docker e o Docker Compose instalados.

5. Construa e inicie os contêineres Docker:

   ```bash
   docker-compose up -d --build
   ```

   Isso criará os contêineres especificados no arquivo `docker-compose.yml`.

6. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

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
