<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let order: any = null;

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3100/v1/orders/${$page.params.id}`);
      if (response.ok) {
        order = await response.json();
      } else {
        console.error('Error al obtener la orden:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener la orden:', error);
    }
  };

  onMount(fetchOrder);
</script>

{#if order}
  <div class="container mx-auto">
    <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={() => window.history.back()}>Go back</button>
  </div>

  <div class="container mx-auto">
    <h2 class="text-2xl font-bold text-center mt-8 mb-4">Detalles de la Orden</h2>
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div class="mb-4">
        <p><span class="font-bold">ID:</span> {order.id}</p>
        <p><span class="font-bold">Estado:</span> {order.status}</p>
      </div>

      <h3 class="text-lg font-bold mt-4 mb-2">Productos</h3>
      {#each order.orderProducts as orderProduct}
        <div class="border border-gray-300 rounded-md p-4 mb-4">
          <p><span class="font-bold">Producto:</span> {orderProduct.product.name}</p>
          <p><span class="font-bold">Descripción:</span> {orderProduct.product.description}</p>
          <p><span class="font-bold">Cantidad:</span> {orderProduct.quantity}</p>
          <p><span class="font-bold">Precio unitario:</span> ${orderProduct.product.price.toFixed(2)}</p>
          <img src={orderProduct.product.image} alt={orderProduct.product.name} class="mt-2 rounded-lg" style="max-width: 200px;">
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p class="text-center mt-8">Cargando detalles de la orden...</p>
{/if}
