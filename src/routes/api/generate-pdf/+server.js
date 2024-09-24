import puppeteer from 'puppeteer';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { html, css, logo } = await request.json();

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Combine HTML and CSS, adding some base styles for full-page layout
	const content = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 210mm;
            height: 297mm;
          }
          .invoice-container {
            padding: 20mm;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
          }
          ${css}
        </style>
      </head>
      <body>
        <div class="invoice-container">
          ${html}
        </div>
      </body>
    </html>
  `;

	await page.setContent(content, { waitUntil: 'networkidle0' });

	const pdf = await page.pdf({
		format: 'A4',
		printBackground: true,
		margin: {
			top: '0mm',
			right: '0mm',
			bottom: '0mm',
			left: '0mm'
		}
	});

	await browser.close();

	return new Response(pdf, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment; filename="invoice.pdf"'
		}
	});
}