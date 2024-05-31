const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button)=>{
    button.addEventListener('click',addToCart);
});
function addToCart(event:any){
    const productId =event.target.dataset.id;
    console.log('Product added to cart:', productId);
}
