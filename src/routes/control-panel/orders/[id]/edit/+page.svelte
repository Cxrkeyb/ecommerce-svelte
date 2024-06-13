<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let orderId: string;
  let status: string = '';

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3100/v1/orders/${orderId}`);
      if (response.ok) {
        const orderData = await response.json();
        status = orderData.status;
      } else {
        console.error('Error al obtener la orden:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener la orden:', error);
    }
  };

  onMount(async () => {
    orderId = $page.params.id;
    await fetchOrder();
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3100/v1/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Orden actualizada:', data);
        goto('/control-panel/orders');
      } else {
        const errorMessage = await response.text();
        console.error('Error al actualizar la orden:', errorMessage);
      }
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
    }
  };
</script>

<div class="container mx-auto">
  <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={() => goto('/control-panel/orders')}>Go back</button>
</div>

<div class="container mx-auto">
  <h2 class="text-2xl font-bold text-center mt-8 mb-4">Update order</h2>
  <form on:submit|preventDefault={handleSubmit} class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
      <input type="text" id="status" class="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-indigo-500" bind:value={status} required>
    </div>
    <div class="text-sm text-gray-500 mb-4">
      <p>Available status: <span class="font-bold">pending</span>, <span class="font-bold">completed</span>, <span class="font-bold">cancelled</span></p>
    </div>
    <div class="text-center">
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Guardar Cambios</button>
    </div>
  </form>
</div>
