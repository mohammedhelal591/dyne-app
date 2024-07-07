import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Restaurant } from '@app/models/retaurant';
import { OrderService } from '@app/order.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    NgStyle,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  orderService = inject(OrderService);
  router = inject(Router);

  constructor() {
    this.orderService.getAllRestaurants().subscribe({
      next: (restaurants) => {
        this.orderService.restaurants.set(restaurants);
      },
    });
  }

  getBackgroundStyle(img: string) {
    return {
      'background-image': `url(${img}), linear-gradient(to bottom, rgba(0, 0, 0, 0) 18%, rgba(0, 0, 0, 0.8) 78%)`,
      'background-size': 'cover',
      'background-position': 'center center',
    };
  }

  openRestaurant(restaurant: Restaurant) {
    this.orderService.selectedRestaurantId.set(restaurant.id);
    localStorage.setItem('restaurantId', String(restaurant.id));

    this.router.navigate([`/menus/${restaurant.id}`], {
      state: {
        restaurantName: restaurant.name,
        menus: restaurant.menus,
      },
    });
  }
}
