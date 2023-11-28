import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { EMPTY, Observable, catchError, of } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  //local error message property
  errorMessage = '';
  categories: ProductCategory[] = [];

  //local products property
  // products: Product[] = [];

  products$ = this.productService.products$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  // sub!: Subscription;

  //DI
  constructor(private productService: ProductService) {}

  //ensure observable is stoped when the page is destroyed by unsubscribing
  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
