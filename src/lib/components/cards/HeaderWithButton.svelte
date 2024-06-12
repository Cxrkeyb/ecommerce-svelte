<script lang="ts">
  export let title: string;
  export let subtitle: string;
  export let buttonText: string;
  export let onClick: () => void;
</script>

<div class="flex flex-row justify-around items-center pt-8">
  <div>
    <span class="text-black text-xs">{subtitle}</span>
    <h2 class="text-2xl font-semibold text-primary">{title}</h2>
  </div>
  <button
    class="flex items-center justify-center text-primary border-primary border rounded-3xl text-sm px-4 py-2 mt-4"
    on:click={onClick}
  >
    <span>{buttonText}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>