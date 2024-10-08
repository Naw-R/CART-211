document.addEventListener('DOMContentLoaded', function () {
    initializeUser();
    renderProfile();
    renderArtForSale();
    renderPurchasedArt();

    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            saveProfileData();
        });
    }

    const addItemForm = document.getElementById('add-item-form');
    if (addItemForm) {
        addItemForm.addEventListener('submit', function (e) {
            e.preventDefault();
            addItemToSell();
        });
    }
});

// Function to add a new item to sell
function addItemToSell() {
    const title = document.getElementById('item-title').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const image = document.getElementById('item-image').value;

    if (!title || isNaN(price) || !image) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    const newItem = {
        id: Date.now(),
        title,
        price,
        image
    };

    user.artForSale.push(newItem);
    localStorage.setItem('user', JSON.stringify(user));

    alert('Item added successfully!');
    renderArtForSale();
}

// Function to initialize user if not already set
function initializeUser() {
    const user = localStorage.getItem('user');
    if (!user) {
        const defaultUser = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            profileImage: 'assets/images/profile-placeholder.png',
            artForSale: [],
            purchasedArt: [],
            orders: []
        };
        localStorage.setItem('user', JSON.stringify(defaultUser));
    }
}

// Function to save profile data to localStorage
function saveProfileData() {
    const user = JSON.parse(localStorage.getItem('user'));
    user.name = document.getElementById('name').value;
    user.email = document.getElementById('email').value;

    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile updated successfully!');
    renderProfile();
}

// Function to render user profile details
function renderProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userDetailsEl = document.getElementById('user-details');

    if (userDetailsEl) {
        userDetailsEl.innerHTML = `
            <img src="${user.profileImage}" alt="${user.name}" class="profile-icon-large">
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;
    }
}

// Function to render art for sale
function renderArtForSale() {
    const user = JSON.parse(localStorage.getItem('user'));
    const forSaleContainer = document.getElementById('for-sale-container');
    if (forSaleContainer) {
        forSaleContainer.innerHTML = ''; // Clear previous entries

        user.artForSale.forEach(art => {
            const artCard = document.createElement('div');
            artCard.classList.add('art-card');
            artCard.innerHTML = `
                <img src="${art.image}" alt="${art.title}">
                <div>
                    <h3>${art.title}</h3>
                    <p>Price: CA$${art.price.toFixed(2)}</p>
                </div>
            `;
            forSaleContainer.appendChild(artCard);
        });
    }
}

// Function to render purchased art
function renderPurchasedArt() {
    const user = JSON.parse(localStorage.getItem('user'));
    const purchasedContainer = document.getElementById('purchased-container');
    if (purchasedContainer) {
        purchasedContainer.innerHTML = ''; // Clear previous entries

        user.purchasedArt.forEach(art => {
            const artCard = document.createElement('div');
            artCard.classList.add('art-card');
            artCard.innerHTML = `
                <img src="${art.image}" alt="${art.title}">
                <div>
                    <h3>${art.title}</h3>
                    <p>Price: CA$${art.price.toFixed(2)}</p>
                </div>
            `;
            purchasedContainer.appendChild(artCard);
        });
    }
}

// Function to load order history
function loadOrderHistory() {
    const user = JSON.parse(localStorage.getItem('user'));
    const orderList = document.querySelector('.order-list');
    if (orderList) {
        const orders = user.orders || [];

        orderList.innerHTML = orders.length > 0
            ? orders.map(order => `
                <div class="order-item">
                    <p>Order #${order.id}</p>
                    <p>Date: ${order.date}</p>
                    <p>Total: ${order.total}</p>
                    <p>Items: ${order.items}</p>
                </div>
            `).join('')
            : '<p>No orders yet.</p>';
    }
}
