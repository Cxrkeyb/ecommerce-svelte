export interface Order {
  id: string;
  products: Product[];
  total: number;
  status: 'pending' | 'completed';
}