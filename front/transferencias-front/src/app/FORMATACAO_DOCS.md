# Documentação dos Pipes e Utilitários de Formatação

## Visão Geral
Este documento descreve os pipes e utilitários criados para formatação de moeda (Real Brasileiro) e datas.

## Pipes Criados

### 1. BrlCurrencyPipe
**Localização**: `src/app/pipe/brl-currency.pipe.ts`

**Objetivo**: Formatar números no padrão monetário brasileiro.

**Uso na Template**:
```html
{{ 35000.00 | brlCurrency }}
```

**Resultado**:
- Entrada: `35000.00`
- Saída: `R$ 35.000,00`

**Características**:
- Converte ponto para vírgula no separador decimal
- Adiciona separador de milhares (ponto)
- Adiciona símbolo "R$"
- Trata valores null/undefined como "R$ 0,00"

**Exemplo de Uso**:
```html
<!-- Exibição de saldo -->
<td>{{ element.amount | brlCurrency }}</td>

<!-- Exibição de taxa -->
<td>{{ element.tax | brlCurrency }}</td>
```

---

### 2. BrlDatePipe
**Localização**: `src/app/pipe/brl-date.pipe.ts`

**Objetivo**: Converter datas do formato ISO (yyyy-MM-dd) para formato brasileiro (dd/MM/yyyy).

**Uso na Template**:
```html
{{ '2026-04-25' | brlDate }}
```

**Resultado**:
- Entrada: `2026-04-25`
- Saída: `25/04/2026`

**Características**:
- Aceita datas em formato ISO (yyyy-MM-dd)
- Converte para formato brasileiro (dd/MM/yyyy)
- Se já está em formato brasileiro, retorna como está
- Se a data está vazia, retorna string vazia

**Exemplo de Uso**:
```html
<!-- Exibição de data de agendamento -->
<td>{{ element.dateScheduling | brlDate }}</td>

<!-- Exibição de data de transferência -->
<td>{{ element.dateTransfer | brlDate }}</td>
```

---

## Utilitários: FormatUtils

**Localização**: `src/app/utils/format-utils.ts`

**Objetivo**: Fornecer funções utilitárias para conversão bidirecional de formatos.

### Métodos Disponíveis

#### 1. `currencyBrlToNumber(value: string | number): number`
Converte moeda brasileira para número.

```typescript
FormatUtils.currencyBrlToNumber('R$ 1.234,56'); // Retorna: 1234.56
FormatUtils.currencyBrlToNumber(1234.56);       // Retorna: 1234.56
```

#### 2. `dateBrlToIso(value: string): string`
Converte data brasileira (dd/MM/yyyy) para ISO (yyyy-MM-dd).

```typescript
FormatUtils.dateBrlToIso('25/04/2026');  // Retorna: 2026-04-25
FormatUtils.dateBrlToIso('2026-04-25');  // Retorna: 2026-04-25
```

#### 3. `numberToCurrencyBrl(value: number): string`
Converte número para moeda brasileira.

```typescript
FormatUtils.numberToCurrencyBrl(1234.56);  // Retorna: R$ 1.234,56
```

#### 4. `dateIsoToBrl(value: string): string`
Converte data ISO (yyyy-MM-dd) para brasileira (dd/MM/yyyy).

```typescript
FormatUtils.dateIsoToBrl('2026-04-25');  // Retorna: 25/04/2026
```

---

## Fluxo de Funcionamento

### Exibição de Dados (UI)
1. Dados chegam do backend em formato padrão:
   - Moeda: `35000.00` (ponto como decimal)
   - Data: `2026-04-25` (ISO format)

2. Pipes convertem para formato brasileiro:
   - Moeda: `R$ 35.000,00` (vírgula como decimal)
   - Data: `25/04/2026` (formato brasileiro)

3. Usuário visualiza os dados no padrão brasileiro

