interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }

document.addEventListener('DOMContentLoaded', () => {
    
    async function fetchAndDisplayProducts() {
        try {
            const response = await fetch('http://localhost:3000/products');
            const products: Product[] = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function displayProducts(products: any[]) {
        const productDisplayUser = document.querySelector('.production') as HTMLDivElement;
        productDisplayUser.innerHTML = ''; 

        products.forEach((product: { imageUrl: any; name: any; description: any; price: any; id: any; }) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('furniture');
            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.description}</p>
                <p>Ksh${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productDisplayUser.appendChild(productDiv);
        });
    }
    fetchAndDisplayProducts();
});
