<script>
	import { goto } from '$app/navigation';
	import Professional from '$lib/templates/professional.png';
	import Modern from '$lib/templates/modern.png';
	import Simple from '$lib/templates/simple.png';

	const templates = [
		{ id: 1, name: 'Simple', image: Simple },
		{ id: 2, name: 'Professional', image: Professional },
		{ id: 3, name: 'Modern', image: Modern },
	];

	function selectTemplate(id) {
		goto(`/invoice?template=${id}`);
	}
</script>

<h2 class="text-2xl font-semibold mb-4">Choose a Template</h2>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
	{#each templates as template}
		<div class="card bg-base-100 shadow-xl">
			<figure><img src={template.image} alt={template.name} class="w-60 h-48" /></figure>
			<div class="card-body">
				<h3 class="card-title">{template.name}</h3>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={() => selectTemplate(template.id)}>
						Select
					</button>
				</div>
			</div>
		</div>
	{/each}
</div>