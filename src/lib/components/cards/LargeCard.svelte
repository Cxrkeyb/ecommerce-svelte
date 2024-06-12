<script lang="ts">
	export let imgurl: string;
	export let bgColor: string;
	export let title: string;
	export let subtitle: string;
	export let description: string;
	export let textColor: string;
	export let alignment: 'left' | 'right' = 'left';
</script>

<div class="flex flex-col items-center justify-center mt-2">
	<div
		class="bg-cover bg-center bg-no-repeat container h-[400px] px-20 w-full rounded-lg shadow-lg {bgColor} {textColor} flex"
		style="background-image: url('{imgurl}')"
	>
		<div class="flex flex-col h-full w-full rounded-lg">
			<div
				class="flex flex-col justify-center h-full w-full {alignment === 'left'
					? 'items-start'
					: 'items-end'} px-4
					}"
			>
				<h2 class="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
				<h3 class="text-xl md:text-3xl font-bold mb-4">{subtitle}</h3>
				<p class="text-base md:text-lg mb-4 max-w-[500px]">{description}</p>
			</div>
		</div>
	</div>
</div>
