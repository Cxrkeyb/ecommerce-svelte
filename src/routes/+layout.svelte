<script>
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
</script>

<main>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
	<slot></slot>
	<div class="container mx-auto px-4 py-4">
		<div class="flex justify-center items-center">
			<p class="text-center text-gray-500 text-sm">
				&copy; 2021 Ecommerce. All rights reserved.
			</p>
		</div>
	</div>
	<!-- <Footer /> -->
</main>
