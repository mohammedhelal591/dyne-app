import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from './models/retaurant';
import { Menu } from './models/menu';

@Injectable()
export class OrderService {
  http = inject(HttpClient);

  // Get all restaurants
  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      `https://api.mocki.io/v2/aqprm7yv/restaurants`
    );
  }

  // Get menu items
  getMenuItems(menuId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(
      `https://api.mocki.io/v2/aqprm7yv/menus/:${menuId}`
    );
  }

  // Place order
  placeOrder(restId: number, order: any): Observable<any> {
    return this.http.post<any>(
      `https://api.mocki.io/v2/aqprm7yv/order/:${restId}`,
      { order }
    );
  }
}
