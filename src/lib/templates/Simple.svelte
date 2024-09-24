<script>
	export let data = {};
</script>

<div class="bg-white p-8 max-w-4xl mx-auto h-full flex flex-col">
	<div class="flex justify-between items-start mb-8">
		<div>
			<h1 class="text-4xl font-bold mb-4">Invoice</h1>
			<p class="text-xl"><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
			<p class="text-xl"><strong>Date:</strong> {data.date}</p>
		</div>
		{#if data.logo && data.logo.trim() !== ''}
			<div class="text-right">
				<img src={data.logo} alt="Company Logo" class="max-w-[200px] max-h-[100px]" />
			</div>
		{/if}
	</div>

	<div class="grid grid-cols-2 gap-8 mb-8">
		<div>
			<h2 class="text-2xl font-semibold mb-2">From:</h2>
			<p class="text-lg">{data.fromName}</p>
			<p>{data.fromAddress}</p>
			<p>{data.fromEmail}</p>
		</div>
		<div>
			<h2 class="text-2xl font-semibold mb-2">To:</h2>
			<p class="text-lg">{data.toName}</p>
			<p>{data.toAddress}</p>
			<p>{data.toEmail}</p>
		</div>
	</div>

	<table class="w-full mb-8">
		<thead>
		<tr class="bg-gray-100">
			<th class="text-left p-2">Item</th>
			<th class="text-right p-2">Quantity</th>
			<th class="text-right p-2">Price</th>
			<th class="text-right p-2">Total</th>
		</tr>
		</thead>
		<tbody>
		{#each data.items as item}
			<tr class="border-b">
				<td class="p-2">{item.description}</td>
				<td class="text-right p-2">{item.quantity}</td>
				<td class="text-right p-2">${item.price.toFixed(2)}</td>
				<td class="text-right p-2">${(item.quantity * item.price).toFixed(2)}</td>
			</tr>
		{/each}
		</tbody>
	</table>

	<div class="mt-auto">
		<div class="text-right text-xl">
			<p><strong>Subtotal:</strong> ${data.subtotal.toFixed(2)}</p>
			<p><strong>Tax ({data.taxRate}%):</strong> ${data.tax.toFixed(2)}</p>
			<p class="text-2xl font-bold mt-4"><strong>Total:</strong> ${data.total.toFixed(2)}</p>
		</div>
	</div>
</div>