import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItems } from '@app/models/menu-items';
import { OrderService } from '@app/order.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '@app/cart.service';
import { Order } from '@app/models/order';
import { Cart } from '@app/models/cart';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {
  activatedRoute = inject(ActivatedRoute);
  orderService = inject(OrderService);
  cartService = inject(CartService);
  router = inject(Router);

  menuItems: MenuItems[] = [];
  menuName: string = '';

  constructor() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const parsedCart = JSON.parse(cart!);
      if (parsedCart) {
        this.cartService.cart = parsedCart;
      }
    } else {
      this.cartService.cart = new Cart();
    }

    this.menuName = history.state.menuName;
    this.orderService.selectedRestaurantId = history.state.restaurantId;

    if (this.activatedRoute.snapshot.params['id'])
      this.orderService
        .getMenuItems(this.activatedRoute.snapshot.params['id'])
        .subscribe({
          next: (menuItems) => {
            this.menuItems = menuItems;
          },
        });
  }

  addItemToCart(menuItem: MenuItems) {
    const order: Order = {
      itemId: menuItem.id,
      quantity: 1,
    };
    this.cartService.addItemToCart(menuItem);
  }

  back() {
    localStorage.removeItem('cart');
    this.cartService.cart = new Cart();
    history.back();
  }

  openCart() {
    if (this.cartService.cart.order.length > 0) {
      this.router.navigate(['/cart'], {
        state: {
          menuItems: this.menuItems,
        },
      });
    } else {
      return;
    }
  }
}
