<script>
	export let data = {};
</script>

<div class="bg-gray-100 p-8 max-w-3xl mx-auto">
	<div class="bg-white shadow-md rounded-lg p-6">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-3xl font-bold text-blue-600">Invoice</h1>
			<div>
				<p><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
				<p><strong>Date:</strong> {data.date}</p>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-6 mb-6">
			<div>
				<h2 class="text-xl font-semibold mb-2 text-blue-600">From:</h2>
				<p>{data.fromName}</p>
				<p>{data.fromAddress}</p>
				<p>{data.fromEmail}</p>
			</div>
			<div>
				<h2 class="text-xl font-semibold mb-2 text-blue-600">To:</h2>
				<p>{data.toName}</p>
				<p>{data.toAddress}</p>
				<p>{data.toEmail}</p>
			</div>
		</div>

		<table class="w-full mb-6">
			<thead>
			<tr class="bg-blue-100">
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

		<div class="text-right">
			<p><strong>Subtotal:</strong> ${data.subtotal.toFixed(2)}</p>
			<p><strong>Tax ({data.taxRate}%):</strong> ${data.tax.toFixed(2)}</p>
			<p class="text-xl font-bold text-blue-600"><strong>Total:</strong> ${data.total.toFixed(2)}</p>
		</div>
	</div>
</div>