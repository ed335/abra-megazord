# 🚀 Guia de Setup - AbraCann Development

Instruções completas para configurar a workspace de desenvolvimento do AbraCann.

---

## 📋 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js 18+** - [nodejs.org](https://nodejs.org)
- **Git** - [git-scm.com](https://git-scm.com)
- **Docker** - [docker.com](https://www.docker.com) (recomendado)
- **PostgreSQL 14+** - [postgresql.org](https://www.postgresql.org) (OU use Docker)

Verifique as versões:
```bash
node --version    # v18.18.0 ou superior
npm --version     # 9.0.0 ou superior
git --version     # 2.30.0 ou superior
docker --version  # 20.10.0 ou superior (se usando Docker)
```

---

## 1️⃣ Clone & Setup Inicial

```bash
# Clone o repositório
git clone https://github.com/abracann/abracann.git
cd abracann

# Configure Git
git config user.name "Seu Nome"
git config user.email "seu-email@example.com"

# Crie uma branch de desenvolvimento
git checkout -b develop
```

---

## 2️⃣ Database Setup

### Opção A: Com Docker (Recomendado)

```bash
# Inicie PostgreSQL + pgAdmin
docker-compose up -d postgres pgadmin

# Aguarde ~10 segundos para o PostgreSQL iniciar
sleep 10

# Verifique se está rodando
docker ps

# Acesse pgAdmin em http://localhost:5050
# - Email: admin@abracann.local
# - Senha: admin
```

### Opção B: PostgreSQL Local

```bash
# macOS (com Homebrew)
brew install postgresql
brew services start postgresql
createdb abracann_dev

# Linux (Ubuntu/Debian)
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb abracann_dev

# Windows
# Baixe do postgresql.org e siga o instalador
```

---

## 3️⃣ Backend Setup

```bash
cd backend

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Edite .env com suas credenciais (se necessário)
# DATABASE_URL="postgresql://abracann_user:abracann_password@localhost:5432/abracann_dev"

# Gere o Prisma client
npm run prisma:generate

# Execute migrations do banco
npm run prisma:migrate

# (Opcional) Visualize o banco com Prisma Studio
npm run prisma:studio
# Acesse http://localhost:5555

# Inicie o servidor
npm run start:dev

# API estará em http://localhost:3001
```

**Verifique se está rodando:**
```bash
curl http://localhost:3001/health
# Resposta esperada: { "status": "ok" }
```

---

## 4️⃣ Frontend Setup

```bash
# Em outra janela de terminal
cd web

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev

# Aplicação estará em http://localhost:3000
```

**Verifique:**
- Abra http://localhost:3000 no navegador
- Veja a home page carregando

---

## 5️⃣ Email Setup (Opcional - para testes)

```bash
# Inicie MailHog (já está no docker-compose)
docker-compose up -d mailhog

# Acesse a interface: http://localhost:8025
# Todos os emails enviados localmente serão captados lá
```

Configure no `.env` do backend:
```env
SMTP_HOST=localhost
SMTP_PORT=1025
```

---

## ✅ Verificação de Setup

Rode este script para verificar tudo:

```bash
#!/bin/bash

echo "🔍 Verificando setup do AbraCann..."

# Check Node
node --version && echo "✅ Node.js OK" || echo "❌ Node.js não encontrado"

# Check Git
git --version && echo "✅ Git OK" || echo "❌ Git não encontrado"

# Check Docker (se instalado)
if command -v docker &> /dev/null; then
  docker ps && echo "✅ Docker OK" || echo "⚠️ Docker não está rodando"
else
  echo "⚠️ Docker não instalado (opcional)"
fi

# Check Backend
if [ -d "backend" ]; then
  cd backend
  npm ls > /dev/null 2>&1 && echo "✅ Backend dependencies OK" || echo "❌ Backend não foi instalado"
  cd ..
fi

# Check Frontend
if [ -d "web" ]; then
  cd web
  npm ls > /dev/null 2>&1 && echo "✅ Frontend dependencies OK" || echo "❌ Frontend não foi instalado"
  cd ..
fi

# Check Database
if command -v psql &> /dev/null; then
  psql -l | grep abracann_dev && echo "✅ Database OK" || echo "⚠️ Database não existe"
else
  echo "⚠️ PostgreSQL CLI não instalado"
fi

echo ""
echo "🎉 Verificação concluída!"
```

---

## 🌐 URLs de Desenvolvimento

Após completar o setup, acesse:

| Serviço | URL | Credenciais |
|---------|-----|------------|
| **Frontend** | http://localhost:3000 | - |
| **Backend API** | http://localhost:3001 | - |
| **pgAdmin** | http://localhost:5050 | admin@abracann.local / admin |
| **Prisma Studio** | http://localhost:5555 | - |
| **MailHog** | http://localhost:8025 | - |

---

## 📝 Scripts Úteis

### Frontend

```bash
cd web

npm run dev              # Inicia dev server
npm run build           # Build para produção
npm run lint            # ESLint
npm run format          # Prettier
npm run type-check      # TypeScript check
```

### Backend

```bash
cd backend

npm run start:dev       # Inicia dev server com hot reload
npm run build           # Build
npm run lint            # ESLint
npm run prisma:studio   # Abre Prisma Studio (GUI do banco)
npm test                # Testes
npm run test:cov        # Coverage
```

### Geral

```bash
# Docker
docker-compose up       # Inicia todos os serviços
docker-compose down     # Para todos os serviços
docker-compose logs -f  # Ver logs em tempo real

# Database
npx prisma migrate dev      # Cria nova migration
npx prisma migrate deploy   # Aplica migrations (produção)
npx prisma db seed          # Seed do banco (dados iniciais)
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'next'"

```bash
cd web
npm install
npm run build
```

### Erro: "Connection refused" (Database)

```bash
# Verifique se o PostgreSQL está rodando
docker ps | grep postgres

# Se não estiver:
docker-compose up -d postgres
sleep 10
```

### Erro: "EADDRINUSE: address already in use :::3000"

```bash
# Porta já está em uso. Matamos o processo:
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erro: "Prisma client not generated"

```bash
cd backend
npm run prisma:generate
```

### Erro: "No changes in schema detected"

```bash
cd backend
npx prisma migrate dev --name init
```

---

## 🔐 Segurança de Desenvolvimento

**Nunca faça commit de:**
- `.env` com dados sensíveis
- Senhas, API keys, tokens
- Arquivos pessoais

**Boas práticas:**
```bash
# Copie .env.example para .env.local
cp backend/.env.example backend/.env
cp web/.env.example web/.env.local

# Mude valores sensíveis
vim backend/.env

# Adicione .env ao .gitignore (já feito)
```

---

## 🤝 Próximos Passos

1. ✅ **Setup Concluído!**
2. Leia a documentação em `/docs`
3. Consulte o Design System em `/design-system`
4. Comece a desenvolver!

---

## 📞 Suporte

Problemas no setup?

- 📧 dev@abracann.com
- 💬 Slack: #setup-support
- 🐛 Issues: GitHub Issues

---

**Última Atualização:** Dezembro 2025  
**Versão:** 1.0