### Envio de Dados (Formulário)
1. Usuário insere dados no formulário (ou dados vêm de um input)
2. Antes de enviar para o backend, o componente converte:
   - Data: `25/04/2026` → `2026-04-25` usando `FormatUtils.dateBrlToIso()`
   - Moeda: `R$ 35.000,00` → `35000.00` usando `FormatUtils.currencyBrlToNumber()`

3. Dados são enviados ao backend no formato padrão

---

## Implementação no Dialog Component

No `DialogCrudComponent`, durante o envio de transferências:

```typescript
public transferValue(): void {
  // Criar uma cópia do objeto transfer para envio
  const transferToSend = { ...this.transfer };
  
  // Converter data para ISO format (yyyy-MM-dd) se estiver em formato brasileiro
  if (transferToSend.dateScheduling) {
    transferToSend.dateScheduling = FormatUtils.dateBrlToIso(transferToSend.dateScheduling);
  }
  
  this.transferService.salvar(transferToSend).subscribe( response => {
    this.transferSearch();
    this._snackBar.open('Transferência realizada com sucesso!', 'Fechar', ...);
  }, (error) => {
    this._snackBar.open(error.error.error, 'Fechar', ...);
  });
}
```

---

## Exemplo Prático Completo

### Template HTML
```html
<!-- Exibição de saldo (read-only com pipe) -->
<mat-form-field>
  <mat-label>Saldo</mat-label>
  <input matInput disabled [value]="(user.amount | brlCurrency)" name="value">
</mat-form-field>

<!-- Input de valor para transferência (usuário insere número simples) -->
<mat-form-field>
  <mat-label>Valor para Transferir</mat-label>
  <input matInput [(ngModel)]="transfer.amount" name="value" placeholder="0.00">
</mat-form-field>

<!-- Data de Agendamento (usuário insere no formato ISO) -->
<mat-form-field>
  <mat-label>Data de Agendamento</mat-label>
  <input matInput [(ngModel)]="transfer.dateScheduling" name="dateScheduling" placeholder="yyyy-MM-dd">
</mat-form-field>

<!-- Tabela exibindo dados com pipes -->
<table>
  <td>{{ element.amount | brlCurrency }}</td>
  <td>{{ element.tax | brlCurrency }}</td>
  <td>{{ element.dateScheduling | brlDate }}</td>
  <td>{{ element.dateTransfer | brlDate }}</td>
</table>
```

---

## Modificações Realizadas

### Arquivos Criados
1. `src/app/pipe/brl-currency.pipe.ts` - Pipe de moeda brasileira
2. `src/app/pipe/brl-date.pipe.ts` - Pipe de data brasileira
3. `src/app/utils/format-utils.ts` - Utilitários de formatação

### Arquivos Modificados
1. `src/app/app.module.ts` - Adicionados imports e declarations dos pipes
2. `src/app/feature/table-crud/table-crud.component.html` - Aplicado pipe brlCurrency
3. `src/app/feature/dialog-crud/dialog-crud.component.html` - Aplicados pipes brlCurrency e brlDate
4. `src/app/feature/dialog-crud/dialog-crud.component.ts` - Importado FormatUtils e atualizado método transferValue()

---

## Notas Importantes

1. **Inputs com ngModel**: Inputs editáveis mantêm os dados em formato padrão (número simples, data ISO) para facilitar a conversão
2. **Inputs disabled com value**: Usam pipes para exibição apenas em formato brasileiro
3. **Conversão antes do envio**: O método `transferValue()` converte a data para ISO format antes de enviar ao backend
4. **Tratamento de null/undefined**: Ambos os pipes tratam valores nulos/indefinidos graciosamente

---

## Como Usar em Outros Componentes

Para usar os pipes em outros componentes:

1. Certifique-se que os pipes estão declarados no `AppModule` (já feito)
2. Use o pipe na template como mostrado nos exemplos acima
3. Para conversões em TypeScript, importe e use `FormatUtils`:

```typescript
import { FormatUtils } from 'src/app/utils/format-utils';

// Converter moeda
const number = FormatUtils.currencyBrlToNumber('R$ 1.000,00');

// Converter data
const isoDate = FormatUtils.dateBrlToIso('25/04/2026');
```
