<script>
	export let data = {};
</script>

<div class="bg-gradient-to-br from-purple-100 to-pink-100 p-8 max-w-4xl mx-auto h-full flex flex-col rounded-lg shadow-lg">
	<div class="flex justify-between items-start mb-8">
		<div>
			<h1 class="text-5xl font-bold mb-4 text-purple-600">Invoice</h1>
			<p class="text-xl"><strong class="text-purple-500">Invoice Number:</strong> {data.invoiceNumber}</p>
			<p class="text-xl"><strong class="text-purple-500">Date:</strong> {data.date}</p>
		</div>
		{#if data.logo && data.logo.trim() !== ''}
			<div class="text-right">
				<img src={data.logo} alt="Company Logo" class="max-w-[200px] max-h-[100px] rounded-lg shadow" />
			</div>
		{/if}
	</div>

	<div class="grid grid-cols-2 gap-8 mb-8">
		<div class="bg-white p-4 rounded-lg shadow">
			<h2 class="text-2xl font-semibold mb-2 text-purple-600">From:</h2>
			<p class="text-lg">{data.fromName}</p>
			<p>{data.fromAddress}</p>
			<p>{data.fromEmail}</p>
		</div>
		<div class="bg-white p-4 rounded-lg shadow">
			<h2 class="text-2xl font-semibold mb-2 text-pink-600">To:</h2>
			<p class="text-lg">{data.toName}</p>
			<p>{data.toAddress}</p>
			<p>{data.toEmail}</p>
		</div>
	</div>

	<div class="bg-white rounded-lg shadow overflow-hidden mb-8">
		<table class="w-full">
			<thead>
			<tr class="bg-gradient-to-r from-purple-200 to-pink-200">
				<th class="text-left p-3">Item</th>
				<th class="text-right p-3">Quantity</th>
				<th class="text-right p-3">Price</th>
				<th class="text-right p-3">Total</th>
			</tr>
			</thead>
			<tbody>
			{#each data.items as item, index}
				<tr class="{index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
					<td class="p-3">{item.description}</td>
					<td class="text-right p-3">{item.quantity}</td>
					<td class="text-right p-3">${item.price.toFixed(2)}</td>
					<td class="text-right p-3">${(item.quantity * item.price).toFixed(2)}</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-auto">
		<div class="text-right text-xl bg-white p-4 rounded-lg shadow">
			<p><strong class="text-purple-600">Subtotal:</strong> ${data.subtotal.toFixed(2)}</p>
			<p><strong class="text-pink-600">Tax ({data.taxRate}%):</strong> ${data.tax.toFixed(2)}</p>
			<p class="text-2xl font-bold mt-4">
				<strong class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Total:</strong>
				${data.total.toFixed(2)}
			</p>
		</div>
	</div>
</div>