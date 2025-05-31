/**
 * common.js - Hàm tiện ích dùng chung cho các trang MomBabyShop
 * File này chứa các hàm xử lý giỏ hàng, danh sách yêu thích, thông báo và navigation
 */

// ===== NAVIGATION & ROUTING =====

/**
 * Chuyển hướng đến trang khác với hiệu ứng
 * @param {string} url - URL đích
 * @param {boolean} newTab - Mở trong tab mới (mặc định false)
 */
function navigateTo(url, newTab = false) {
    if (newTab) {
        window.open(url, '_blank');
    } else {
        // Thêm hiệu ứng fade out trước khi chuyển trang
        document.body.style.opacity = '0.8';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            window.location.href = url;
        }, 150);
    }
}

/**
 * Chuyển đến trang chi tiết sản phẩm
 * @param {number|string} productId - ID sản phẩm
 * @param {string} category - Danh mục sản phẩm (optional)
 */
function goToProductDetail(productId, category = '') {
    const detailUrl = `product-detail.html?id=${productId}${category ? '&category=' + encodeURIComponent(category) : ''}`;
    navigateTo(detailUrl);
}

/**
 * Chuyển đến trang danh sách sản phẩm theo danh mục
 * @param {string} category - Danh mục sản phẩm
 */
function goToCategoryPage(category) {
    const categoryPages = {
        'strollers': 'stroller-list.html',
        'clothing': 'clothing-list.html',
        'products': 'product-list.html',
        'home': 'mombabyshop-html.html'
    };
    
    const url = categoryPages[category] || 'product-list.html';
    navigateTo(url);
}

/**
 * Chuyển đến trang checkout
 */
function goToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Giỏ hàng của bạn đang trống!', 'warning');
        return;
    }
    navigateTo('checkout.html');
}

/**
 * Xử lý breadcrumb navigation
 * @param {Array} breadcrumbItems - Mảng các item breadcrumb
 */
function updateBreadcrumb(breadcrumbItems) {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (!breadcrumbContainer) return;
    
    breadcrumbContainer.innerHTML = breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        return `
            <span class="${isLast ? 'text-[#ef62f9]' : 'text-gray-600 hover:text-[#ef62f9] cursor-pointer'}" 
                  ${!isLast ? `onclick="navigateTo('${item.url}')"` : ''}>
                ${item.name}
            </span>
            ${!isLast ? '<span class="mx-2 text-gray-400">/</span>' : ''}
        `;
    }).join('');
}

// Khởi tạo giỏ hàng từ localStorage hoặc tạo mới nếu chưa có
function getCart() {
    const cart = localStorage.getItem('mombabyshop-cart');
    return cart ? JSON.parse(cart) : [];
}

// Lưu giỏ hàng vào localStorage và gửi thông báo đến trang chính
function saveCart(cart) {
    localStorage.setItem('mombabyshop-cart', JSON.stringify(cart));
    
    // Thông báo cho trang chính (parent) nếu đang trong iframe
    if (window.parent !== window) {
        window.parent.postMessage({
            type: 'cart-update',
            cart: cart
        }, '*');
    }
    
    return cart;
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    const cart = getCart();
    
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
        // Nếu đã có, tăng số lượng lên 1
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
        // Nếu chưa có, thêm sản phẩm vào giỏ hàng với số lượng là 1
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Cập nhật số lượng sản phẩm trong giỏ hàng trên UI
    updateCartCount();
    
    // Lưu giỏ hàng và trả về giỏ hàng sau khi cập nhật
    return saveCart(cart);
}

// Cập nhật số lượng sản phẩm trong giỏ hàng hiển thị trên UI
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    // Cập nhật tất cả các phần tử có class cart-count
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        
        // Hiển thị hoặc ẩn số lượng tùy theo giỏ hàng có sản phẩm hay không
        if (totalItems > 0) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
}

