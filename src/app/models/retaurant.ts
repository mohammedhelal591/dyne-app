import { Menu } from './menu';

export interface Restaurant {
  id: number;
  name: string;
  restaurantBackground?: string;
  background?: string;
  menus: Menu[];
  tags: string[];
}
