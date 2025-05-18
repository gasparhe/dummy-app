import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(params: {
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Observable<ProductResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
    return this.http.get<ProductResponse>(`${this.baseUrl}?${queryParams}`);
  }

  searchProducts(query: string, params: {
    limit?: number;
    skip?: number;
  }): Observable<ProductResponse> {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.skip) queryParams.append('skip', params.skip.toString());
    
    return this.http.get<ProductResponse>(
      `${this.baseUrl}/search?q=${query}&${queryParams}`
    );
  }
}