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

    document.getElementById('ticket-id').textContent = 'Nº venta: #${saleData.id}';
    document.getElementById('ticket-date').textContent = `Fecha: ${new Date(saleData.createdAt).toLocaleDateString()}`;
    document.getElementById('ticket-customer').textContent = saleData.customerName;

    const itemsContainer = document.getElementById('ticket-items');
    let html = '';


    if (saleData.poducts && saleData.products.length > 0) {
        saleData.products.forEach(item => {
            const quantity = item.sale_poducts ? item.sale_poducts.quantity : item.quantity ;
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


        document.getElementById('ticket-subtotal').textContent = `$${parseFloat(saleData.subtotal).toFixed(2)}`;

    }


function downloadPDF() {
    const element = document.getElementById('invoice-content');
    const opt = {
        margin:       0.5,
        filename:     `Ticket_GameVerse_${new Date().getTime()}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const btn = document.getElementById('download-pdf');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
    btn.disabled = true;

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        showNotification("PDF descargado correctamente", "success");
    });


}