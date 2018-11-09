import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories$;
  @Input() category: string;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll().snapshotChanges();
  }
}
