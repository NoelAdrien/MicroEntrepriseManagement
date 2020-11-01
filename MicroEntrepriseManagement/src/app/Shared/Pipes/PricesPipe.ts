import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'price' })
export class PricesPipe implements PipeTransform {
    transform(price: number) {
        var formatedPrice = price % 1 !== 0 ? price.toFixed(2) : price;
        return `${formatedPrice} €`;
    }
}