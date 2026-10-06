# Roteiro da demo — 5 a 7 minutos

## Antes de gravar

- Abrir Owner e Member em perfis separados do navegador.
- Deixar as duas wallets na Solana Devnet e com saldo suficiente.
- Executar `npm run demo:preflight` e guardar o resultado.
- Separar uma imagem ou PDF de 1–10 MB sem dados pessoais.
- Abrir previamente os links públicos do Program ID, PDAs e Walruscan.
- Fazer uma execução completa sem gravação e depois iniciar uma gravação de backup.

## 0:00–0:40 — problema

“Produtos Web3 ainda precisam escolher entre armazenamento verificável e privacidade. A Nodus cifra o arquivo no dispositivo, armazena apenas ciphertext no Walrus Testnet e usa papéis verificáveis na Solana Devnet para controlar a entrega das chaves.”

Mostrar os badges Testnet/Devnet. Não mencionar Mainnet, produção, SLA ou exclusão remota de cópias já baixadas.

## 0:40–1:50 — Owner envia o arquivo

1. Entrar como Owner via SIWS.
2. Mostrar organização, papel e link do Member PDA no painel de evidências.
3. Selecionar o arquivo e iniciar o upload.
4. Narrar: “A cifra AES-256-GCM ocorre neste navegador; o gateway recebe somente ciphertext.”
5. Abrir o arquivo no catálogo e mostrar “Cifrado no dispositivo”, Blob ID e Walruscan.

Frase de sucesso esperada: “Arquivo protegido e armazenado no Walrus Testnet.”

## 1:50–3:10 — compartilhar com Member

1. Abrir “Compartilhar acesso cifrado”.
2. Selecionar o Member e manter a permissão fixa `viewer`.
3. Clicar em “Cifrar e conceder acesso”.
4. Mostrar o acesso ativo e, quando retornado pela API, o PDA no Explorer.
5. Narrar: “A chave do arquivo não é enviada em texto puro. Este navegador cria um envelope exclusivo para a identidade pública do Member.”

Frase esperada: “Acesso cifrado concedido a [Member].”

## 3:10–4:20 — Member abre

1. Alternar para o segundo perfil sem desconectar o Owner.
2. Entrar como Member via SIWS.
3. Mostrar `demo-org`, papel `viewer` e PDA verificável.
4. Abrir o mesmo arquivo e confirmar a descriptografia no navegador.

Se falhar, não improvisar um bypass. Mostrar a mensagem de acesso e usar a gravação de backup.

## 4:20–5:20 — revogar

1. Voltar ao Owner.
2. Abrir o arquivo, localizar o Member e revogar.
3. Mostrar a mensagem: “O acesso futuro foi bloqueado. Cópias já baixadas não podem ser apagadas.”
4. Voltar ao Member, recarregar e tentar buscar o envelope novamente.
5. Mostrar a negação sem esconder o erro.

## 5:20–6:10 — provas e limite honesto

Abrir Walruscan e Solana Explorer. Encerrar com:

“A demo prova armazenamento de ciphertext no Walrus Testnet, RBAC na Solana Devnet e entrega client-side de envelopes. Revogação bloqueia novas leituras; ela não apaga uma cópia que o destinatário já tenha descriptografado.”

## Plano de contingência

- Rede instável: usar a gravação completa de backup e ainda abrir as provas públicas.
- Wallet não conecta: mostrar o erro e não usar a sessão de demonstração como evidência real.
- Walrus indisponível: mostrar um Blob ID previamente confirmado, deixando claro que é uma execução anterior.
- Explorer indisponível: mostrar os endereços públicos e a gravação em que os links abriram.

