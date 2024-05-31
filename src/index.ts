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
                <button class="add-to-cart" id="add-to-cart-${product.id}" data-id="${product.id}">Add to Cart</button>
            `;
            productDisplayUser.appendChild(productDiv);
        });
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
          });

          function addToCart(event:any) {
            const productId = event.target.dataset.id;

            fetch('http://localhost:3000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId: productId, quantity: 1 }) 
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product to cart');
                }
                console.log('Product added to cart:', productId);
              
            })
            .catch(error => {
                console.error('Error adding product to cart:', error);
         
            });
        }
        
    }
    fetchAndDisplayProducts();
});
