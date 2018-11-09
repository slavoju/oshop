import { Component, Input } from '@angular/core';
import { Entity } from 'src/app/models/entity';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() key: string;

  constructor() { }

  addToCart(productKey: string) {
    console.log(productKey);
  }
}
