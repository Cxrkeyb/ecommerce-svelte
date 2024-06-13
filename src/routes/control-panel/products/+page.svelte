<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Product } from '$lib/types/Product';
	import { goto } from '$app/navigation';

	let products = writable<Product[]>([]);
	let error = writable<string | null>(null);

	let page = 1;
	let limit = 10;
	let totalPages = 0;

	const loadProducts = async () => {
		try {
			const response = await fetch(
				`http://localhost:3100/v1/products?page=${page}&limit=${limit}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			if (response.ok) {
				let data = await response.json();
				products.set(data.data);
				totalPages = data.totalPages;
			} else {
				error.set(`Error fetching products: ${response.status} ${response.statusText}`);
				console.error(error);
			}
		} catch (err) {
			error.set(`Error fetching products: ${(err as Error).message}`);
			console.error(error);
		}
	};

	const goToPage = (pageNumber: number) => {
		page = pageNumber;
		loadProducts();
	};

	const previousPage = () => {
		if (page > 1) {
			page--;
			loadProducts();
		}
	};

	const nextPage = () => {
		if (page < totalPages) {
			page++;
			loadProducts();
		}
	};

	let pageTitle = 'Control Panel - Products';

	onMount(() => {
		document.title = pageTitle;
		loadProducts();
	});

	const handleCreate = () => {
		goto('/control-panel/products/create');
	};

	const handleRead = (productId: string) => {
		goto(`/products/${productId}`);
	};

	const handleUpdate = (productId: string) => {
		goto(`/control-panel/products/${productId}/edit`);
	};

	const handleDelete = (productId: string) => {
		if (confirm('¿Estás seguro de eliminar este producto?')) {
			(async () => {
				try {
					const response = await fetch(`http://localhost:3100/v1/products/${productId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if (response.ok) {
						loadProducts();
						error.set(null);
					} else {
						error.set(`Error deleting product: ${response.status} ${response.statusText}`);
						console.error(error);
					}
				} catch (err) {
					error.set(`Error deleting product: ${(err as Error).message}`);
					console.error(error);
				}
			})();
		}
	};
</script>

<div class="container mx-auto">
	<button
		class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
		on:click={() => goto('/control-panel')}>Go back</button
	>
</div>
<div class="container mx-auto px-4">
	<div class="flex justify-between items-center border-b border-gray-300 py-4 mb-4">
		<h2 class="text-2xl font-bold text-center mt-8 mb-4">Products</h2>
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			on:click={handleCreate}>Create</button
		>
	</div>

	{#if $products.length > 0}
		{#each $products as product (product.id)}
			<div class="border rounded p-4 mb-4 flex flex-col sm:flex-row sm:items-center">
				<img
					src={product.image}
					alt={product.name}
					class="w-32 h-32 object-cover rounded-lg mb-4 sm:mr-4 sm:w-48 sm:h-48"
				/>
				<div class="flex-1 sm:w-2/3">
					<h3 class="text-lg font-bold mb-2">{product.name}</h3>
					<p class="mb-2">{product.description}</p>
					<div class="flex space-x-2">
						<button
							class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							on:click={() => handleRead(product.id)}>View</button
						>
						<button
							class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							on:click={() => handleUpdate(product.id)}>Update</button
						>
						<button
							class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							on:click={() => handleDelete(product.id)}>Delete</button
						>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<p class="text-center mt-4">No hay productos para mostrar.</p>
	{/if}

	{#if $error}
		<p class="text-red-500 text-center mt-4">{$error}</p>
	{/if}

	{#if totalPages > 1}
		<div class="flex justify-center mt-4">
			<button
				class="bg-primary text-white font-bold py-2 px-4 rounded-full mr-2 {page === 1
					? 'cursor-not-allowed'
					: 'cursor-pointer'}"
				disabled={page === 1}
				on:click={previousPage}>Previous</button
			>
			{#each Array.from({ length: totalPages }, (_, i) => i + 1) as num}
				<button
					class="bg-primary text-white font-bold py-2 px-4 rounded-full mr-2 {num === page
						? 'bg-green-500'
						: 'cursor-pointer'}"
					disabled={num === page}
					on:click={() => goToPage(num)}>{num}</button
				>
			{/each}
			<button
				class="bg-primary text-white font-bold py-2 px-4 rounded-full {page === totalPages
					? 'cursor-not-allowed'
					: 'cursor-pointer'}"
				disabled={page === totalPages}
				on:click={nextPage}>Next</button
			>
		</div>
	{/if}
</div>
