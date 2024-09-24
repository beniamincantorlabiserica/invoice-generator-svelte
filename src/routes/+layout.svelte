<script>
	import "../app.css";
</script>

<div class="container mx-auto p-4">
	<header class="mb-8">
		<h1 class="text-3xl font-bold">InvoiceForge</h1>
	</header>

	<main>
		<slot />
	</main>

	<footer class="mt-8 text-center text-sm text-gray-500">
		&copy; 2024 InvoiceForge. All rights reserved.
	</footer>
</div>