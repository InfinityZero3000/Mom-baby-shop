/**
 * common.js - Hàm tiện ích dùng chung cho các trang MomBabyShop
 * File này chứa các hàm xử lý giỏ hàng, danh sách yêu thích và thông báo
 */

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
