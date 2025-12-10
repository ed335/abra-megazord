# 🚀 Copiar e Colar na VM Google Cloud

## Comando 1: Clonar Repositório
```bash
git clone https://github.com/ed335/abra-megazord.git && cd abra-megazord
```

---

## Comando 2: Instalar Dependências (Backend)
```bash
cd backend && npm install && cd ..
```

---

## Comando 3: Instalar Dependências (Frontend)
```bash
cd web && npm install && cd ..
```

---

## Comando 4: Iniciar Docker
```bash
docker-compose up -d
```

---

## Comando 5: Aguardar 10 segundos e rodar Migrations
```bash
sleep 10 && cd backend && npm run prisma:generate && npm run prisma:migrate dev -- --name init && cd ..
```

---

## Comando 6: Criar .env files
```bash
cp backend/.env.example backend/.env && cp web/.env.example web/.env.local
```

---

## 🎯 Script Completo (Copiar e Colar Tudo)

```bash
# Clone
git clone https://github.com/ed335/abra-megazord.git && cd abra-megazord

# Backend
cd backend && npm install && npm run prisma:generate && cd ..

# Frontend
cd web && npm install && cd ..

# Docker
docker-compose up -d

# Aguardar
sleep 15

# Migrations
cd backend && npm run prisma:migrate dev -- --name init && cd ..

# Env files
cp backend/.env.example backend/.env && cp web/.env.example web/.env.local

echo "✅ Setup completo!"
echo ""
echo "🚀 Inicie os serviços:"
echo "Terminal 1: cd ~/abra-megazord/backend && npm run start:dev"
echo "Terminal 2: cd ~/abra-megazord/web && npm run dev"
echo ""
echo "🌐 Acesse:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:3001/api"
echo "pgAdmin: http://localhost:5050"
echo "MailHog: http://localhost:8025"
```

---

## 📚 Documentação Completa

Depois que tudo rodar, leia em ordem:

1. **README.md**
2. **VM_SETUP_COMPLETO.md** ← Guia detalhado com troubleshooting
3. **docs/arquitetura.md**
4. **docs/fluxos.md**
5. **docs/uiux.md**

---

## ✅ Checklist Final

- [ ] Git clonado
- [ ] Backend npm install
- [ ] Frontend npm install
- [ ] Docker rodando
- [ ] Migrations executadas
- [ ] .env files criados
- [ ] Backend iniciado
- [ ] Frontend iniciado
- [ ] Consegue acessar http://localhost:3000

---

**Links:**
- Repositório: https://github.com/ed335/abra-megazord
- Guia Completo: https://github.com/ed335/abra-megazord/blob/main/VM_SETUP_COMPLETO.md
