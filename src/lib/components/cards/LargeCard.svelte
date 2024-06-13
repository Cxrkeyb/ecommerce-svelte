<script lang="ts">
  export let imgurl: string;
  export let bgColor: string;
  export let title: string;
  export let subtitle: string;
  export let description: string;
  export let textColor: string;
  export let alignment: 'left' | 'right' = 'left';
  export let backgroundColorText: boolean = false;
</script>

<div class="flex flex-col items-center justify-center mt-2">
  <div class="relative container mx-auto w-full md:h-[400px] rounded-lg shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center {bgColor} {textColor}"	
    style="background-image: url('{imgurl}');">

    <div class="flex flex-col justify-center h-full px-4 md:px-8 {alignment === 'left' ? 'items-start' : 'items-end'}">
      <div class="
          {backgroundColorText ? 'bg-white bg-opacity-90 p-4 md:p-8 rounded-lg shadow-lg' : ''}">
        <h2 class="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
        <h3 class="text-xl md:text-3xl font-bold mb-4">{subtitle}</h3>
        <p class="text-base md:text-lg mb-4 max-w-[500px]">{description}</p>

      </div>
    </div>

  </div>
</div>
