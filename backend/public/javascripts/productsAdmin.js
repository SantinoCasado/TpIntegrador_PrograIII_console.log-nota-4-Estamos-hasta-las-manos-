// Variables globales
let currentPage = 1;
let currentFilters = {
    category: '',
    status: ''
};
let totalPages = 1;

// Función para cargar productos
function loadProducts(page = 1) {
    const tbody = document.querySelector('#productsTable tbody');
    tbody.innerHTML = '<tr><td colspan="8" class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading products...</td></tr>';

    // Construir la URL con los filtros actuales
    const params = new URLSearchParams({
        page: page,
        limit: 10,
        category: currentFilters.category,
        status: currentFilters.status
    });

    // Realizar la solicitud fetch con los parámetros
    const url = `/api/products/admin?${params.toString()}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            tbody.innerHTML = '';

            if(data.products && data.products.length > 0){
                data.products.forEach(productData => {
                    const row = createProductRow(productData);
                    tbody.appendChild(row);
                });

                // Actualizar la paginación
                currentPage = data.currentPage;
                totalPages = data.totalPages;
                updatePagination();
                updateResultsInfo(data);
            } else {
                tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No products found</td></tr>';
            }
    })
    .catch(error => {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-danger">Error loading products</td></tr>';
            console.error('Error al cargar productos:', error);
        });
}

//Crar una fila de producto
function createProductRow(product) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${product.id}</td>
        <td>
            <img src="${product.image}" class="table-img" alt="${product.name}" 
                 style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
        </td>
        <td>
            <strong>${product.name}</strong>
            <br><small class="text-muted">${product.description?.substring(0, 50)}...</small>
        </td>
        <td>
            <span class="badge ${product.category === 'hardware' ? 'bg-info' : 'bg-warning'}">
                ${product.category}
            </span>
        </td>
        <td><strong>$${product.price}</strong></td>
        <td>${product.stock}</td>
        <td>
            <span class="badge ${product.isActive ? 'bg-success' : 'bg-danger'}">
                ${product.isActive ? 'Active' : 'Inactive'}
            </span>
        </td>
        <td>
            <div class="btn-group btn-group-sm">
                <a href="/admin/dashboard/products/${product.id}/edit" class="btn btn-outline-warning">
                    <i class="fas fa-edit"></i>
                </a>
                <button class="btn ${product.isActive ? 'btn-outline-danger' : 'btn-outline-success'}" 
                        onclick="toggleProduct(${product.id}, ${product.isActive})">
                    <i class="fas fa-${product.isActive ? 'eye-slash' : 'eye'}"></i>
                </button>
            </div>
        </td>
    `;
    return tr;
}

// Actualizo la paginación
function updatePagination() {
    const container = document.getElementById('pagination-container');
    container.innerHTML = '';

    // Botón Anterior
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage <= 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = '<a class="page-link" href="#" onclick="changePage(' + (currentPage - 1) + ')">Previous</a>';
    container.appendChild(prevLi);

    //Numero de paginas
    for(let i = 1; i <= totalPages; i++){
        const li = document.createElement('li');

        //Verifico si es la pagina actual
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;

        //Creo el enlace de la pagina
        li.innerHTML = '<a class="page-link" href="#" onclick="changePage(' + i + ')">' + i + '</a>';
        container.appendChild(li);
    }

    // Botón Siguiente
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage >= totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = '<a class="page-link" href="#" onclick="changePage(' + (currentPage + 1) + ')">Next</a>';
    container.appendChild(nextLi);
}

// Change page
function changePage(page) {
    if (page >= 1 && page <= totalPages) {
        loadProducts(page);
    }
}

// Actualizacion de la info de resultados
function updateResultsInfo(data) {
    const info = document.getElementById('showing-info');
    const start = (data.currentPage - 1) * 10 + 1;
    const end = Math.min(start + data.products.length - 1, data.totalProducts);
    info.textContent = `Showing ${start} to ${end} of ${data.totalProducts} products.`;
}

// Toggle del estado del producto
function toggleProduct(productId, isActive) {
    // Verificar que Bootstrap esté disponible
    if (typeof bootstrap === 'undefined') {
        console.error('Bootstrap is not loaded');
        if (confirm(isActive ? 'Are you sure you want to deactivate this product?' : 'Are you sure you want to activate this product?')) {
            // Usar confirmación nativa del navegador si Bootstrap no está disponible
            toggleProductStatus(productId, isActive);
        }
        return;
    }

    const modalElement = document.getElementById('confirmModal');
    if (!modalElement) {
        console.error('Modal element not found');
        return;
    }

    const modal = new bootstrap.Modal(modalElement);
    const message = isActive ?
        'Are you sure you want to deactivate this product?' :
        'Are you sure you want to activate this product?';
    
    document.getElementById('modal-message').textContent = message;
    document.getElementById('confirm-action').onclick = function() {
        const endpoint = isActive ? `/api/products/${productId}` : `/api/products/${productId}/activate`;
        const method = isActive ? 'DELETE' : 'POST';

        fetch(endpoint, { method: method })
            .then(res => res.json())
            .then(data => {
                loadProducts(currentPage);
                modal.hide();
            })
            .catch(error => console.error('Error updating product status:', error));
    };

    modal.show();
}

// Función auxiliar para toggle de producto
function toggleProductStatus(productId, isActive) {
    const endpoint = isActive ? `/api/products/${productId}` : `/api/products/${productId}/activate`;
    const method = isActive ? 'DELETE' : 'POST';

    fetch(endpoint, { method: method })
        .then(res => res.json())
        .then(data => {
            loadProducts(currentPage);
        })
        .catch(error => console.error('Error updating product status:', error));
}

// Incializar cuand el DOM pase a estar listo
document.addEventListener('DOMContentLoaded', function() {
    //Evento para filtros
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            currentFilters.category = e.target.value;
            loadProducts(1);
        });
    }

    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            currentFilters.status = e.target.value;
            loadProducts(1);
        });
    }

    // Cargar productos inicialmente (solo si estamos en la página de productos)
    const productsTable = document.querySelector('#productsTable');
    if (productsTable) {
        loadProducts();
    }
});

// Event listener para los botones de toggle status
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('toggle-status-btn') || 
            e.target.closest('.toggle-status-btn')) {
            
            const button = e.target.classList.contains('toggle-status-btn') ? 
                          e.target : e.target.closest('.toggle-status-btn');
            
            const productId = button.dataset.productId;
            const action = button.dataset.action;
            const newStatus = action === 'activate';
            
            toggleProduct(productId, !newStatus);
        }
    });
});