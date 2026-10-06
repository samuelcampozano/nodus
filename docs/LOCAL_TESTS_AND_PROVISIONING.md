# Testes locais e provisionamento reproduzível

Esta rotina valida PostgreSQL, provisionamento, envelopes, compartilhamento e revogação sem exigir Solana, Walrus ou um arquivo `.env`.

## Execução completa

Pré-requisito: Docker Desktop ativo com Docker Compose.

```bash
npm run test:collaboration:local
```

O comando:

1. inicia um PostgreSQL 16 isolado na porta `55432`, usando `tmpfs`;
2. aplica todas as migrations do repositório;
3. provisiona `demo-org` duas vezes para provar idempotência;
4. verifica organização, contexto de storage, Owner e Member;
5. testa share, atualização idempotente, expiração, revogação, re-share e isolamento entre tenants;
6. executa o fluxo completo de envelopes e remoção de membro;
7. remove o container e os dados temporários, inclusive quando algum teste falha.

Essa suíte não afirma que houve transação Solana ou upload Walrus. Os identificadores de storage do manifesto são locais e servem somente para satisfazer o contrato do control plane.

## Manifesto

Os dados públicos e não secretos ficam em `config/local-demo-provisioning.json`. Para usar outras wallets, copie o arquivo, altere os endereços públicos e execute:

```bash
node scripts/init-demo-org.mjs --config caminho/para/config.json --database-url postgresql://usuario:senha@host:porta/banco
```

O provisionador usa upsert transacional. Repetir o comando atualiza nome, quota, storage e papéis, sem duplicar usuários ou memberships.

## O que ainda exige ambiente real

- SIWS e consulta dos PDAs na Solana Devnet;
- upload e recuperação de ciphertext no Walrus Testnet;
- evidências públicas no Explorer e Walruscan;
- ensaio em dois perfis de navegador.

