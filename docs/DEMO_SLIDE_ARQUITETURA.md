# Material do slide único — arquitetura da demo

## Título

**Nodus — arquivo privado, storage verificável, acesso revogável**

## Diagrama

```mermaid
flowchart LR
  O[Owner no navegador] -->|AES-256-GCM local| C[Ciphertext]
  C -->|upload| W[Walrus Testnet]
  O -->|SIWS + papel| S[Programa Anchor<br/>Solana Devnet]
  O -->|ECDH P-256| E[Envelope cifrado<br/>para o Member]
  E --> P[PostgreSQL<br/>control plane]
  M[Member no navegador] -->|SIWS + PDA ativo| S
  M -->|busca ciphertext| W
  M -->|busca envelope autorizado| P
  M -->|descriptografia local| F[Arquivo aberto]
  O -->|revoga share| P
  P -. nova leitura negada .-> M
```

## Três mensagens

1. **Zero plaintext no gateway:** arquivo e chave de dados permanecem cifrados fora do navegador.
2. **Provas públicas:** Blob ID no Walrus Testnet e papéis/PDA na Solana Devnet.
3. **Revogação honesta:** bloqueia envelopes futuros; não promete apagar cópias já abertas.

## Rodapé obrigatório

`Demo em Testnet/Devnet · Não é Mainnet · Sem alegação de SLA ou produção`

