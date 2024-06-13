<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import { addItem, cart } from '$lib/context/cartContext';
	import { goto } from '$app/navigation';
	import type { Product } from '$lib/types/Product.d.ts';
	import Products from '$lib/components/Products.svelte';

	// Obtiene el id de la URL actual
	export let id = $page.params.id;

	let quantity = 1;
	let product: Product | null = null;
	let error: string | null = null;

	const loadProduct = async (id: string = $page.params.id) => {
		console.log(`Loading product with id: ${id}`);
		try {
			const response = await fetch(`http://localhost:3100/v1/products/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				product = await response.json();
				console.log('Product loaded:', product);
				quantity = 1;
			} else {
				error = `Error fetching product: ${response.status} ${response.statusText}`;
				console.error(error);
			}
		} catch (err) {
			error = `Error fetching product: ${(err as Error).message}`;
			console.error(error);
		}
	};

	// Cargar el producto al montar el componente
	onMount(() => {
		loadProduct();
	});

	// Función para añadir al carrito
	const addToCart = () => {
		if (!product) return;

		const item = $cart.find((item) => item.id === product!.id);

		if (item) {
			goto('/cart');
			return;
		}

		addItem({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: quantity,
			image: product.image
		});
	};

	// Función para incrementar la cantidad
	const increaseQuantity = () => {
		if (product && product.stock && product.stock > quantity) {
			quantity += 1;
		}
	};

	// Función para decrementar la cantidad
	const decreaseQuantity = () => {
		if (quantity > 1) {
			quantity -= 1;
		}
	};

	// Suscribirse al estado del carrito para actualizar
	const unsubscribeCart = cart.subscribe((value) => {
		console.log('Cart updated:', value);
	});

	// Suscribirse a los cambios de página para detectar cambios en los parámetros de la URL
	const unsubscribeProduct = page.subscribe(($page) => {
		const productId = $page.params.id;
		if (productId) {
			loadProduct(productId);
		}
	});

	// Limpiar la suscripción al desmontar el componente
	onDestroy(() => {
		unsubscribeCart();
		unsubscribeProduct();
	});
</script>

<div class="flex flex-col items-center justify-center py-20">
	<div class="border shadow-xl bg-white container rounded-xl">
		{#if product}
			<div class="flex flex-row items-center justify-center p-2">
				<img src={product.image} alt={product.name} class="h-[550px] w-[550px] object-contain" />
				<div class="flex flex-col items-center justify-center p-8">
					<h2 class="text-3xl font-bold text-primary mb-4">
						{product.name}
					</h2>
					<p class="text-lg text-gray-600 mb-4">
						{product.description && product.description}
					</p>
					<p class="text-xl font-bold text-primary">
						${product.price}
					</p>
					<p class="text-lg text-gray-600">
						Stock: {product.stock}
					</p>

					<!-- Cantidad -->
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
					<!-- Botón agregar al carrito -->
					<button class="bg-primary text-white px-4 py-2 rounded-lg mt-4" on:click={addToCart}>
						<!-- Si el producto ya está en el carrito cambiar el texto -->
						{#if $cart.find((item) => product && item.id === product.id)}
							Go to cart
						{:else}
							Add to Cart
						{/if}
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
<Products limit={4} />
