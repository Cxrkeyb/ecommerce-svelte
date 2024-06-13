<script lang="ts">
	import { cart, getCartContext } from '$lib/context/cartContext';
	import { goto } from '$app/navigation';
  import type { Product } from '$lib/types/Product';
  import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Products from '$lib/components/Products.svelte';

	const { removeItem, updateItemQuantity } = getCartContext();

	const cartStore = writable<Product[]>([]);

	onMount(() => {
		const unsubscribe = cart.subscribe((value) => {
			cartStore.set(value);
		});

		return unsubscribe;
	});

	let total = 0;
	$: total = $cartStore.reduce((acc, item) => acc + item.price * item.quantity, 0);

	let error: string | null = null;

	const MakePurchase= async () => {
		// Peticion a la API para realizar la compra
		try {
			const response = await fetch('http://localhost:3100/v1/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					products: $cartStore.map((item) => ({
						id: item.id,
						quantity: item.quantity
					}))
				})
			});
			if (response.ok) {
				// Limpiar el carrito
				cart.set([]);
				goto('/orders');
				error = null;
			}

		} catch (error) {
			console.error('Error realizando la compra:', error);
			error = 'Error realizando la compra';
		}
	}
</script>

<div class="container mx-auto flex flex-col items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
  {#if $cartStore.length > 0}
    <div class="w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg p-4 md:p-6">
      <div class="flex flex-col gap-4">
        {#each $cartStore as item (item.id)}
          <div class="flex flex-col md:flex-row items-center p-4 bg-gray-50 rounded-lg border">
            <img src={item.image} alt={item.name} class="w-20 h-20 object-cover rounded-lg mb-4 md:mb-0 md:mr-4" />
            <div class="flex flex-col md:flex-row flex-1 md:items-center justify-between">
              <div class="flex flex-col">
                <h3 class="text-lg font-bold">
                  {item.name.slice(0, 40)}{item.name.length > 40 ? '...' : ''}
                </h3>
                <p class="text-gray-600 mb-2 md:mb-0">Precio: ${item.price}</p>
              </div>
              <div class="flex items-center mt-2 md:mt-0">
                <div class="flex gap-2">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" on:click={() => updateItemQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" on:click={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    -
                  </button>
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" on:click={() => removeItem(item.id)}>
                    Delete
                  </button>
                </div>
                <p class="text-gray-600 ml-2 md:ml-4">Cantidad: {item.quantity}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="flex justify-between items-center mt-4 pt-4 border-t">
        <p class="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" on:click={MakePurchase}>
          Make purchase
        </button>
      </div>
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 2a6 6 0 00-6 6v2.586l-.707.707A1 1 0 004 13h12a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6zM4 14v1a2 2 0 002 2h8a2 2 0 002-2v-1H4z" clip-rule="evenodd" />
      </svg>
      <p class="text-gray-600 text-lg font-medium">No hay productos en el carrito</p>
    </div>
  {/if}
</div>

<Products limit={4} />