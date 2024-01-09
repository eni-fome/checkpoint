const products = [
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 15 },
    { id: 3, name: "Item 3", price: 20 },
    // Add more products as needed
];

let cart = {};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.closest('.product').dataset.id;
        addToCart(productId);
    });
});

function addToCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity++;
    } else {
        const product = products.find(p => p.id == productId);
        cart[productId] = {...product, quantity: 1};
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    Object.values(cart).forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="quantity-btn" onclick="adjustQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="adjustQuantity(${item.id}, 1)">+</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function adjustQuantity(productId, amount) {
    if (cart[productId]) {
        cart[productId].quantity += amount;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        updateCartDisplay();
    }
}

// Initial setup
products.forEach(product => {
    const productDiv = document.querySelector(`.product[data-id="${product.id}"]`);
    productDiv.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
});
