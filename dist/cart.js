"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    function fetchAndDisplayCartItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/cart');
                const cartItems = yield response.json();
                displayCartItems(cartItems);
            }
            catch (error) {
                console.error('Error fetching cart items:', error);
            }
        });
    }
    function displayCartItems(cartItems) {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';
        cartItems.forEach((cartItem) => __awaiter(this, void 0, void 0, function* () {
            // Fetch product details for each cart item
            const response = yield fetch(`http://localhost:3000/products/${cartItem.productId}`);
            const product = yield response.json();
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
        }));
    }
    fetchAndDisplayCartItems();
});
