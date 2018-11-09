import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { map, switchMap } from 'rxjs/operators';
import { Entity } from '../models/entity';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnDestroy {
  category: string;
  products: Entity<Product>[] = [];
  filteredProducts: Entity<Product>[];
  subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService) {
      this.subscription  = productService.getAll()
        .snapshotChanges()
        .pipe(map(changes => {
          return changes.map(p => ({ key: p.key, value: p.payload.val() }));
        }))
        .pipe(switchMap(products => {
          this.products = products;
          return route.queryParamMap; }))
        .subscribe(params => {
            this.category = params.get('category');
            this.filteredProducts = (this.category) ?
            this.products.filter(v => v.value.category === this.category) : this.products;
        });
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