// Khởi tạo danh sách yêu thích từ localStorage hoặc tạo mới nếu chưa có
function getWishlist() {
    const wishlist = localStorage.getItem('mombabyshop-wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

// Lưu danh sách yêu thích vào localStorage và gửi thông báo đến trang chính
function saveWishlist(wishlist) {
    localStorage.setItem('mombabyshop-wishlist', JSON.stringify(wishlist));
    
    // Thông báo cho trang chính (parent) nếu đang trong iframe
    if (window.parent !== window) {
        window.parent.postMessage({
            type: 'wishlist-update',
            wishlist: wishlist
        }, '*');
    }
    
    return wishlist;
}

// Thêm hoặc xóa sản phẩm khỏi danh sách yêu thích
function toggleWishlist(product) {
    const wishlist = getWishlist();
    
    // Kiểm tra sản phẩm đã có trong danh sách yêu thích chưa
    const existingItemIndex = wishlist.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
        // Nếu đã có, xóa khỏi danh sách yêu thích
        wishlist.splice(existingItemIndex, 1);
        return {
            wishlist: saveWishlist(wishlist),
            action: 'removed'
        };
    } else {
        // Nếu chưa có, thêm vào danh sách yêu thích
        wishlist.push(product);
        return {
            wishlist: saveWishlist(wishlist),
            action: 'added'
        };
    }
}

// Kiểm tra sản phẩm có trong danh sách yêu thích không
function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.some(item => item.id === productId);
}

// Cập nhật trạng thái yêu thích trên UI
function updateWishlistUI(productId, element) {
    if (isInWishlist(productId)) {
        element.classList.add('text-red-500');
        element.classList.remove('text-gray-400');
    } else {
        element.classList.remove('text-red-500');
        element.classList.add('text-gray-400');
    }
}

// Hiển thị thông báo
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationContent = document.getElementById('notification-content');
    const notificationMessage = document.getElementById('notification-message');
    
    // Thiết lập màu sắc thông báo
    if (type === 'success') {
        notificationContent.className = 'bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    } else if (type === 'error') {
        notificationContent.className = 'bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
    } else if (type === 'info') {
        notificationContent.className = 'bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg';
    }
    
    // Thiết lập nội dung thông báo
    notificationMessage.textContent = message;
    
    // Hiển thị thông báo
    notification.classList.add('show');
    
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Truyền tham số giữa các trang qua URL
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    
    return params;
}

// Tạo URL với các tham số
function createUrlWithParams(baseUrl, params) {
    const url = new URL(baseUrl, window.location.origin);
    
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    
    return url.toString();
}

