# Nodus — evidências públicas do hackathon

> Preencha este arquivo somente depois da execução real em Testnet/Devnet. Não inclua seed phrase, keypair JSON, `.env`, bearer token, API key, segredo do publisher ou chave de criptografia.

## Identidade Solana Devnet

| Evidência | Valor público | Explorer |
| --- | --- | --- |
| Program ID Anchor | `EWDPQ97rnYJyjbB7rpFwCnnYse5KwA8fLRTsv8piuqCE` | [Ver no Explorer](https://explorer.solana.com/address/EWDPQ97rnYJyjbB7rpFwCnnYse5KwA8fLRTsv8piuqCE?cluster=devnet) |
| Wallet Owner | `3ud8N1AYHyjgi3prychYqMXUJ3PEfw6eFU9FaxADxaeF` | [Ver no Explorer](https://explorer.solana.com/address/3ud8N1AYHyjgi3prychYqMXUJ3PEfw6eFU9FaxADxaeF?cluster=devnet) |
| Wallet Member | `EoFuCwyMgxV3Fw7zzx46zeuJcktdqRyNJc8LvkYXitgA` | [Ver no Explorer](https://explorer.solana.com/address/EoFuCwyMgxV3Fw7zzx46zeuJcktdqRyNJc8LvkYXitgA?cluster=devnet) |
| PDA Organization (`demo-org`) | `F1JkG7CkyDB9fAFHJyVdth7qHbbE9LTWhodPMEAy3uPV` | [Ver no Explorer](https://explorer.solana.com/address/F1JkG7CkyDB9fAFHJyVdth7qHbbE9LTWhodPMEAy3uPV?cluster=devnet) |
| PDA Member (Owner) | `HCyGJfkpB85JmXBdKdTLpQSjZyK1CDzqcSW2ghZXVVcE` | [Ver no Explorer](https://explorer.solana.com/address/HCyGJfkpB85JmXBdKdTLpQSjZyK1CDzqcSW2ghZXVVcE?cluster=devnet) |
| PDA Member (Member) | `AS9n1f2HgfoD7Qzw5srqvNAMUcRD6fgxx1JGzw9cjA3f` | [Ver no Explorer](https://explorer.solana.com/address/AS9n1f2HgfoD7Qzw5srqvNAMUcRD6fgxx1JGzw9cjA3f?cluster=devnet) |
| PDA Capability (Member) | `8vJMnth7eYBq5tLGAJvgb8oCYsQRJuw8GY5M2mgqAwkn` | [Ver no Explorer](https://explorer.solana.com/address/8vJMnth7eYBq5tLGAJvgb8oCYsQRJuw8GY5M2mgqAwkn?cluster=devnet) |
| Transação de provisionamento | `4aBqg1LWymjEHExncsBis9tTRaEPjEFv46q6U4NMNvjiJdEqimvWbNNVEn99fun4GsVUDvbUuSnijPX7VKPSBi9T` | [Ver no Explorer](https://explorer.solana.com/tx/4aBqg1LWymjEHExncsBis9tTRaEPjEFv46q6U4NMNvjiJdEqimvWbNNVEn99fun4GsVUDvbUuSnijPX7VKPSBi9T?cluster=devnet) |
| Transação de revogação | `PENDENTE` | `PENDENTE` |

## Evidência Walrus Testnet

| Evidência | Valor público | Link |
| --- | --- | --- |
| Nome do arquivo de demonstração (sem dado sensível) | `nodus-demo-spec.pdf` | — |
| Blob ID | `2Gu-x2S6xnIqm6eQXSZmQuCC4bzClATt8NHelshdjSo` | [Ver no Walruscan](https://walruscan.com/testnet/blob/2Gu-x2S6xnIqm6eQXSZmQuCC4bzClATt8NHelshdjSo) |
| Upload realizado em | `2026-10-06T02:01:29Z` | [Aggregator Testnet](https://aggregator.walrus-testnet.walrus.space/v1/blobs/2Gu-x2S6xnIqm6eQXSZmQuCC4bzClATt8NHelshdjSo) |
| Owner conseguiu baixar/descriptografar após recarregar | `SIM (Certificado Walrus 200 OK)` | — |

## Fluxo de compartilhamento e revogação

- [x] Owner autenticou via SIWS com PDA Devnet ativo.
- [ ] Member autenticou via SIWS com PDA Devnet ativo.
- [ ] Owner compartilhou o arquivo como `viewer` e o Member recebeu o envelope.
- [ ] Member abriu o arquivo cifrado.
- [ ] Owner revogou o share/capability.
- [ ] Nova leitura de envelope pelo Member foi negada.
- [ ] A apresentação explica que cópias previamente abertas não podem ser apagadas.

## Material de apresentação

- [ ] URL ou local do vídeo final de 5–7 minutos: `PENDENTE`
- [ ] URL ou local da gravação de backup: `PENDENTE`
- [ ] Data/hora do último ensaio completo: `PENDENTE`
- [ ] Commit apresentado na demo: `PENDENTE`

## Verificação antes de publicar

```bash
npm run demo:preflight
npm test
```

Revise este arquivo antes de compartilhar: cada identificador deve ser público e abrir no Explorer/Walruscan; qualquer segredo deve ser removido.
