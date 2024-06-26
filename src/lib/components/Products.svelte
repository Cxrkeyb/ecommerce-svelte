<script lang="ts">
  export let header: boolean = true;
  export let button: boolean = true;
  export let pagination: boolean = false;
  export let page: number = 1;
  export let limit: number = 8;

  import { onMount } from 'svelte';
  import HeaderWithButton from './cards/HeaderWithButton.svelte';
  import type { Product } from '$lib/types/Product.d.ts';
  import { goto } from '$app/navigation';

  let products: Product[] = [];
  let totalPages: number = 0;
  let error: string | null = null;

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
        products = data.data;
        totalPages = data.totalPages;
      } else {
        error = `Error fetching products: ${response.status} ${response.statusText}`;
        console.error(error);
      }
    } catch (err) {
      error = `Error fetching products: ${(err as Error).message}`;
      console.error(error);
    }
  };

  onMount(loadProducts);

  const changePage = (newPage: number) => {
    page = newPage;
    loadProducts();
  };

  const previousPage = () => {
    if (page > 1) {
      changePage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      changePage(page + 1);
    }
  };
</script>

{#if header}
  <HeaderWithButton
    title="Our products"
    subtitle="Hard to choose right products for your pets?"
    buttonText="View more"
    onClick={() => {
      window.location.href = '/products';
    }}
  />
{/if}
<div class="flex flex-col p-4 items-center justify-center mt-2">
  {#if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">{error}</span>
    </div>
  {:else if products.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {#each products as product}
        <button class="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4 w-full sm:w-[300px] m-2"
          on:click={() => {
            goto(`/products/${product.id}`);
          }}
        >
          <img src={product.image} alt={product.name} class="w-full h-[200px] object-cover" />
          <h3 class="text-lg font-bold">{product.name}</h3>
          <p class="text-gray-500">${product.price}</p>
          {#if button}
            <button class="bg-primary text-white font-bold py-2 px-4 rounded-full mt-4" on:click={() => {
              goto(`/products/${product.id}`);
            }}>
              Go to product
            </button>
          {/if}
        </button>
      {/each}
    </div>

    {#if pagination && totalPages > 1}
      <div class="flex justify-center mt-4">
        <button class="bg-primary text-white font-bold py-2 px-4 rounded-full mr-2 {page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}"
          disabled={page === 1} on:click={previousPage}>
          Previous
        </button>
        {#each Array.from({ length: totalPages }, (_, i) => i + 1) as num}
          <button class="bg-primary text-white font-bold py-2 px-4 rounded-full mr-2 {num === page ? 'bg-green-500' : 'cursor-pointer'}"
            disabled={num === page} on:click={() => changePage(num)}>
            {num}
          </button>
        {/each}
        <button class="bg-primary text-white font-bold py-2 px-4 rounded-full {page === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}"
          disabled={page === totalPages} on:click={nextPage}>
          Next
        </button>
      </div>
    {/if}

  {:else}
    <p class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Notice:</strong>
      <span class="block sm:inline">No products available at the moment. Please check back later!</span>
    </p>
  {/if}
</div>
