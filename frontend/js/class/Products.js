class Producto{
    nombre;
    precio;
    imagen;
    tipo;
    description


    constructor(id, name, price, image, type,description){
        this.id= id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.type = type;
        this.description = description;
    }
    

    createHtmlElement(){
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'h-100', 'shadow-sm');

        const img = document.createElement('img');
        img.src = this.image;
        img.classList.add('card-img-top');
        img.alt = this.name;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = this.name;

        const descriptionP = document.createElement('p');
        descriptionP.classList.add('card-text');
        descriptionP.textContent = this.description;

        const priceH6 = document.createElement('h6');
        priceH6.classList.add('card-subtitle', 'mb-2', 'fw-bold');

        const formattedPrice = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(this.price);
        priceH6.textContent = formattedPrice;

        const button = document.createElement('a');
        button.href = '#';
        button.classList.add('btn', 'btn-primary', 'mt-auto');
        button.textContent = 'Agregar al carrito';
        
        button.addEventListener('click', () => {
            event.preventDefault();
            agregarAlCarrito(this.id);
        });
        
        cardBody.appendChild(title);
        cardBody.appendChild(descriptionP);
        cardBody.appendChild(priceH6);
        //cardBody.appendChild(button);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);

        return colDiv;
    }

}