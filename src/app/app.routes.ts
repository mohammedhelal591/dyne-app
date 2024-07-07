import { Routes } from '@angular/router';
import { OrderService } from './order.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@app/home/home.component').then((c) => c.HomeComponent),
    providers: [OrderService],
  },
  {
    path: 'menu/:id',
    loadComponent: () =>
      import('@app/menu/menu.component').then((c) => c.MenuComponent),
    providers: [OrderService],
  },
  {
    path: 'menu-items',
    loadComponent: () =>
      import('@app/items/items.component').then((c) => c.ItemsComponent),
    providers: [OrderService],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('@app/cart/cart.component').then((c) => c.CartComponent),
    providers: [OrderService],
  },
];
