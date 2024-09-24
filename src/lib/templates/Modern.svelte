<script>
	export let data = {};
</script>

<div class="bg-gradient-to-br from-purple-100 to-pink-100 p-8 max-w-3xl mx-auto">
	<div class="bg-white shadow-lg rounded-xl p-6">
		<div class="flex flex-col md:flex-row justify-between items-center mb-6">
			<h1 class="text-4xl font-bold text-purple-600 mb-4 md:mb-0">Invoice</h1>
			<div class="text-right">
				<p><strong class="text-purple-600">Invoice Number:</strong> {data.invoiceNumber}</p>
				<p><strong class="text-purple-600">Date:</strong> {data.date}</p>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
			<div class="bg-purple-50 p-4 rounded-lg">
				<h2 class="text-xl font-semibold mb-2 text-purple-600">From:</h2>
				<p>{data.fromName}</p>
				<p>{data.fromAddress}</p>
				<p>{data.fromEmail}</p>
			</div>
			<div class="bg-pink-50 p-4 rounded-lg">
				<h2 class="text-xl font-semibold mb-2 text-pink-600">To:</h2>
				<p>{data.toName}</p>
				<p>{data.toAddress}</p>
				<p>{data.toEmail}</p>
			</div>
		</div>

		<table class="w-full mb-6">
			<thead>
			<tr class="bg-gradient-to-r from-purple-200 to-pink-200">
				<th class="text-left p-2 rounded-tl-lg">Item</th>
				<th class="text-right p-2">Quantity</th>
				<th class="text-right p-2">Price</th>
				<th class="text-right p-2 rounded-tr-lg">Total</th>
			</tr>
			</thead>
			<tbody>
			{#each data.items as item, index}
				<tr class="{index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
					<td class="p-2">{item.description}</td>
					<td class="text-right p-2">{item.quantity}</td>
					<td class="text-right p-2">${item.price.toFixed(2)}</td>
					<td class="text-right p-2">${(item.quantity * item.price).toFixed(2)}</td>
				</tr>
			{/each}
			</tbody>
		</table>

		<div class="text-right bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
			<p><strong class="text-purple-600">Subtotal:</strong> ${data.subtotal.toFixed(2)}</p>
			<p><strong class="text-pink-600">Tax ({data.taxRate}%):</strong> ${data.tax.toFixed(2)}</p>
			<p class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
				<strong>Total:</strong> ${data.total.toFixed(2)}
			</p>
		</div>
	</div>
</div>