// profile.js
document.addEventListener('DOMContentLoaded', function () {
    loadProfileData();
    loadOrderHistory();

    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveProfileData();
    });
});

// Function to load profile data from localStorage
function loadProfileData() {
    const name = localStorage.getItem('userName') || 'John Doe';
    const email = localStorage.getItem('userEmail') || 'johndoe@example.com';
    const address = localStorage.getItem('userAddress') || '123 Main St, Cityville';

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('address').value = address;
}

// Function to save profile data to localStorage
function saveProfileData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userAddress', address);

    alert('Profile updated successfully!');
}

// Function to load order history (dummy data for now)
function loadOrderHistory() {
    const orderList = document.querySelector('.order-list');

    // Dummy order data (you can replace this with real data from localStorage or an API)
    const orders = [
        { id: 1, date: '2024-10-05', total: 'CA$120.00', items: 2 },
        { id: 2, date: '2024-09-15', total: 'CA$80.00', items: 1 },
    ];

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
