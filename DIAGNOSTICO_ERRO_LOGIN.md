# 🔍 Guia de Diagnóstico - Erro de Comunicação com Banco de Dados

## Passo 1: Verificar o Console do Navegador
1. Abra o navegador (F12 ou Ctrl+Shift+I)
2. Vá até a aba **Console**
3. Tente fazer login
4. **Copie exatamente o erro que aparecer**

## Passo 2: Identificar se é Frontend ou Backend

### ✅ Se o erro contiver:
- `ERR_FAILED` ou `ERR_NETWORK` → **PROBLEMA NO BACKEND** (servidor não respondeu)
- `404 Not Found` → **ERRO DE URL** (endpoint errado)
- `401 Unauthorized` → **PROBLEMA DE TOKEN/AUTENTICAÇÃO** (pode ser backend)
- `403 Forbidden` → **PROBLEMA DE PERMISSÃO** (backend)
- `500 Internal Server Error` → **ERRO NO BACKEND** (servidor teve exceção)
- `200` mas dados vazios → **PROBLEMA NO BACKEND** (resposta inválida)

### ❌ Se o erro for no Frontend:
- Erro de parsing JSON
- Dados undefined/null
- Erro ao acessar propriedades (cannot read property...)

## Passo 3: Verificar a URL da API
Execute no console do navegador:
```javascript
console.log("API URL:", import.meta.env.VITE_API_SERVER_URL || 'http://localhost:3333');
```

## Passo 4: Testar a Conexão Diretamente
No console, execute:
```javascript
fetch('http://localhost:3333/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'seu-email@exemplo.com', senha: 'sua-senha' })
})
.then(r => r.json())
.then(d => console.log('Sucesso:', d))
.catch(e => console.error('Erro:', e));
```

## Checklist - O que Verificar:

### No Backend:
- [ ] Servidor está rodando? (porta 3333)
- [ ] Banco de dados está conectado?
- [ ] Endpoint `/api/login` existe?
- [ ] Resposta inclui `auth`, `token`, `usuario`?
- [ ] CORS está configurado para aceitar requisições do frontend?

### No Frontend:
- [ ] Variável `VITE_API_SERVER_URL` está definida em `.env`?
- [ ] URL do servidor está correta?
- [ ] Token está sendo salvo no localStorage?

## Próximas Ações:
1. **Compartilhe comigo** o erro exato do console
2. Vou comparar com a resposta esperada do backend
3. Juntos identificaremos se é frontend ou backend
