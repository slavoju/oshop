import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Entity } from 'src/app/models/entity';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Entity<Product>[];
  filteredProducts: Entity<Product>[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription  = this.productService.getAll()
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(p => ({ key: p.key, value: p.payload.val() }));
      }))
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
