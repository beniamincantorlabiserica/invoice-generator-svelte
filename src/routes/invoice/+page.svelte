<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Simple from '$lib/templates/Simple.svelte';
	import Professional from '$lib/templates/Professional.svelte';
	import Modern from '$lib/templates/Modern.svelte';

	let selectedTemplate;
	let logoFile;
	let logoPreview;

	let invoiceData = {
		invoiceNumber: '',
		date: new Date().toISOString().split('T')[0],
		fromName: '',
		fromAddress: '',
		fromEmail: '',
		toName: '',
		toAddress: '',
		toEmail: '',
		items: [{ description: '', quantity: 1, price: 0 }],
		taxRate: 10,
		subtotal: 0,
		tax: 0,
		total: 0,
		logo: null
	};



	$: {
		invoiceData.subtotal = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
		invoiceData.tax = invoiceData.subtotal * (invoiceData.taxRate / 100);
		invoiceData.total = invoiceData.subtotal + invoiceData.tax;
	}

	onMount(() => {
		selectedTemplate = $page.url.searchParams.get('template') || '1';
	});

	function handleLogoUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				logoPreview = e.target.result;
				invoiceData.logo = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}

	function addItem() {
		invoiceData.items = [...invoiceData.items, { description: '', quantity: 1, price: 0 }];
	}

	function removeItem(index) {
		invoiceData.items = invoiceData.items.filter((_, i) => i !== index);
	}

	function getSelectedTemplate(template) {
		switch (template) {
			case '1':
				return Simple;
			case '2':
				return Professional;
			case '3':
				return Modern;
			default:
				return Simple;
		}
	}

	async function exportToPDF() {
		const invoiceElement = document.getElementById('invoice-preview');
		const invoiceHtml = invoiceElement.innerHTML;

		const styles = Array.from(document.styleSheets)
			.map(styleSheet => {
				try {
					return Array.from(styleSheet.cssRules)
						.map(rule => rule.cssText)
						.join('');
				} catch (e) {
					console.log('Error accessing styleSheet', e);
					return '';
				}
			})
			.join('\n');

		const response = await fetch('/api/generate-pdf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				html: invoiceHtml,
				css: styles,
				logo: invoiceData.logo
			}),
		});

		if (response.ok) {
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			a.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		} else {
			alert('Failed to generate PDF. Please try again.');
		}
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-8">Create Your Invoice</h1>

	<div class="flex flex-col md:flex-row gap-8">
		<div class="w-full md:w-1/2">
			<h2 class="text-2xl font-semibold mb-4">Invoice Details</h2>
			<form class="space-y-4">
				<div>
					<label for="logo" class="block mb-2">Company Logo</label>
					<input type="file" id="logo" accept="image/*" on:change={handleLogoUpload} class="file-input file-input-bordered w-full" />
					{#if logoPreview}
						<img src={logoPreview} alt="Logo preview" class="mt-2 max-w-xs h-auto" />
					{/if}
				</div>

				<div>
					<label for="invoiceNumber" class="block">Invoice Number</label>
					<input type="text" id="invoiceNumber" bind:value={invoiceData.invoiceNumber} class="input input-bordered w-full" />
				</div>
				<div>
					<label for="date" class="block">Date</label>
					<input type="date" id="date" bind:value={invoiceData.date} class="input input-bordered w-full" />
				</div>
				<div>
					<h3 class="text-xl font-semibold mb-2">From</h3>
					<input type="text" placeholder="Name" bind:value={invoiceData.fromName} class="input input-bordered w-full mb-2" />
					<input type="text" placeholder="Address" bind:value={invoiceData.fromAddress} class="input input-bordered w-full mb-2" />
					<input type="email" placeholder="Email" bind:value={invoiceData.fromEmail} class="input input-bordered w-full" />
				</div>
				<div>
					<h3 class="text-xl font-semibold mb-2">To</h3>
					<input type="text" placeholder="Name" bind:value={invoiceData.toName} class="input input-bordered w-full mb-2" />
					<input type="text" placeholder="Address" bind:value={invoiceData.toAddress} class="input input-bordered w-full mb-2" />
					<input type="email" placeholder="Email" bind:value={invoiceData.toEmail} class="input input-bordered w-full" />
				</div>
				<div>
					<h3 class="text-xl font-semibold mb-2">Items</h3>
					{#each invoiceData.items as item, index}
						<div class="flex space-x-2 mb-2">
							<input type="text" placeholder="Description" bind:value={item.description} class="input input-bordered flex-grow" />
							<input type="number" placeholder="Quantity" bind:value={item.quantity} class="input input-bordered w-20" />
							<input type="number" placeholder="Price" bind:value={item.price} class="input input-bordered w-24" />
							<button type="button" on:click={() => removeItem(index)} class="btn btn-error">Remove</button>
						</div>
					{/each}
					<button type="button" on:click={addItem} class="btn btn-primary">Add Item</button>
				</div>
				<div>
					<label for="taxRate" class="block">Tax Rate (%)</label>
					<input type="number" id="taxRate" bind:value={invoiceData.taxRate} class="input input-bordered w-full" />
				</div>
			</form>
		</div>

		<div class="w-full md:w-1/2">
			<h2 class="text-2xl font-semibold mb-4">Preview</h2>
			<div id="invoice-preview" class="border rounded-lg p-4 mb-4">
				<svelte:component this={getSelectedTemplate(selectedTemplate)} data={invoiceData} />
			</div>
			<button on:click={exportToPDF} class="btn btn-primary btn-lg w-full">
				Export to PDF
			</button>
		</div>
	</div>
</div>