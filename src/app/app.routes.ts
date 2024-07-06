import { Routes } from '@angular/router';

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
  },
  {
    path: 'menu/:id',
    loadComponent: () =>
      import('@app/menu/menu.component').then((c) => c.MenuComponent),
  },
  {
    path: 'menu-items',
    loadComponent: () =>
      import('@app/items/items.component').then((c) => c.ItemsComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('@app/cart/cart.component').then((c) => c.CartComponent),
  },
];
