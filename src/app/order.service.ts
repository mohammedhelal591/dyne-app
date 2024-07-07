import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from './models/retaurant';
import { MenuItems } from './models/menu-items';

@Injectable()
export class OrderService {
  http = inject(HttpClient);

  restaurants = signal<Restaurant[] | []>([], { equal: () => false });

  selectedRestaurantId = signal<number | null>(null, { equal: () => false });

  constructor() {
    const restauranId = localStorage.getItem('restaurantId');
    if (restauranId) {
      const parsedMenu = JSON.parse(restauranId);
      this.selectedRestaurantId.set(parsedMenu);
    }
  }

  // Get all restaurants
  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      `https://api.mocki.io/v2/aqprm7yv/restaurants`
    );
  }

  // Get menu items
  getMenuItems(menuId: number): Observable<MenuItems[]> {
    return this.http.get<MenuItems[]>(
      `https://api.mocki.io/v2/aqprm7yv/menus/${menuId}`
    );
  }

  // Place order
  placeOrder(restId: number, order: any): Observable<any> {
    return this.http.post<any>(
      `https://api.mocki.io/v2/aqprm7yv/order/${restId}`,
      order,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
