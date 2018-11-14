import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  category: string;
  products: Product[] = [];
  filteredProducts: Product[];
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(p => ({
          ...p.payload.val(),
          $key: p.key
        }));
      }))
      .pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap; }))
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(v => v.category === this.category) : this.products;
  }
}
