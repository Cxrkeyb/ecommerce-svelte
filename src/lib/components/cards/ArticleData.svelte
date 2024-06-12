<script>
  export let title = "What is a Pomeranian? How to Identify Pomeranian Dogs";
  export let description = "The Pomeranian, also known as the Pomeranian (Pom dog), is always in the top of the cutest pets. Not only that, the small, lovely, smart, friendly, and skillful circus dog breed.";
  export let imageSrc = "https://t3.ftcdn.net/jpg/03/05/14/62/360_F_305146234_G04XfbWIobkjHUYdAWjwivC8t5R3CFHI.jpg";
</script>

<div class="flex flex-col justify-center bg-white rounded-lg shadow-lg py-4 px-2 w-[400px] m-4">
  <img src={imageSrc} alt="Dog" class="w-full h-[200px] object-cover rounded-xl" />
  <div class="px-4">
    <div class="bg-blue-sea max-w-[120px] px-2 py-1 text-white text-sm rounded-full mt-4">
      Pet knowledge
    </div>
    <h3 class="text-lg font-semibold">{title}</h3>
    <p class="text-gray-500">{description}</p>
  </div>
</div>
