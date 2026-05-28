import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brlCurrency'
})
export class BrlCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return 'R$ 0,00';
    }

    // Converte para string com 2 casas decimais
    const formatted = value.toFixed(2);
    
    // Separa inteira e decimal
    const parts = formatted.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Formata a parte inteira com pontos a cada 3 dígitos
    const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Retorna no formato brasileiro: R$ 1.234,56
    return `R$ ${integerFormatted},${decimalPart}`;
  }
}
