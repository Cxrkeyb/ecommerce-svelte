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

 <div class="flex items-center justify-center">
	<div class="flex items-center justify-center my-4 px-2">
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			<ArticleData />
			<ArticleData />
			<ArticleData />
		</div>
	</div>	
 </div>
