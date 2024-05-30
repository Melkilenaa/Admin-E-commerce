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
const productList = document.querySelector('.products');
const productForm = document.querySelector('form');
const productNameInput = document.querySelector('#product-name');
const productDescriptionInput = document.querySelector('#product-description');
const productPriceInput = document.querySelector('#product-price');
const productImageInput = document.querySelector('#product-image');
const productDetails = document.querySelector('.overlay');
let isEditing = false;
let currentEditProductId = null;
productForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (isEditing && currentEditProductId) {
        yield handleEditProduct(e, currentEditProductId);
        return;
    }
    const newProduct = {
        name: productNameInput.value,
        description: productDescriptionInput.value,
        price: parseFloat(productPriceInput.value),
        imageUrl: productImageInput.value,
    };
    try {
        const response = yield fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        if (response.ok) {
            clearForm();
            fetchProducts();
        }
        else {
            console.error('Failed to add new product');
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}));
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/products');
            const products = yield response.json();
            displayProducts(products);
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach((product) => {
        const row = document.createElement('li');
        row.classList.add('product');
        row.innerHTML = `
        <img src="${product.imageUrl}" alt="Product Image">
        <h3>${product.name}</h3>
        <p>Ksh${product.price}</p>
        <div class="product-actions">
          <button class="edit-product" data-id="${product.id}">Edit</button>
          <button class="delete-product" data-id="${product.id}">Delete</button>
          <button class="view-product"data-id = "${product.id}">View</button>
        </div>
      `;
        productList.appendChild(row);
    });
    const editButtons = document.querySelectorAll('.edit-product');
    const deleteButtons = document.querySelectorAll('.delete-product');
    const viewButtons = document.querySelectorAll('.view-product');
    editButtons.forEach((button) => {
        button.addEventListener('click', editProduct);
    });
    deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteProduct);
    });
    viewButtons.forEach((button) => {
        button.addEventListener('click', viewProduct);
    });
}
function editProduct(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const button = e.target;
        const productId = button.dataset.id;
        if (!productId) {
            console.error('Product ID is undefined');
            return;
        }
        try {
            const response = yield fetch(`http://localhost:3000/products/${productId}`);
            const product = yield response.json();
            productNameInput.value = product.name;
            productDescriptionInput.value = product.description;
            productPriceInput.value = product.price.toString();
            productImageInput.value = product.imageUrl;
            isEditing = true;
            currentEditProductId = productId;
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
function handleEditProduct(e, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const updatedProduct = {
            id: parseInt(productId),
            name: productNameInput.value,
            description: productDescriptionInput.value,
            price: parseFloat(productPriceInput.value),
            imageUrl: productImageInput.value,
        };
        try {
            const response = yield fetch(`http://localhost:3000/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            if (response.ok) {
                clearForm();
                fetchProducts();
                isEditing = false;
                currentEditProductId = null;
            }
            else {
                console.error('Failed to update product');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
function viewProduct(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const button = e.target;
        const productId = button.dataset.id;
        if (!productId) {
            console.error('Product ID is undefined');
            return;
        }
        try {
            const response = yield fetch(`http://localhost:3000/products/${productId}`);
            const product = yield response.json();
            const overlay = document.getElementById('product-overlay');
            const overlayImage = document.getElementById('overlay-image');
            const overlayName = document.getElementById('overlay-name');
            const overlayDescription = document.getElementById('overlay-description');
            const overlayPrice = document.getElementById('overlay-price');
            overlayImage.src = product.imageUrl;
            overlayName.textContent = product.name;
            overlayDescription.textContent = product.description;
            overlayPrice.textContent = `Ksh${product.price}`;
            overlay.style.display = 'block';
            const closeButton = document.getElementById('close-overlay');
            closeButton.addEventListener('click', () => {
                overlay.style.display = 'none';
            });
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
function deleteProduct(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const button = e.target;
        const productId = button.dataset.id;
        if (!productId) {
            console.error('Product ID is undefined');
            return;
        }
        try {
            const response = yield fetch(`http://localhost:3000/products/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchProducts();
            }
            else {
                console.error('Failed to delete product');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
function clearForm() {
    productForm.reset();
    isEditing = false;
    currentEditProductId = null;
}
fetchProducts();
