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
            <img src="${product.imageUrl}" alt="product1">
            <p>${product.name}</p> <br>
            <p>${product.description}</p><br>
            <p>${product.price}</p>
            <button id="buy"> Buy Item</button>
            <button id ="remove-from-cart">Drop from the Cart</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    fetchAndDisplayCartItems();
});
