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
    function fetchAndDisplayProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/products');
                const products = yield response.json();
                displayProducts(products);
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
        });
    }
    function displayProducts(products) {
        const productDisplayUser = document.querySelector('.production');
        productDisplayUser.innerHTML = '';
        products.forEach((product) => {
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
