import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import type { Product } from '$lib/types/Product';

// Definir tipo para el contexto del carrito
export interface CartContext {
  cart: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Crear almacén para el carrito de compras
export const cart = writable<Product[]>([]);

// Función para agregar un producto al carrito
export const addItem = (product: Product) => {
  cart.update((items) => [...items, { ...product, quantity: product.quantity ?? 1 }]);
};

// Función para eliminar un producto del carrito
export const removeItem = (productId: number) => {
  cart.update((items) => items.filter((item) => item.id !== productId));
};

// Función para actualizar la cantidad de un producto en el carrito
export const updateItemQuantity = (productId: number, quantity: number) => {
  cart.update((items) =>
    items.map((item) => (item.id === productId ? { ...item, quantity } : item))
  );
};

// Función para limpiar el carrito
export const clearCart = () => {
  cart.set([]);
};

// Obtener o establecer el contexto del carrito
export function getCartContext(): CartContext {
  const initialContext: CartContext = {
    cart: [],
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
  };

  // Intentar obtener el contexto existente o establecer uno nuevo
  const existingContext = getContext<CartContext>('cartContext');
  if (existingContext) {
    return existingContext;
  } else {
    const newContext = initialContext;
    setContext('cartContext', newContext);
    return newContext;
  }
}
