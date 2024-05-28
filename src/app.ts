interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const productList = document.querySelector('.products') as HTMLUListElement;
const productForm = document.querySelector('form') as HTMLFormElement;
const productNameInput = document.querySelector('#product-name') as HTMLInputElement;
const productDescriptionInput = document.querySelector('#product-description') as HTMLTextAreaElement;
const productPriceInput = document.querySelector('#product-price') as HTMLInputElement;
const productImageInput = document.querySelector('#product-image') as HTMLInputElement;

// Add New Product
productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newProduct: Product = {
      name: productNameInput.value,
      description: productDescriptionInput.value,
      price: parseFloat(productPriceInput.value),
      imageUrl: productImageInput.value,
  };

  try {
      const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
      });

      if (response.ok) {
          clearForm();
          fetchProducts();
      } else {
          console.error('Failed to add new product');
      }
  } catch (error) {
      console.error('Error:', error);
  }
});

// Fetch Products
async function fetchProducts() {
  try {
      const response = await fetch('http://localhost:3000/products');
      const products: Product[] = await response.json();
      displayProducts(products);
  } catch (error) {
      console.error('Error:', error);
  }
}

// Display Products
function displayProducts(products: Product[]) {
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
async function viewProduct(e: Event) {
  const button = e.target as HTMLButtonElement;
  const productId = button.dataset.id;

  if (!productId) {
      console.error('Product ID is undefined');
      return;
  }

  try {
      const response = await fetch(`http://localhost:3000/products/${productId}`);
      const product: Product = await response.json();
      // Display product details in a modal or a separate section
      console.log('View Product:', product);
  } catch (error) {
      console.error('Error:', error);
  }
}

// Edit Product
async function editProduct(e: Event) {
  const button = e.target as HTMLButtonElement;
  const productId = button.dataset.id;

  if (!productId) {
      console.error('Product ID is undefined');
      return;
  }

  try {
      const response = await fetch(`http://localhost:3000/products/${productId}`);
      const product: Product = await response.json();

      // Populate form fields with the product data
      productNameInput.value = product.name;
      productDescriptionInput.value = product.description;
      productPriceInput.value = product.price.toString();
      productImageInput.value = product.imageUrl;

      // Add event listener for form submission
      productForm.addEventListener('submit', (e) => handleEditProduct(e, productId));
  } catch (error) {
      console.error('Error:', error);
  }
}

// Handle Edit Product Submission
async function handleEditProduct(e: Event, productId: string) {
  e.preventDefault();

  const updatedProduct: Product = {
      id: parseInt(productId),
      name: productNameInput.value,
      description: productDescriptionInput.value,
      price: parseFloat(productPriceInput.value),
      imageUrl: productImageInput.value,
  };

  try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
          clearForm();
          fetchProducts();
      } else {
          console.error('Failed to update product');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

// Delete Product
async function deleteProduct(e: Event) {
  const button = e.target as HTMLButtonElement;
  const productId = button.dataset.id;

  if (!productId) {
      console.error('Product ID is undefined');
      return;
  }

  try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          fetchProducts();
      } else {
          console.error('Failed to delete product');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

// Clear Form
function clearForm() {
  productForm.reset();
}

// Initialize
fetchProducts();