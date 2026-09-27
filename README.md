# CodeVault — versão final para hospedagem

## O que já está incluído
- Site responsivo
- Editor HTML/CSS/JS
- Laboratório de cifra de César
- Cadastro e login com senha criptografada
- Sessão por cookie HTTP-only
- PostgreSQL persistente
- Projetos por usuário (criar, abrir e excluir)
- Papel de administrador por `ADMIN_EMAIL`
- Helmet, CORS e rate limit
- Dockerfile
- `render.yaml` para facilitar deploy no Render

## Deploy no Render
1. Suba esta pasta para um repositório GitHub.
2. No Render, escolha New > Blueprint e selecione o repositório.
3. O `render.yaml` cria o Web Service e o PostgreSQL.
4. Preencha `ADMIN_EMAIL` com o e-mail que será administrador.
5. Faça o deploy.
6. O Render fornece uma URL `onrender.com`.

## Segurança
Nunca coloque a senha do banco ou JWT_SECRET no GitHub. O Render pode gerar `JWT_SECRET` automaticamente pelo Blueprint. Use HTTPS e mantenha as variáveis no painel do provedor.

## Local
Copie `.env.example` para `.env`, ajuste `DATABASE_URL` e `JWT_SECRET`, instale com `npm install` e execute `npm start`.
