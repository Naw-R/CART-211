// Basic slider functionality
const slider = document.querySelector('.product-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    slider.scrollLeft = scrollLeft - walk;
});

const quantityInput = document.querySelector('#quantity');
const subtotalEl = document.querySelector('.checkout-summary-total p strong');

quantityInput.addEventListener('change', (e) => {
    const pricePerItem = 9.89; // Your item price
    const quantity = e.target.value;
    const subtotal = pricePerItem * quantity;

    subtotalEl.innerText = `CA$${subtotal.toFixed(2)}`;
});

