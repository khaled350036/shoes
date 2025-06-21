// Sample products data
const products = [
    {
        id: 1,
        name: "حذاء رياضي رجالي Nike Air Max",
        category: "men",
        type: "sports",
        price: 299,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "حذاء أنيق نسائي كعب عالي",
        category: "women",
        type: "casual",
        price: 199,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "حذاء رياضي نسائي Adidas",
        category: "women",
        type: "sports",
        price: 249,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "حذاء رسمي رجالي كلاسيكي",
        category: "men",
        type: "casual",
        price: 399,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "حذاء رياضي عائلي Converse",
        category: "men",
        type: "sports",
        price: 179,
        image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "حذاء أنيق نسائي صندل",
        category: "women",
        type: "casual",
        price: 229,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "حذاء رسمي رجالي Oxford",
        category: "men",
        type: "casual",
        price: 349,
        image: "https://images.unsplash.com/photo-1614252235323-1c4c3c3c3c3c?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "حذاء رياضي نسائي New Balance",
        category: "women",
        type: "sports",
        price: 199,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        name: "حذاء رياضي رجالي Jordan",
        category: "men",
        type: "sports",
        price: 599,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        name: "حذاء أنيق نسائي كعب متوسط",
        category: "women",
        type: "casual",
        price: 159,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop"
    },
    {
        id: 11,
        name: "حذاء رياضي عائلي Vans",
        category: "men",
        type: "sports",
        price: 149,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop"
    },
    {
        id: 12,
        name: "حذاء رسمي نسائي كلاسيكي",
        category: "women",
        type: "casual",
        price: 279,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop"
    }
];

let cart = [];
let currentFilter = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
});

// Display products
function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${getCategoryName(product.category)} - ${getTypeName(product.type)}</div>
                <div class="product-price">${product.price} جنيه</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> إضافة للسلة
                </button>
            </div>
        `;
        grid.appendChild(productCard);
    });
}

// Filter products
function filterProducts(filter) {
    currentFilter = filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    let filteredProducts = products;
    
    if (filter === 'men' || filter === 'women') {
        filteredProducts = products.filter(product => product.category === filter);
    } else if (filter === 'sports' || filter === 'casual') {
        filteredProducts = products.filter(product => product.type === filter);
    }

    displayProducts(filteredProducts);
}

// Get category name in Arabic
function getCategoryName(category) {
    const categories = {
        'men': 'رجالي',
        'women': 'نسائي'
    };
    return categories[category] || category;
}

// Get type name in Arabic
function getTypeName(type) {
    const types = {
        'sports': 'رياضية',
        'casual': 'عادية'
    };
    return types[type] || type;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        updateCartDisplay();
        showNotification('تم إضافة المنتج إلى السلة بنجاح!');
    }
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} جنيه × ${item.quantity}</div>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `المجموع: ${total} جنيه`;
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification('تم حذف المنتج من السلة!');
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Close cart when clicking outside
document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) {
        toggleCart();
    }
});

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`شكراً لك! إجمالي الطلب: ${total} جنيه\nسيتم التواصل معك قريباً لإتمام عملية الشراء.`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 