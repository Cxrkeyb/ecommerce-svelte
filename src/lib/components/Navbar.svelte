<script lang="ts">
  import { onMount } from 'svelte';

  let menuButton: HTMLButtonElement | null = null;
  let mobileMenu: HTMLElement | null = null;

  onMount(() => {
    menuButton = document.getElementById('mobile-menu-button') as HTMLButtonElement;
    mobileMenu = document.getElementById('mobile-menu') as HTMLElement;

    if (menuButton) {
      menuButton.addEventListener('click', () => {
        if (mobileMenu) {
          mobileMenu.classList.toggle('hidden');
        }
      });
    }
  });
</script>
<nav class="bg-gray-200 shadow">
  <div class="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
    <div class="flex justify-between items-center">
      <div>
        <a class="text-xl font-bold text-gray-800 md:text-2xl" href="/">Brand</a>
      </div>
      <!-- Mobile menu button -->
      <div class="flex md:hidden">
        <button id="mobile-menu-button" type="button" class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
          <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 4H4v2h16v-2z"></path>
          </svg>
        </button>
      </div>
    </div>
    <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
    <div id="mobile-menu" class="hidden md:flex md:items-center">
      <div class="flex flex-col md:flex-row md:mx-6">
        <a class="my-1 text-sm text-gray-700 hover:text-blue-500 md:mx-4 md:my-0" href="/">Home</a>
        <a class="my-1 text-sm text-gray-700 hover:text-blue-500 md:mx-4 md:my-0" href="/">Shop</a>
        <a class="my-1 text-sm text-gray-700 hover:text-blue-500 md:mx-4 md:my-0" href="/">About</a>
        <a class="my-1 text-sm text-gray-700 hover:text-blue-500 md:mx-4 md:my-0" href="/">Contact</a>
      </div>
      <div class="flex items-center py-2">
        <a class="text-gray-700 hover:text-blue-500" href="/">
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 5.52 0 10-4.48 10-10 0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h-2zm0 8h2v2h-2z"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</nav>