// Khởi tạo các chức năng chung khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartCount();
    
    // ===== NAVIGATION EVENT LISTENERS =====
    
    // Xử lý click vào logo để về trang chủ
    document.querySelectorAll('.logo, .brand-name').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo('mombabyshop-html.html');
        });
        element.style.cursor = 'pointer';
    });
    
    // Xử lý navigation menu
    document.querySelectorAll('[data-nav-target]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-nav-target');
            goToCategoryPage(target);
        });
    });
    
    // Xử lý click vào product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Không xử lý nếu click vào button hoặc các element con khác
            if (e.target.closest('button') || e.target.closest('.add-to-cart-button') || e.target.closest('.wishlist-button')) {
                return;
            }
            
            const productId = this.getAttribute('data-product-id');
            const category = this.getAttribute('data-category') || '';
            
            if (productId) {
                goToProductDetail(productId, category);
            }
        });
        
        // Thêm cursor pointer
        card.style.cursor = 'pointer';
    });
    
    // Xử lý nút "Xem chi tiết"
    document.querySelectorAll('.view-detail-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.getAttribute('data-product-id');
            const category = this.getAttribute('data-category') || '';
            
            if (productId) {
                goToProductDetail(productId, category);
            }
        });
    });
    
    // Xử lý nút "Mua ngay"
    document.querySelectorAll('.buy-now-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productElement = this.closest('.product-card') || this.closest('.product-list-item') || this.closest('.product-detail');
            if (!productElement) return;
            
            const productId = this.getAttribute('data-product-id') || productElement.getAttribute('data-product-id');
            if (!productId) return;
            
            const productData = {
                id: productId,
                name: productElement.querySelector('.product-name')?.textContent,
                price: productElement.querySelector('.product-price')?.getAttribute('data-price') || '0',
                image: productElement.querySelector('.product-image')?.src || ''
            };
            
            // Thêm vào giỏ hàng và chuyển đến checkout
            addToCart(productData);
            showNotification('Đã thêm sản phẩm vào giỏ hàng');
            
            setTimeout(() => {
                goToCheckout();
            }, 500);
        });
    });
    
    // Xử lý click vào giỏ hàng
    document.querySelectorAll('#cartButton, .cart-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const cart = getCart();
            
            if (cart.length === 0) {
                showNotification('Giỏ hàng của bạn đang trống!', 'info');
            } else {
                // Chuyển đến trang checkout hoặc hiển thị modal
                goToCheckout();
            }
        });
    });
    
    // Xử lý search
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }
    
    // ===== PRODUCT INTERACTION EVENT LISTENERS =====
    
    // Xử lý sự kiện click trên các nút yêu thích
    document.querySelectorAll('.wishlist-button').forEach(button => {
        const productId = button.getAttribute('data-product-id');
        if (productId) {
            updateWishlistUI(productId, button);
            
            button.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                const productElement = this.closest('.product-card') || this.closest('.product-list-item') || this.closest('.product-detail');
                if (!productElement) return;
                
                const productData = {
                    id: productId,
                    name: productElement.querySelector('.product-name')?.textContent,
                    price: productElement.querySelector('.product-price')?.getAttribute('data-price') || '0',
                    image: productElement.querySelector('.product-image')?.src || ''
                };
                
                const result = toggleWishlist(productData);
                updateWishlistUI(productId, this);
                
                if (result.action === 'added') {
                    showNotification('Đã thêm sản phẩm vào danh sách yêu thích');
                } else {
                    showNotification('Đã xóa sản phẩm khỏi danh sách yêu thích', 'info');
                }
            });
        }
    });
    
    // Xử lý sự kiện click trên các nút thêm vào giỏ hàng
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const productElement = this.closest('.product-card') || this.closest('.product-list-item') || this.closest('.product-detail');
            if (!productElement) return;
            
            const productId = this.getAttribute('data-product-id') || productElement.getAttribute('data-product-id');
            if (!productId) return;
            
            const productData = {
                id: productId,
                name: productElement.querySelector('.product-name')?.textContent,
                price: productElement.querySelector('.product-price')?.getAttribute('data-price') || '0',
                image: productElement.querySelector('.product-image')?.src || ''
            };
            
            addToCart(productData);
            showNotification('Đã thêm sản phẩm vào giỏ hàng');
        });
    });
});

// ===== ADDITIONAL HELPER FUNCTIONS =====

/**
 * Thực hiện tìm kiếm sản phẩm
 * @param {string} query - Từ khóa tìm kiếm
 */
function performSearch(query) {
    // Chuyển đến trang sản phẩm với tham số search
    const searchUrl = createUrlWithParams('product-list.html', { search: query });
    navigateTo(searchUrl);
}

/**
 * Hiển thị modal giỏ hàng (nếu có)
 */
function showCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.remove('hidden');
        cartModal.classList.add('flex');
    } else {
        // Nếu không có modal, chuyển đến trang checkout
        goToCheckout();
    }
}

/**
 * Ẩn modal giỏ hàng
 */
function hideCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.add('hidden');
        cartModal.classList.remove('flex');
    }
}

/**
 * Format giá tiền
 * @param {number} price - Giá tiền
 * @returns {string} - Giá tiền đã format
 */
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

/**
 * Scroll mượt đến một element
 * @param {string} elementId - ID của element
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
