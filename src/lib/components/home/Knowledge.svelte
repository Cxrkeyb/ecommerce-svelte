<script>
	import HeaderWithButton from '$lib/components/cards/HeaderWithButton.svelte';
	import ArticleData from '$lib/components/cards/ArticleData.svelte';

	const handleClick = () => {
		console.log('Button clicked!');
	};
</script>

<HeaderWithButton
	title="Useful Pet Knowledge"
	subtitle="You already know?"
	buttonText="View more"
	onClick={handleClick}
/>
<!-- grid for cards with image, tag, title, information -->
<div class="flex items-center justify-center">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
		<ArticleData />
		<ArticleData />
		<ArticleData />
	</div>
</div>
