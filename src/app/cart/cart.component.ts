import { Component, OnDestroy, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '@app/cart.service';
import { MenuItems } from '@app/models/menu-items';
import { OrderService } from '@app/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from '@app/models/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnDestroy {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  menuItems: MenuItems[] = [];

  cartItems: MenuItems[] = [];

  totalPrice: number = 0;

  constructor() {
    this.menuItems = history.state.menuItems;

    const cart = localStorage.getItem('cart');
    const parsedCart = JSON.parse(cart!);

    if (parsedCart) {
      this.cartItems = this.menuItems.filter((menuItem) =>
        parsedCart.order.some((order: any) => order.itemId === menuItem.id)
      );
    } else {
      this.cartItems = this.menuItems.filter((menuItem) =>
        this.cartService.cart.order.some(
          (order) => order.itemId === menuItem.id
        )
      );
    }

    this.cartItems = this.cartItems.map((cartItem) => {
      cartItem.quantity = this.cartService.cart.order.filter(
        (order) => order.itemId === cartItem.id
      )[0]?.quantity;
      return cartItem;
    });

    this.totalPrice = this.cartItems.reduce(
      (total, quantity) => total + quantity.price * quantity.quantity!,
      0
    );
  }

  increaseQuantity(cartItem: MenuItems) {
    const item = this.cartItems.find((cartItem) => cartItem.id === cartItem.id);
    if (item && item.quantity) {
      item.quantity++;
    }
  }

  decreaseQuantity(cartItem: MenuItems) {
    const item = this.cartItems.find(
      (itemFromCart) => itemFromCart.id === cartItem.id
    );
    if (item && item.quantity) {
      if (item.quantity === 1) {
        {
          this.cartItems = this.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          if (this.cartItems.length === 0) {
            this.cartService.cart.order = [];
            this.cartService.cart.quantity = 0;
            localStorage.removeItem('cart');
            history.back();
          } else {
            if (
              this.cartService.cart &&
              Array.isArray(this.cartService.cart.order) &&
              this.cartService.cart.order.length > 0
            ) {
              this.cartService.cart.order = this.cartService.cart.order.filter(
                (orderItem) => orderItem.itemId !== cartItem.id
              );

              this.cartService.cart.quantity =
                this.cartService.cart.order.reduce(
                  (total, order) => total + order.quantity,
                  0
                );
            } else {
              this.cartService.cart.quantity = 0; // Ensure quantity is reset if order array is empty or invalid
            }

            localStorage.setItem('cart', JSON.stringify(this.cartItems));
          }
          return;
        }
      }
      item.quantity--;
    }
  }

  placeOrder() {
    const orderObject = this.cartItems.map((cartItem) => ({
      itemId: cartItem.id,
      quantity: cartItem.quantity,
    }));

    this.orderService
      .placeOrder(this.orderService.selectedRestaurantId()!, orderObject)
      .subscribe({
        next: (res) => {
          this.snackBar.open(res, res);
        },
        error: (err) => {
          this.snackBar
            .open('Your order is being processed', 'Ok')
            .afterDismissed()
            .subscribe(() => {
              this.router.navigate(['/home']);
            });
        },
      });
  }

  ngOnDestroy(): void {
    this.orderService.selectedRestaurantId.set(null);
    this.cartService.cart = new Cart();
    localStorage.removeItem('restaurantId');
    localStorage.removeItem('cart');
  }

  back() {
    history.back();
  }
}
