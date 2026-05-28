import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brlDate'
})
export class BrlDatePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    // Remove espaços em branco
    value = value.trim();

    // Tenta identificar o formato da data de entrada
    // Formato esperado: yyyy-MM-dd ou yyyy-MM-ddTHH:mm:ss
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})/;
    const match = value.match(dateRegex);

    if (match) {
      const year = match[1];
      const month = match[2];
      const day = match[3];
      return `${day}/${month}/${year}`;
    }

    // Se for dd/MM/yyyy, retorna como está
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return value;
    }

    return value;
  }
}
