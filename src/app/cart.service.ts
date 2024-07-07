import { Injectable } from '@angular/core';
import { MenuItems } from './models/menu-items';
import { Cart } from './models/cart';

@Injectable()
export class CartService {
  cart: Cart = new Cart();

  constructor() {
    const stringifiedOrder = localStorage.getItem('cart');
    if (stringifiedOrder) {
      const parsedOrder = JSON.parse(stringifiedOrder);

      // Ensure parsedOrder is an array
      if (Array.isArray(parsedOrder.order)) {
        this.cart = {
          order: parsedOrder.order,
          quantity: 0,
        };
        this.updateCartQuantity();
      } else {
        // Handle case where parsedOrder is not in the expected format
        console.error('Parsed order is not an array:', parsedOrder);
        this.cart = {
          order: [],
          quantity: 0,
        };
      }
    } else {
      // Handle case where there's no cart in localStorage
      this.cart = {
        order: [],
        quantity: 0,
      };
    }
  }

  updateCartQuantity() {
    if (
      this.cart &&
      Array.isArray(this.cart.order) &&
      this.cart.order.length > 0
    ) {
      this.cart.quantity = this.cart.order.reduce(
        (total, order) => total + order.quantity,
        0
      );
    } else {
      this.cart.quantity = 0; // Ensure quantity is reset if order array is empty or invalid
    }
  }

  addItemToCart(menuItem: MenuItems) {
    if (!this.cart || !this.cart.order) return;

    const existingItem = this.cart.order.find(
      (item) => item.itemId === menuItem.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = {
        itemId: menuItem.id,
        quantity: 1,
      };

      this.cart.order.push(newItem);
    }

    this.updateCartQuantity();

    const stringifiedOrder = JSON.stringify(this.cart);
    localStorage.setItem('cart', stringifiedOrder);
  }
}
