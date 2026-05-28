/**
 * Utilitário para converter valores do formato brasileiro para o padrão
 */
export class FormatUtils {
  /**
   * Converte moeda brasileira (R$ 1.234,56) para número (1234.56)
   */
  static currencyBrlToNumber(value: string | number): number {
    if (typeof value === 'number') {
      return value;
    }

    if (!value) {
      return 0;
    }

    // Remove "R$" e espaços
    let cleaned = value.replace(/R\$\s*/g, '').trim();
    // Remove pontos (separador de milhares)
    cleaned = cleaned.replace(/\./g, '');
    // Substitui vírgula por ponto (separador decimal)
    cleaned = cleaned.replace(/,/, '.');

    return parseFloat(cleaned) || 0;
  }

  /**
   * Converte data brasileira (dd/MM/yyyy) para ISO format (yyyy-MM-dd)
   */
  static dateBrlToIso(value: string): string {
    if (!value) {
      return '';
    }

    // Se já está em formato ISO, retorna como está
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
      return value;
    }

    // Espera formato dd/MM/yyyy
    const parts = value.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }

    return value;
  }

  /**
   * Converte número para format brasileiro de moeda
   */
  static numberToCurrencyBrl(value: number): string {
    if (isNaN(value)) {
      return 'R$ 0,00';
    }

    const formatted = value.toFixed(2);
    const parts = formatted.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];

    const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `R$ ${integerFormatted},${decimalPart}`;
  }

  /**
   * Converte data ISO (yyyy-MM-dd) para formato brasileiro (dd/MM/yyyy)
   */
  static dateIsoToBrl(value: string): string {
    if (!value) {
      return '';
    }

    value = value.trim();
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})/;
    const match = value.match(dateRegex);

    if (match) {
      const year = match[1];
      const month = match[2];
      const day = match[3];
      return `${day}/${month}/${year}`;
    }

    return value;
  }
}
