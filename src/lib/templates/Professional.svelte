<script>
	export let data = {};
</script>

<div class="bg-gray-100 p-8 max-w-4xl mx-auto h-full flex flex-col">
	<div class="bg-white shadow-md rounded-lg p-6">
		<div class="flex justify-between items-start mb-8 border-b pb-4">
			<div>
				<h1 class="text-4xl font-bold mb-4 text-gray-800">Invoice</h1>
				<p class="text-xl text-gray-600"><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
				<p class="text-xl text-gray-600"><strong>Date:</strong> {data.date}</p>
			</div>
			{#if data.logo && data.logo.trim() !== ''}
				<div class="text-right">
					<img src={data.logo} alt="Company Logo" class="max-w-[200px] max-h-[100px]" />
				</div>
			{/if}
		</div>

		<div class="grid grid-cols-2 gap-8 mb-8">
			<div>
				<h2 class="text-2xl font-semibold mb-2 text-gray-700">From:</h2>
				<p class="text-lg">{data.fromName}</p>
				<p class="text-gray-600">{data.fromAddress}</p>
				<p class="text-gray-600">{data.fromEmail}</p>
			</div>
			<div>
				<h2 class="text-2xl font-semibold mb-2 text-gray-700">To:</h2>
				<p class="text-lg">{data.toName}</p>
				<p class="text-gray-600">{data.toAddress}</p>
				<p class="text-gray-600">{data.toEmail}</p>
			</div>
		</div>

		<div class="mb-8 overflow-x-auto">
			<table class="w-full">
				<thead>
				<tr class="bg-gray-200">
					<th class="text-left p-3 text-gray-700">Item</th>
					<th class="text-right p-3 text-gray-700">Quantity</th>
					<th class="text-right p-3 text-gray-700">Price</th>
					<th class="text-right p-3 text-gray-700">Total</th>
				</tr>
				</thead>
				<tbody>
				{#each data.items as item, index}
					<tr class="{index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b">
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
			<div class="text-right text-xl bg-gray-50 p-4 rounded">
				<p><strong class="text-gray-700">Subtotal:</strong> ${data.subtotal.toFixed(2)}</p>
				<p><strong class="text-gray-700">Tax ({data.taxRate}%):</strong> ${data.tax.toFixed(2)}</p>
				<p class="text-2xl font-bold mt-4 text-gray-800"><strong>Total:</strong> ${data.total.toFixed(2)}</p>
			</div>
		</div>
	</div>
</div>