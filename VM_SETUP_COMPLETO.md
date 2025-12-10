# 🚀 Guia Completo: Clonar e Configurar AbraCann na VM Google Cloud

## 📋 Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Clonar Repositório](#clonar-repositório)
3. [Instalar Dependências](#instalar-dependências)
4. [Configurar Banco de Dados](#configurar-banco-de-dados)
5. [Variáveis de Ambiente](#variáveis-de-ambiente)
6. [Iniciar Serviços](#iniciar-serviços)
7. [Verificar Tudo](#verificar-tudo)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

### Verificar Node.js e npm
```bash
node --version    # Deve ser v18 ou superior
npm --version     # Deve ser 9 ou superior
```

### Se não tiver instalado:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar
node --version
npm --version
```

### Instalar Docker e Docker Compose
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y docker.io docker-compose

# Verificar
docker --version
docker-compose --version

# Dar permissão para seu usuário (sem usar sudo)
sudo usermod -aG docker $USER
newgrp docker
```

### Instalar Git
```bash
sudo apt-get install -y git

# Verificar
git --version
```

---

## 📥 Clonar Repositório

```bash
# Clonar o repositório
git clone https://github.com/ed335/abra-megazord.git

# Entrar no diretório
cd abra-megazord

# Verificar estrutura
ls -la
```

**Resultado esperado:**
```
ARQUIVOS.md
CHECKLIST.txt
CONTRIBUTING.md
GIT_SETUP.md
README.md
SETUP.md
VM_SETUP_COMPLETO.md
CONTRIBUTIN.md
docker-compose.yml
automations/
backend/
design-system/
docs/
web/
```

---

## 📦 Instalar Dependências

### 1️⃣ Backend
```bash
cd backend

# Instalar dependências
npm install

# Verificar
npm list | head -20

# Voltar para raiz
cd ..
```

### 2️⃣ Frontend
```bash
cd web

# Instalar dependências
npm install

# Verificar
npm list | head -20

# Voltar para raiz
cd ..
```

**Tempo estimado:** 5-10 minutos (dependendo da internet)

---

## 🗄️ Configurar Banco de Dados

### 1️⃣ Iniciar Docker (PostgreSQL + pgAdmin + MailHog)
```bash
# Iniciar os serviços em background
docker-compose up -d

# Verificar status
docker-compose ps
```

**Resultado esperado:**
```
NAME                COMMAND                  SERVICE      STATUS
abracann-postgres   postgres -c max_conn...  postgres     Up
abracann-pgadmin    /entrypoint.sh           pgadmin      Up
abracann-mailhog    mailhog -api-bind-add... mailhog      Up
```

### 2️⃣ Gerar Client Prisma
```bash
cd backend

# Gerar o cliente Prisma (necessário antes de executar)
npm run prisma:generate

# Voltar
cd ..
```

### 3️⃣ Executar Migrations
```bash
cd backend

# Criar banco de dados e executar migrations
npm run prisma:migrate dev -- --name init

# Ou usar seed (se tiver)
npm run prisma:seed

# Voltar
cd ..
```

**Resultado esperado:**
```
✔ Generated Prisma Client
✔ Migrated successfully
```

### 4️⃣ Verificar Banco de Dados (opcional)
```bash
# Acessar pgAdmin
# URL: http://localhost:5050
# Email: admin@admin.com
# Senha: admin
```

---

## 🔐 Variáveis de Ambiente

### 1️⃣ Backend (.env)
```bash
cd backend

# Copiar exemplo
cp .env.example .env

# Editar (ajustar conforme necessário)
nano .env
```

**Conteúdo esperado de `.env`:**
```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/abracann"

# JWT
JWT_SECRET="sua-chave-secreta-super-segura-mudar-em-producao"
JWT_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

# Encryption
ENCRYPTION_KEY="chave-32-caracteres-para-aes256!"

# Email (MailHog)
SMTP_HOST="localhost"
SMTP_PORT=1025
SMTP_USER="test@test.com"
SMTP_PASSWORD="test"
SMTP_FROM="noreply@abracann.com.br"

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=100

# Environment
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

**Salvar:** Ctrl+O, Enter, Ctrl+X

### 2️⃣ Frontend (.env.local)
```bash
cd ../web

# Copiar exemplo
cp .env.example .env.local

# Editar (ajustar conforme necessário)
nano .env.local
```

**Conteúdo esperado de `.env.local`:**
```env
# API
NEXT_PUBLIC_API_URL="http://localhost:3001/api"

# Environment
NEXT_PUBLIC_ENV="development"

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

**Salvar:** Ctrl+O, Enter, Ctrl+X

---

## 🚀 Iniciar Serviços

### Opção 1: Em Terminais Separados (Recomendado)

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd web
npm run dev
```

**Terminal 3 - Visualizar Banco (opcional):**
```bash
cd backend
npm run prisma:studio
```

### Opção 2: Em Background (Com Screen ou Tmux)

**Backend:**
```bash
cd backend
npm run start:dev &
```

**Frontend:**
```bash
cd web
npm run dev &
```

---

## ✅ Verificar Tudo

### Checklist Final
```bash
# 1. Verificar Docker
docker ps

# 2. Verificar Node.js
node --version

# 3. Verificar repositório Git
cd abra-megazord
git status
git log --oneline | head -5

# 4. Verificar estrutura
ls -la backend/node_modules | wc -l
ls -la web/node_modules | wc -l
```

### Acessar Aplicação
```
Frontend:    http://localhost:3000
Backend:     http://localhost:3001/api
pgAdmin:     http://localhost:5050
MailHog:     http://localhost:8025
Prisma:      http://localhost:5555
```

### Testes Quick
```bash
# Testar backend
curl http://localhost:3001/api/health

# Testar frontend
curl http://localhost:3000
```

---

## 🐛 Troubleshooting

### Problema: "Permission denied" ao usar Docker
**Solução:**
```bash
sudo usermod -aG docker $USER
newgrp docker
docker ps
```

### Problema: Porta 5432 já em uso
**Solução:**
```bash
# Ver processos usando a porta
lsof -i :5432

# Ou mudar a porta no docker-compose.yml
nano docker-compose.yml
# Alterar: "5432:5432" para "5433:5432"
# Depois: DATABASE_URL="postgresql://postgres:postgres@localhost:5433/abracann"
```

### Problema: npm install muito lento
**Solução:**
```bash
# Usar cache
npm ci --prefer-offline

# Ou aumentar timeout
npm install --fetch-timeout=120000
```

### Problema: "Module not found" depois de clonar
**Solução:**
```bash
# Limpar node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

### Problema: Prisma não encontra banco
**Solução:**
```bash
cd backend

# Verificar DATABASE_URL em .env
cat .env | grep DATABASE_URL

# Testar conexão
npx prisma db pull

# Se não funcionar, recrie o banco
docker-compose down
docker-compose up -d
npm run prisma:migrate dev -- --name init
```

### Problema: Porta 3000 ou 3001 já em uso
**Solução:**
```bash
# Matar processo
kill $(lsof -t -i:3000)
kill $(lsof -t -i:3001)

# Ou especificar outra porta
cd web
npm run dev -- -p 3002
```

---

## 📝 Comandos Úteis Pós-Setup

```bash
# Banco de dados
cd backend
npm run prisma:generate      # Gerar client
npm run prisma:migrate       # Rodar migrations
npm run prisma:studio        # Abrir GUI
npm run prisma:seed          # Adicionar dados

# Desenvolvimento
cd backend
npm run start:dev            # Backend em watch mode

cd web
npm run dev                  # Frontend em dev server
npm run build                # Build production
npm run lint                 # Rodar linter
npm run format               # Formatar código

# Docker
docker-compose up -d         # Iniciar serviços
docker-compose down          # Parar serviços
docker-compose logs -f       # Ver logs
docker-compose restart       # Reiniciar

# Git
git pull                     # Atualizar código
git status                   # Ver mudanças
git log --oneline            # Histórico
```

---

## 🎯 Script Completo (Copiar e Colar)

Se preferir, execute tudo de uma vez:

```bash
#!/bin/bash

echo "🚀 Iniciando setup do AbraCann..."

# 1. Clonar
echo "📥 Clonando repositório..."
git clone https://github.com/ed335/abra-megazord.git
cd abra-megazord

# 2. Backend
echo "📦 Instalando dependências do backend..."
cd backend
npm install
npm run prisma:generate
cd ..

# 3. Frontend
echo "📦 Instalando dependências do frontend..."
cd web
npm install
cd ..

# 4. Docker
echo "🐳 Iniciando Docker..."
docker-compose up -d

# 5. Aguardar banco
echo "⏳ Aguardando banco de dados..."
sleep 10

# 6. Migrations
echo "🗄️ Executando migrations..."
cd backend
npm run prisma:migrate dev -- --name init
cd ..

# 7. Env files
echo "🔐 Criando .env files..."
cp backend/.env.example backend/.env
cp web/.env.example web/.env.local

echo "✅ Setup completo!"
echo ""
echo "🚀 Para iniciar:"
echo "Terminal 1: cd backend && npm run start:dev"
echo "Terminal 2: cd web && npm run dev"
echo ""
echo "🌐 Acesse:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:3001/api"
echo "pgAdmin: http://localhost:5050"
```

**Para executar:**
```bash
# Criar arquivo
nano setup.sh

# Colar o conteúdo acima
# Salvar: Ctrl+O, Enter, Ctrl+X

# Executar
chmod +x setup.sh
./setup.sh
```

---

## 📚 Documentação Importante

Leia nesta ordem:
1. **README.md** - Visão geral do projeto
2. **SETUP.md** - Setup detalhado (backup deste arquivo)
3. **docs/arquitetura.md** - Arquitetura do sistema
4. **docs/fluxos.md** - Fluxos de usuário
5. **docs/uiux.md** - Design system
6. **docs/compliance.md** - LGPD e segurança

---

## ✨ Parabéns!

Se chegou até aqui, seu AbraCann está pronto para desenvolvimento! 🎉

**Próximos passos:**
- [ ] Ler a documentação
- [ ] Explorar o código
- [ ] Começar a desenvolver
- [ ] Fazer commits e push

**Dúvidas?**
- Verificar docs/
- Rodar troubleshooting
- Verificar logs: `docker-compose logs -f`

---

**Última atualização:** 10 de dezembro de 2025
**Status:** ✅ Production Ready
