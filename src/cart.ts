interface CartItem {
    productId: number;
    quantity: number;
}

document.addEventListener('DOMContentLoaded', () => {
    async function fetchAndDisplayCartItems() {
        try {
            const response = await fetch('http://localhost:3000/cart');
            const cartItems: CartItem[] = await response.json();
            displayCartItems(cartItems);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    function displayCartItems(cartItems: CartItem[]) {
        const cartItemsContainer = document.querySelector('.cart-items') as HTMLDivElement;
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(async (cartItem) => {
            // Fetch product details for each cart item
            const response = await fetch(`http://localhost:3000/products/${cartItem.productId}`);
            const product: Product = await response.json();

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('furniture');
            cartItemDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.description}</p>
                <p>Ksh${product.price}</p>
                <p>Quantity: ${cartItem.quantity}</p>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    fetchAndDisplayCartItems();
});
