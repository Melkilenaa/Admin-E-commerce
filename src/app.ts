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
  const productDetails = document.querySelector('.overlay') as HTMLInputElement;
  let isEditing = false;
  let currentEditProductId: string | null = null;
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    if (isEditing && currentEditProductId) {
      await handleEditProduct(e, currentEditProductId);
      return;
    }
  
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
  async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:3000/products');
      const products: Product[] = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error('Error:', error);
    }
  }
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
  
      productNameInput.value = product.name;
      productDescriptionInput.value = product.description;
      productPriceInput.value = product.price.toString();
      productImageInput.value = product.imageUrl;
  
      isEditing = true;
      currentEditProductId = productId;
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
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
        isEditing = false;
        currentEditProductId = null;
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
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

        const overlay = document.getElementById('product-overlay') as HTMLDivElement;
        const overlayImage = document.getElementById('overlay-image') as HTMLImageElement;
        const overlayName = document.getElementById('overlay-name') as HTMLHeadingElement;
        const overlayDescription = document.getElementById('overlay-description') as HTMLParagraphElement;
        const overlayPrice = document.getElementById('overlay-price') as HTMLParagraphElement;

        overlayImage.src = product.imageUrl;
        overlayName.textContent = product.name;
        overlayDescription.textContent = product.description;
        overlayPrice.textContent = `Ksh${product.price}`;

        overlay.style.display = 'block';

        const closeButton = document.getElementById('close-overlay') as HTMLButtonElement;
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

 
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
  
  function clearForm() {
    productForm.reset();
    isEditing = false;
    currentEditProductId = null;
  }
  
  fetchProducts();

  
