document.addEventListener('DOMContentLoaded', function() {
    loadTicketData();
    document.getElementById('download-pdf').addEventListener('click', downloadPDF);
}); 



function loadTicketData() {
    const saleData = JSON.parse(localStorage.getItem('lastSale'));

    if (!saleData) {
        console.error('ha ocurrido un error en la compra');
        return;
    }

    document.getElementById('ticket-id').textContent = `Nº venta: #${saleData.id}`;
    document.getElementById('ticket-date').textContent = `Fecha: ${new Date(saleData.createdAt).toLocaleDateString()}`;
    document.getElementById('ticket-customer').textContent = saleData.customerName;

    const itemsContainer = document.getElementById('ticket-items');
    let html = '';


    if (saleData.products && saleData.products.length > 0) {
        saleData.products.forEach(item => {
            const quantity = item.sale_products ? item.sale_products.quantity : item.quantity;
            const price = item.sale_products ? item.sale_products.unitPrice : item.price;
            const subtotal = quantity * price;
            html += `
                <tr>
                    <td>${item.name}</td>
                    <td class="text-center">${quantity}</td>
                    <td class="text-end">$${parseFloat(price).toFixed(2)}</td>
                    <td class="text-end">$${parseFloat(subtotal).toFixed(2)}</td>
                </tr>
            `;
        });
    }
    itemsContainer.innerHTML = html;
    document.getElementById('ticket-total').textContent = `Total: $${parseFloat(saleData.subtotal).toFixed(2)}`;

    }


function downloadPDF() {
    const saleData = JSON.parse(localStorage.getItem('lastSale'));
    if (!saleData) {
        showNotification("No hay datos de venta para imprimir", "error");
        return;
    }

    const btn = document.getElementById('download-pdf');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
    btn.disabled = true;

    // Crear el HTML del formato predefinido (Factura A4 Blanca)
    const invoiceContent = `
    <div style="padding: 40px; font-family: Arial, sans-serif; color: #333; background: white; width: 100%;">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #8b00ff; padding-bottom: 20px;">
            <div>
                <h1 style="color: #8b00ff; margin: 0;">GAMING STORE</h1>
                <p style="margin: 5px 0; font-size: 12px; color: #666;">
                    Av. Tecnología 123<br>
                    Buenos Aires, Argentina<br>
                    support@gaming.com
                </p>
            </div>
            <div style="text-align: right;">
                <h2 style="color: #333; margin: 0;">FACTURA</h2>
                <p style="margin: 5px 0;"><strong>Nº:</strong> #${saleData.id}</p>
                <p style="margin: 5px 0;"><strong>Fecha:</strong> ${new Date(saleData.createdAt).toLocaleDateString()}</p>
            </div>
        </div>

        <div style="margin-top: 30px;">
            <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Información del Cliente</h3>
            <p><strong>Nombre:</strong> ${saleData.customerName}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
            <thead>
                <tr style="background-color: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Producto</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Cantidad</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Precio Unit.</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${saleData.products.map(item => {
                    const qty = item.sale_products ? item.sale_products.quantity : item.quantity;
                    const pr = item.sale_products ? item.sale_products.unitPrice : item.price;
                    return `
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">${qty}</td>
                        <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">$${parseFloat(pr).toFixed(2)}</td>
                        <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">$${(qty * pr).toFixed(2)}</td>
                    </tr>
                    `;
                }).join('')}
            </tbody>
        </table>

        <div style="margin-top: 30px; text-align: right;">
            <p style="font-size: 24px; font-weight: bold; color: #8b00ff;">
                TOTAL: $${parseFloat(saleData.subtotal).toFixed(2)}
            </p>
        </div>

        <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #999;">
            <p>Gracias por tu compra. Este documento es un comprobante válido.</p>
        </div>
    </div>
    `;

    
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = invoiceContent;
    document.body.appendChild(tempContainer);

    const opt = {
        margin:       0.5,
        filename:     `Factura_${saleData.id}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(tempContainer).save().then(() => {
        document.body.removeChild(tempContainer);
        btn.innerHTML = originalText;
        btn.disabled = false;
        showNotification("PDF generado correctamente", "success");
    });
}