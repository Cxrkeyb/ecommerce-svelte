<script lang="ts">
	import { onMount } from 'svelte';
	import {goto} from '$app/navigation';
	import Logo from '$lib/assets/logo.png';

	let menuOpen = false;

	onMount(() => {
		const menuButton = document.getElementById('mobile-menu-button');
		const mobileMenu = document.getElementById('mobile-menu');

		if (menuButton && mobileMenu) {
			menuButton.addEventListener('click', () => {
				menuOpen = !menuOpen;
			});
		}
	});
</script>

<div class="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center h-full">
  <div class="flex justify-between items-center w-full">
    <div>
      <a class="text-xl font-bold text-gray-800 md:text-2xl" href="/">
        <img src={Logo} alt="Ecommerce Logo" class="w-28" />
      </a>
    </div>
    <!-- Mobile menu button -->
    <div class="flex md:hidden">
      <button
        id="mobile-menu-button"
        type="button"
        class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
        aria-label="toggle menu"
      >
        <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 4H4v2h16v-2z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
  <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
  <div
    id="mobile-menu"
    class="{menuOpen ? 'block' : 'hidden'} md:flex md:items-center mt-4 md:mt-0 max-w-[300px] md:max-w-[500px] md:w-full md:justify-end md:mr-4"
  >
    <div class="flex flex-col md:flex-row md:mx-6">
      <button
        class="my-1 text-lg font-bold text-primary hover:text-primary-light md:mx-4 md:my-0"
        on:click={() => {
					goto('/');
				}}
      >
        Home
      </button>
      <button
        class="my-1 text-lg font-bold text-primary hover:text-primary-light md:mx-4 md:my-0"
				on:click={() => {
					goto('/control-panel');
				}}
      >
        Control panel
      </button>
    </div>
  </div>
</div>