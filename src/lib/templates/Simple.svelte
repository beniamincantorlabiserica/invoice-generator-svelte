<script>
	export let data = {};
</script>

<div class="bg-white p-8 max-w-3xl mx-auto">
	<h1 class="text-3xl font-bold mb-4">Invoice</h1>

	<div class="mb-4">
		<p><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
		<p><strong>Date:</strong> {data.date}</p>
	</div>

	<div class="mb-4">
		<h2 class="text-xl font-semibold mb-2">From:</h2>
		<p>{data.fromName}</p>
		<p>{data.fromAddress}</p>
		<p>{data.fromEmail}</p>
	</div>

	<div class="mb-4">
		<h2 class="text-xl font-semibold mb-2">To:</h2>
		<p>{data.toName}</p>
		<p>{data.toAddress}</p>
		<p>{data.toEmail}</p>
	</div>

	<table class="w-full mb-4">
		<thead>
		<tr>
			<th class="text-left">Item</th>
			<th class="text-right">Quantity</th>
			<th class="text-right">Price</th>
			<th class="text-right">Total</th>
		</tr>
		</thead>
		<tbody>
		{#each data.items as item}
			<tr>
				<td>{item.description}</td>
				<td class="text-right">{item.quantity}</td>
				<td class="text-right">${item.price.toFixed(2)}</td>
				<td class="text-right">${(item.quantity * item.price).toFixed(2)}</td>
			</tr>
		{/each}
		</tbody>
	</table>

	<div class="text-right">
		<p><strong>Subtotal:</strong> ${data.subtotal.toFixed(2)}</p>
		<p><strong>Tax ({data.taxRate}%):</strong> ${data.tax.toFixed(2)}</p>
		<p class="text-xl font-bold"><strong>Total:</strong> ${data.total.toFixed(2)}</p>
	</div>
</div>