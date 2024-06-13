export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock?: number;
  image?: string;
  description?: string;
}
