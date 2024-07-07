import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Menu } from '@app/models/menu';
import { OrderService } from '@app/order.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    NgStyle,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  orderService = inject(OrderService);

  restaurantName: string = '';
  menus: Menu[] = [];
  restaurantId: number = 0;

  constructor() {
    this.restaurantId = this.activatedRoute.snapshot.params['id'];
    this.restaurantName = history.state.restaurantName;
    this.menus = history.state.menus;

    console.log(this.menus);
    console.log(this.restaurantName);
  }

  getBackgroundStyle(img: string) {
    return {
      'background-image': `url(${img})`,
      'background-size': 'cover',
      'background-position': 'center center',
    };
  }

  openMenu(){

  }
}
