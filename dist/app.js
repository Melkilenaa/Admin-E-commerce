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
// Add New Product
productForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
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
// Fetch Products
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
// Display Products
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
              <button class="view-product" data-id="${product.id}">View</button>
              <button class="edit-product" data-id="${product.id}">Edit</button>
              <button class="delete-product" data-id="${product.id}">Delete</button>
          </div>
      `;
        productList.appendChild(row);
    });
    // Add event listeners for View, Edit, and Delete buttons
    const viewButtons = document.querySelectorAll('.view-product');
    const editButtons = document.querySelectorAll('.edit-product');
    const deleteButtons = document.querySelectorAll('.delete-product');
    viewButtons.forEach((button) => {
        button.addEventListener('click', viewProduct);
    });
    editButtons.forEach((button) => {
        button.addEventListener('click', editProduct);
    });
    deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteProduct);
    });
}
// View Product
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
            // Display product details in a modal or a separate section
            console.log('View Product:', product);
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
// Edit Product
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
            // Populate form fields with the product data
            productNameInput.value = product.name;
            productDescriptionInput.value = product.description;
            productPriceInput.value = product.price.toString();
            productImageInput.value = product.imageUrl;
            // Add event listener for form submission
            productForm.addEventListener('submit', (e) => handleEditProduct(e, productId));
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
// Handle Edit Product Submission
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
// Delete Product
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
// Clear Form
function clearForm() {
    productForm.reset();
}
// Initialize
fetchProducts();
