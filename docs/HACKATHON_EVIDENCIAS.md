# Nodus — evidências públicas do hackathon

> Preencha este arquivo somente depois da execução real em Testnet/Devnet. Não inclua seed phrase, keypair JSON, `.env`, bearer token, API key, segredo do publisher ou chave de criptografia.

## Identidade Solana Devnet

| Evidência | Valor público | Explorer |
| --- | --- | --- |
| Program ID Anchor | `PENDENTE` | `PENDENTE` |
| Wallet Owner | `PENDENTE` | `PENDENTE` |
| Wallet Member | `PENDENTE` | `PENDENTE` |
| PDA Organization (`demo-org`) | `PENDENTE` | `PENDENTE` |
| PDA Member (Owner) | `PENDENTE` | `PENDENTE` |
| PDA Member (Member) | `PENDENTE` | `PENDENTE` |
| PDA Capability (Member) | `PENDENTE` | `PENDENTE` |
| Transação de provisionamento | `PENDENTE` | `PENDENTE` |
| Transação de revogação | `PENDENTE` | `PENDENTE` |

## Evidência Walrus Testnet

| Evidência | Valor público | Link |
| --- | --- | --- |
| Nome do arquivo de demonstração (sem dado sensível) | `PENDENTE` | — |
| Blob ID | `PENDENTE` | `PENDENTE` |
| Upload realizado em | `PENDENTE` | — |
| Owner conseguiu baixar/descriptografar após recarregar | `PENDENTE` | — |

## Fluxo de compartilhamento e revogação

- [ ] Owner autenticou via SIWS com PDA Devnet ativo.
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
