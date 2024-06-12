<script>
	import Header from '$lib/components/home/Header.svelte';
	import Products from '$lib/components/home/Products.svelte';
	import Navbar from '$lib/components/home/Navbar.svelte';
	import Knowledge from '$lib/components/home/Knowledge.svelte';
	import LargeCard from '$lib/components/cards/LargeCard.svelte';
	import HandHoldingPat from '$lib/assets/hand-holding-pat.png';
</script>

<div class="bg-gradient-to-r from-[#FCEED5] to-[#FFE7BA] h-full">
	<Navbar />
	<Header />
</div>
<Products />
<LargeCard
	imgurl={HandHoldingPat}
	bgColor="bg-orange-shine"
	textColor="text-primary"
	title="Adoption"
	subtitle="We Need Help. So Do They."
	description="Adopt a pet and give it a home, it will be love you back unconditionally."
/>
<Knowledge />
