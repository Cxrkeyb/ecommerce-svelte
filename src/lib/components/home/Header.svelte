<script>
	import HeaderImage from '$lib/assets/header-image.png';
	import { goto } from '$app/navigation';
</script>

<div class="container mx-[20%] px-4 py-8 md:flex md:justify-start md:items-center w-2/5">
	<div class="flex flex-col">
		<h2 class="text-3xl md:text-5xl font-bold text-primary mb-4">One More Friend</h2>
		<h3 class="text-xl md:text-3xl font-bold text-primary mb-4">Thousands More Fun!</h3>
		<p class="text-lg md:text-xl text-primary mb-4">
			Having a pet means you have more joy, a new friend, a happy person who will always be with you
			to have fun. We have 200+ different pets that can meet your needs!
		</p>
		<div class="flex justify-center md:justify-start">
			<button
				class="bg-primary text-white font-bold py-2 px-4 rounded-full mr-4"
				on:click={() => {
					goto('/products');
				}}
			>
				Shop
			</button>
			<button
				class="bg-primary-light text-white font-bold py-2 px-4 rounded-full"
				on:click={() => {
					goto('/cart');
				}}
			>
				Cart
			</button>
		</div>
	</div>
</div>
<div class="relative h-[100px] hidden lg:block">
	<img
		src={HeaderImage}
		alt="A happy woman holding a dog in her arms."
		class="w-[600px] md:absolute md:right-0 md:bottom-0 md:object-cover md:object-center"
	/>
</div>
