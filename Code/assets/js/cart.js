// Function to add an item to the cart
function addToCart(product) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    // Check if the item already exists in the cart
    const index = cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
        cart[index].quantity += 1;  // If item exists, increase quantity
    } else {
        product.quantity = 1;
        cart.push(product);  // If new, add to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart));  // Save to localStorage
    updateCartDisplay();  // Update the cart count in the header
    alert('Item added to cart!');
}


// Function to update the cart display in the header
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountEl = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update the cart count in the header (if you have a cart counter element)
    if (cartCountEl) {
        cartCountEl.textContent = totalItems > 0 ? `${totalItems}` : '0';
    }
}


// Function to get all cart items from localStorage
function getCartItems() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Function to display cart items in the checkout page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartItems = getCartItems();  // Retrieve cart from localStorage
    const cartStatusEl = document.querySelector('.cart-status');
    const summaryTotalEl = document.querySelector('.checkout-summary');
    const checkoutButtonEl = document.querySelector('.btn-checkout');

    if (cartItems.length === 0) {
        cartStatusEl.textContent = 'Your basket is empty';
        cartItemsContainer.innerHTML = ''; // Clear any remaining items
        summaryTotalEl.style.display = 'none';
        checkoutButtonEl.style.display = 'none';
        return;
    }

    cartStatusEl.textContent = `${cartItems.length} item(s) in your basket`;
    summaryTotalEl.style.display = 'block';
    checkoutButtonEl.style.display = 'block';

    cartItemsContainer.innerHTML = ''; // Clear existing items before adding new ones

    let total = 0;

    // Iterate over the cart items to generate the display
    cartItems.forEach(item => {
        const itemTotalPrice = item.price * item.quantity;
        total += itemTotalPrice;

        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('checkout-item');

        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price">
                    <span>CA$${item.price.toFixed(2)} x ${item.quantity} = CA$${itemTotalPrice.toFixed(2)}</span>
                </div>
                <div class="quantity">
                    <label for="quantity-${item.id}">Quantity: </label>
                    <input type="number" id="quantity-${item.id}" name="quantity" value="${item.quantity}" min="1">
                </div>
                <div class="checkout-actions">
                    <button class="btn-remove" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItemEl);

        // Event listener for quantity changes
        cartItemEl.querySelector(`#quantity-${item.id}`).addEventListener('change', function (e) {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                updateCartItem(item.id, newQuantity);  // Update quantity in cart
                displayCartItems();  // Refresh the cart display
            } else {
                e.target.value = item.quantity;  // Prevent setting quantity to zero or negative
            }
        });

        // Event listener for remove button
        cartItemEl.querySelector('.btn-remove').addEventListener('click', function () {
            removeFromCart(item.id);  // Remove item from the cart
            displayCartItems();  // Refresh the cart display
        });
    });

    // Update the total prices
    document.getElementById('cart-item-total').textContent = `CA$${total.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `CA$${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = getCartItems(); // Get the current cart items
    cart = cart.filter(item => item.id !== productId); // Remove the item with the matching ID
    localStorage.setItem('cart', JSON.stringify(cart)); // Update the localStorage
    displayCartItems(); // Refresh the cart display
    updateCartDisplay(); // Update cart icon count
}

// Function to update the item quantity and dynamically adjust the price
function updateCartItem(productId, quantity) {
    let cart = getCartItems();
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    displayCartItems();  // Refresh the cart display
    updateCartDisplay(); // Ensure cart count is updated in the header
}


// Function to display the cart status (number of items) in the header
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountEl = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update the cart count in the header (if you have a cart counter element)
    if (cartCountEl) {
        cartCountEl.textContent = totalItems > 0 ? `${totalItems}` : '0';
    }
    document.addEventListener('DOMContentLoaded', function () {
        updateCartDisplay();  // Update cart icon count on page load
    });

}


// Call displayCartItems on page load
document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
    updateCartDisplay();  // Update cart icon count
});
