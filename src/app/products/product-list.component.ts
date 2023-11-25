import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { EMPTY, Observable, catchError, of } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  //local error message property
  errorMessage = '';
  categories: ProductCategory[] = [];

  //local products property
  // products: Product[] = [];

  products$: Observable<Product[]> | undefined;
  // sub!: Subscription;

  //DI
  constructor(private productService: ProductService) {}

  //calls product serice method each time the page is initialized
  ngOnInit(): void {
    // this.sub =
    this.products$ = this.productService.getProducts().pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
    // //subscribe starts the observable which issues the http get request
    // .subscribe({
    //   //when we receive http response our observer is notified
    //   //next method is executed and the observable completes
    //   next: (products) => (this.products = products),
    //   error: (err) => (this.errorMessage = err),
    // });
  }

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
