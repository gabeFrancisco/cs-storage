import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
  standalone: false,
})
export class MoneyPipe implements PipeTransform {
  private currencyPipe = new CurrencyPipe("pt-BR");

  transform(value: string | number | null): string | null {
    if (value == null) return null;

    return this.currencyPipe.transform(
      value,
      'BRL',
      'symbol',
      '1.2-2',
      'pt-BR'
    )
  }

}
