import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, Observable, tap, throwError } from 'rxjs';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private suppliersUrl = 'api/suppliers';

  constructor(private http: HttpClient) {}

  //method to get the list of products
  //use an interface to define the type returned by the method
  getProducts(): Observable<Product[]> {
    return (
      this.http
        //get method automaticaly maps to that shape
        .get<Product[]>(this.productsUrl)
        //use a pipe method to pipe through a set of operators
        .pipe(
          //tap - displays some debugging info
          tap((data) => console.log('Products: ', JSON.stringify(data))),
          //catchErrror - handles errors
          //if an error occurs we call the handle error method
          catchError(this.handleError)
        )
    );
  }

  private fakeProduct(): Product {
    return {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      // category: 'Toolbox',
      quantityInStock: 30,
    };
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
