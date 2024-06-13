<script>
  import { goto } from '$app/navigation';
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div class="max-w-screen-lg mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-8">Welcome to the Control Panel</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="bg-white rounded-lg shadow-lg p-4">
        <h2 class="text-lg font-bold mb-2">Manage Products</h2>
        <p class="text-gray-700 leading-relaxed">
          Here you can manage all your products. Add new products, update existing ones, and keep track of inventory levels effortlessly.
        </p>
        <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          on:click={() => {
            goto('/control-panel/products');
          }}
        >
          <span class="text-sm">Go to Products</span>
        </button>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-4">
        <h2 class="text-lg font-bold mb-2">Manage Orders</h2>
        <p class="text-gray-700 leading-relaxed">
          View and manage customer orders efficiently. Process new orders, update order status, and ensure timely delivery to your customers.
        </p>
        <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          on:click={() => {
            goto('/control-panel/orders');
          }}
        >
          <span class="text-sm">Go to Orders</span>
        </button>
      </div>
    </div>
  </div>
</div>
