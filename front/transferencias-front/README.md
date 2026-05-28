# Transferencias Front

Aplicação front-end em Angular para gerenciamento de contas e agendamento de transferências.

## Visão geral
- Listagem, criação, edição e exclusão de clientes/contas
- Agendamento de transferências e visualização de extrato
- Formatação de moeda em Real (BRL) e datas no formato brasileiro

## Estrutura importante
- `src/app/feature/table-crud` — componente de listagem
- `src/app/feature/dialog-crud` — diálogo de CRUD e transferência
- `src/app/pipe` — pipes: `brl-currency` e `brl-date`
- `src/app/utils/format-utils.ts` — utilitários de conversão (moeda e data)
- `src/app/service` — serviços `client.service.ts` e `transfer.service.ts`

## Pré-requisitos
- Node.js 16 e `npm`
- Chrome (para execução dos testes com Karma)

## Instalação

```bash
npm install
```

## Execução em desenvolvimento

```bash
npm run start
# abrir http://localhost:4200
```

## Testes unitários

Executa os testes com Karma + Chrome:

```bash
npm test -- --watch=false
```

Execução headless (CI):

```bash
npx ng test --watch=false --browsers=ChromeHeadless
```

Problemas conhecidos no Windows com `ChromeHeadless`:
- Se o Karma falhar ao iniciar o ChromeHeadless por causa de lock/profile, finalize processos `chrome.exe` e limpe `%TEMP%\karma-*`.
- Outra alternativa é configurar um `customLauncher` em `karma.conf.js` com flags como `--no-sandbox`, `--disable-dev-shm-usage` e `--user-data-dir` apontando para um diretório temporário.

Exemplo rápido para finalizar processos no PowerShell:

```powershell
taskkill /IM chrome.exe /F
npm test -- --watch=false
```

## Pipes e comportamentos importantes
- `brlCurrency` — formata número para `R$ 1.234,56` (exibição)
- `brlDate` — converte `yyyy-MM-dd` para `dd/MM/yyyy` (exibição)
- `FormatUtils.currencyBrlToNumber()` — converte string BRL para número (envio)
- `FormatUtils.dateBrlToIso()` — converte `dd/MM/yyyy` para `yyyy-MM-dd` (envio)

## DatePicker
- O campo "Data de Agendamento" usa `MatDatepicker` e o componente converte a data selecionada para formato ISO (`yyyy-MM-dd`) antes de enviar ao backend.

## Execução rápida para desenvolvedores
- Suba o backend (por padrão `http://localhost:8080`) ou ajuste `proxy.conf.json`.
- Inicie a aplicação: `npm run start`.
- Rode os testes: `npm test`.

## Contribuição
- Abra issues ou envie PRs com descrições e testes.

---
README gerado/atualizado pelo assistente. Ajuste conforme o fluxo do backend e ambiente local.
