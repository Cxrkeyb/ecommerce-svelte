<script>
  import LargeCard from '$lib/components/cards/LargeCard.svelte';
  import DogsPossing from '$lib/assets/dogs-possing.png';
  import Products from '$lib/components/Products.svelte';
</script>


<LargeCard
	imgurl={DogsPossing}
	bgColor="bg-secondary-light"
  textColor="text-gray md:text-black"
	title="One More Friend"
	subtitle="Thousands More Fun!"
	description="Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!"
  alignment="right"
  backgroundColorText={true}
/>
<h2 class="text-3xl font-bold text-center mt-8 text-primary">Our Products</h2>
<Products header={false} button={false} pagination={true} />