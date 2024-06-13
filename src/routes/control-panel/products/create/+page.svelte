<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let name: string = '';
  let description: string = '';
  let price: number = 0;
  let stock: number = 0;
  let image: string = '';

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3100/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, price, stock, image })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Producto creado:', data);
        goto('/control-panel/products');
      } else {
        const errorMessage = await response.text();
        console.error('Error al Create el producto:', errorMessage);
      }
    } catch (error) {
      console.error('Error al Create el producto:', error);
    }
  };

  let pageTitle = 'Control Panel - Create Product';

	onMount(() => {
		document.title = pageTitle;
	});
</script>

<div class="container mx-auto">
  <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={() => goto('/control-panel/products')}>Go back</button>
</div>

<div class="container mx-auto">
  <h2 class="text-2xl font-bold text-center mt-8 mb-4">Create Producto</h2>
  <form on:submit|preventDefault={handleSubmit} class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
      <input type="text" id="name" class="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-indigo-500" bind:value={name} required>
    </div>
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
      <textarea id="description" class="border border-gray-300 rounded-md px-3 py-2 w-full h-24 resize-none focus:outline-none focus:border-indigo-500" bind:value={description} required></textarea>
    </div>
    <div class="mb-4">
      <label for="price" class="block text-sm font-medium text-gray-700">Precio</label>
      <input type="number" id="price" class="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-indigo-500" bind:value={price} required>
    </div>
    <div class="mb-4">
      <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
      <input type="number" id="stock" class="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-indigo-500" bind:value={stock} required>
    </div>
    <div class="mb-4">
      <label for="image" class="block text-sm font-medium text-gray-700">URL de la Imagen</label>
      <input type="text" id="image" class="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-indigo-500" bind:value={image} required>
    </div>
    <div class="text-center">
      <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Producto</button>
    </div>
  </form>
</div>
