<!-- src/routes/item/[id].svelte -->
<script lang="ts">
	// Importa el contexto del entorno de SvelteKit
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
  import Products from '$lib/components/Products.svelte';

	// Obtiene el id de la URL actual
	export let id = $page.params.id;

	// Puedes usar `id` en tu lógica para cargar datos, etc.

	interface Product {
		id: number;
		name: string;
		description: string;
		price: number;
		image: string;
		stock: number;
	}

	let quantity = 1;

	// Get the product from the server
	let product: Product | null = null;
	let error: string | null = null;

	// Load the product from the server
	const loadProduct = async () => {
		try {
			const response = await fetch(`http://localhost:3100/v1/products/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				product = await response.json();
			} else {
				error = `Error fetching product: ${response.status} ${response.statusText}`;
				console.error(error);
			}
		} catch (err) {
			error = `Error fetching product: ${(err as Error).message}`;
			console.error(error);
		}
	};

	onMount(loadProduct);

	const addToCart = () => {
		console.log('Add to cart');
	};

	const increaseQuantity = () => {
		if (product && product.stock > quantity) {
			quantity += 1;
		}
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			quantity -= 1;
		}
	};
</script>

<div class="flex flex-col items-center justify-center py-20 ">
	<div class="border shadow-xl bg-white container rounded-xl">
		{#if product}
			<div class="flex flex-row items-center justify-center p-2">
				<img src={product.image} alt={product.name} class="h-[550px] w-[550px] object-contain" />
				<div class="flex flex-col items-center justify-center p-8">
					<h2 class="text-3xl font-bold text-primary mb-4">
						{product.name}
					</h2>
					<p class="text-lg text-gray-600 mb-4">
						{product.description}
					</p>
					<p class="text-xl font-bold text-primary">
						${product.price}
					</p>
          <p class="text-lg text-gray-600">
            Stock: {product.stock}
          </p>
					<!-- Quantity -->
					<div class="flex flex-row items-center justify-center mt-4">
						<button
							class="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 {quantity === 1
								? 'cursor-not-allowed'
								: ''}"
							on:click={decreaseQuantity}
						>
							-
						</button>
						<span class="text-xl font-bold px-4">
							{quantity}
						</span>
						<button
							class="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 {product.stock ===
							quantity
								? 'cursor-not-allowed'
								: ''}"
							on:click={increaseQuantity}
						>
							+
						</button>
					</div>

					<!-- Boton add to cart -->
					<button class="bg-primary text-white px-4 py-2 rounded-lg mt-4" on:click={addToCart}>
						Add to Cart
					</button>
				</div>
			</div>
		{:else}
			<p class="text-red-500 p-4">
				{error}
			</p>
		{/if}
	</div>
</div>
<Products limit={4}  />