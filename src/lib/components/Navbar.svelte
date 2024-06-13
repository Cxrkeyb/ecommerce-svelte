<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from '$lib/assets/logo.png';

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

<nav class="">
	<div class="container mx-auto px-6 py-4 md:flex md:justify-between md:items-center">
		<div class="flex flex-row gap-2">
			<div class="flex justify-between items-center">
				<div>
					<a class="text-xl font-bold text-gray-800 md:text-2xl" href="/">
						<img src={Logo} alt="Logo" class="w-28" />
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
			<div id="mobile-menu" class="hidden md:flex md:items-center">
				<div class="flex flex-col md:flex-row md:mx-6">
					<a
						class="my-1 text-[20px] font-bold text-primary hover:text-primary-light md:mx-4 md:my-0"
						href="/">Home</a
					>
					<a
						class="my-1 text-[20px] font-bold text-primary hover:text-primary-light md:mx-4 md:my-0"
						href="/">Control panel</a
					>
				</div>
			</div>
		</div>
		<!-- Cart -->
		<div class="flex items-center">
			<a
				href="/cart"
				class="
          text-gray-600
          hover:text-gray-700
          md:mx-4
          md:my-0
          cursor-pointer
      "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
					<path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
					<path d="M17 17h-11v-14h-2" />
					<path d="M6 5l14 1l-1 7h-13" />
				</svg>
			</a>
		</div>
	</div>
</nav>
