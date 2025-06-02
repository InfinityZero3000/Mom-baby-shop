/**
 * product-detail.js - JavaScript cho trang chi tiết sản phẩm MomBabyShop
 * File này chứa các hàm tải sản phẩm từ URL và hiển thị chi tiết sản phẩm
 */

// Khai báo danh sách sản phẩm mẫu để demo
const productDatabase = [
    {
        id: '1',
        name: 'Xe đẩy trẻ em Joie Chrome DLX',
        brand: 'Joie',
        price: '7.500.000 đ',
        priceValue: 7500000,
        originalPrice: '8.500.000 đ',
        originalPriceValue: 8500000,
        discount: '12%',
        rating: 4.8,
        reviews: 156,
        description: 'Xe đẩy cao cấp với thiết kế hiện đại, an toàn tuyệt đối cho bé. Được thiết kế với công nghệ tiên tiến, khung nhôm chắc chắn và hệ thống phanh an toàn. Phù hợp cho trẻ từ 0-4 tuổi.',
        features: ['Gấp gọn 1 tay', 'Phanh 2 bánh', 'Khóa an toàn 5 điểm', 'Chống lật', 'Bánh xe 360°'],
        colors: ['Đen', 'Xám', 'Xanh navy'],
        stock: 10,
        tags: ['Xe đẩy', 'Trẻ em', 'Joie'],
        mainImage: 'project/images/stroller-premium.png',
        images: ['project/images/stroller-premium.png', 'project/images/stroller-1.png', 'project/images/stroller-2.png']
    },
    {
        id: '2',
        name: 'Bộ quần áo trẻ em Cotton BabyLove',
        brand: 'BabyLove',
        price: '350.000 đ',
        priceValue: 350000,
        originalPrice: '450.000 đ',
        originalPriceValue: 450000,
        discount: '22%',
        rating: 4.9,
        reviews: 213,
        description: 'Bộ quần áo cotton mềm mại, thấm hút mồ hôi tốt. Thiết kế dễ thương, phù hợp cho bé từ 6-36 tháng. An toàn cho làn da nhạy cảm của bé.',
        features: ['Cotton 100%', 'Thấm hút tốt', 'Không gây dị ứng', 'Dễ giặt sạch', 'Không bai màu'],
        colors: ['Xanh', 'Hồng', 'Vàng'],
        stock: 25,
        tags: ['Quần áo', 'Trẻ em', 'Cotton'],
        mainImage: 'project/images/clothing-1.png',
        images: ['project/images/clothing-1.png', 'project/images/clothing-2.png', 'project/images/clothing-organic.png']
    },
    {
        id: '3',
        name: 'Ghế ăn cao cấp Fisher-Price',
        brand: 'Fisher Price',
        price: '2.800.000 đ',
        priceValue: 2800000,
        originalPrice: '3.200.000 đ',
        originalPriceValue: 3200000,
        discount: '12%',
        rating: 4.7,
        reviews: 89,
        description: 'Ghế ăn cao cấp được thiết kế hiện đại, có thể điều chỉnh độ cao và góc nghiêng. Phù hợp cho bé từ 6 tháng đến 5 tuổi.',
        features: ['Điều chỉnh 7 độ cao', 'Dễ vệ sinh', 'Khay ăn tháo rời', 'Gấp gọn', 'An toàn'],
        colors: ['Xám', 'Trắng', 'Xanh mint'],
        stock: 8,
        tags: ['Ghế ăn', 'Trẻ em', 'Fisher Price'],
        mainImage: 'project/images/high-chair.png',
        images: ['project/images/high-chair.png', 'project/images/bath-chair.png']
    }
];

// Biến toàn cục để lưu trữ sản phẩm hiện tại
let currentProduct = null;

// Lấy ID sản phẩm từ URL khi trang được tải
window.addEventListener('DOMContentLoaded', function() {
    loadProductFromUrl();
    
    // Khởi tạo các sự kiện cart và wishlist với product-id
    initProductEvents();
});

// Hàm lấy tham số từ URL
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Tải sản phẩm từ ID trong URL
function loadProductFromUrl() {
    const productId = getUrlParam('id');
    
    if (productId) {
        // Tìm sản phẩm theo ID trong danh sách sản phẩm mẫu
        const product = productDatabase.find(p => p.id === productId);
        
        if (product) {
            currentProduct = product;
            displayProduct(product);
            return;
        }
    }
    
    // Nếu không có ID hoặc không tìm thấy sản phẩm, hiển thị sản phẩm mặc định
    currentProduct = productDatabase[0];
    displayProduct(productDatabase[0]);
}

// Hiển thị thông tin sản phẩm
function displayProduct(product) {
    // Cập nhật tiêu đề trang
    document.title = `${product.name} - MomBabyShop`;
    
    // Cập nhật breadcrumb
    const breadcrumbElement = document.querySelector('span.text-pink-500.font-medium');
    if (breadcrumbElement) {
        breadcrumbElement.textContent = product.name;
    }
    
    // Cập nhật hình ảnh chính
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = product.mainImage;
        mainImage.alt = product.name;
    }
    
    // Cập nhật gallery hình ảnh nếu có nhiều hình ảnh
    if (product.images && product.images.length > 0) {
        const thumbnailContainer = document.querySelector('.flex.gap-2');
        if (thumbnailContainer) {
            thumbnailContainer.innerHTML = '';
            
            product.images.forEach((img, idx) => {
                const thumbnailBtn = document.createElement('button');
                thumbnailBtn.onclick = function() { changeMainImage(img, idx); };
                thumbnailBtn.className = `thumbnail ${idx === 0 ? 'thumbnail-active' : ''} w-20 h-20 rounded-lg overflow-hidden`;
                
                const thumbnailImg = document.createElement('img');
                thumbnailImg.src = img;
                thumbnailImg.alt = `Hình ${idx + 1}`;
                thumbnailImg.className = 'w-full h-full object-cover';
                
                thumbnailBtn.appendChild(thumbnailImg);
                thumbnailContainer.appendChild(thumbnailBtn);
            });
        }
    }
    
    // Cập nhật thương hiệu
    const brandElement = document.querySelector('.text-pink-500.border.border-pink-500');
    if (brandElement) {
        brandElement.textContent = product.brand;
    }
    
    // Cập nhật tên sản phẩm
    const nameElement = document.querySelector('h1.text-3xl.font-bold.text-gray-900');
    if (nameElement) {
        nameElement.textContent = product.name;
    }
    
    // Cập nhật đánh giá và số lượng đánh giá
    const reviewsElement = document.querySelector('span.text-sm.text-gray-600');
    if (reviewsElement && product.rating) {
        reviewsElement.textContent = `${product.rating} (${product.reviews} đánh giá)`;
    }
    
    // Cập nhật giá
    const priceElement = document.querySelector('.text-3xl.font-bold.text-pink-500');
    if (priceElement) {
        priceElement.textContent = product.price;
    }
    
    // Cập nhật giá gốc
    const originalPriceElement = document.querySelector('.text-xl.text-gray-500.line-through');
    if (originalPriceElement && product.originalPrice) {
        originalPriceElement.textContent = product.originalPrice;
    }
    
    // Cập nhật % tiết kiệm
    const discountElement = document.querySelector('.bg-red-500.text-white.px-2.py-1.rounded.text-xs.font-semibold:not(.absolute)');
    if (discountElement && product.discount) {
        discountElement.textContent = `Tiết kiệm ${product.discount}`;
    }
    
    // Cập nhật mô tả sản phẩm
    const descriptionElements = document.querySelectorAll('.text-gray-700.leading-relaxed');
    if (descriptionElements.length > 0 && product.description) {
        descriptionElements.forEach(el => {
            el.textContent = product.description;
        });
    }
    
    // Cập nhật tính năng nổi bật
    updateProductFeatures(product);
    
    // Cập nhật màu sắc
    updateProductColors(product);
    
    // Cập nhật dữ liệu cho các nút thêm vào giỏ hàng và yêu thích
    const addToCartButton = document.querySelector('button[onclick="addToCart()"]');
    if (addToCartButton) {
        addToCartButton.setAttribute('data-product-id', product.id);
    }
    
    const wishlistButton = document.querySelector('button[onclick="toggleWishlist()"]');
    if (wishlistButton) {
        wishlistButton.setAttribute('data-product-id', product.id);
    }
}

// Cập nhật tính năng nổi bật
function updateProductFeatures(product) {
    const featuresContainer = document.querySelector('.grid.grid-cols-2.gap-2');
    if (featuresContainer && product.features) {
        featuresContainer.innerHTML = '';
        
        product.features.forEach(feature => {
            const featureDiv = document.createElement('div');
            featureDiv.className = 'flex items-center gap-2';
            
            const dot = document.createElement('div');
            dot.className = 'w-2 h-2 bg-pink-500 rounded-full';
            
            const span = document.createElement('span');
            span.className = 'text-sm text-gray-700';
            span.textContent = feature;
            
            featureDiv.appendChild(dot);
            featureDiv.appendChild(span);
            featuresContainer.appendChild(featureDiv);
        });
    }
}

// Cập nhật màu sắc
function updateProductColors(product) {
    // Tìm phần tử chứa các nút màu sắc
    const colorSection = Array.from(document.querySelectorAll('div'))
        .find(div => {
            const h3 = div.querySelector('h3');
            return h3 && h3.textContent.includes('Màu sắc');
        });
    
    if (colorSection && product.colors) {
        // Tìm container cho các nút màu sắc
        const colorContainer = colorSection.querySelector('div.flex.flex-wrap.gap-2');
        
        if (colorContainer) {
            colorContainer.innerHTML = '';
            
            product.colors.forEach(color => {
                const button = document.createElement('button');
                button.className = 'px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-pink-500 transition-colors';
                button.textContent = color;
                button.onclick = function() { selectColor(color, this); };
                
                colorContainer.appendChild(button);
            });
        }
    }
}

// Khởi tạo các sự kiện cho sản phẩm
function initProductEvents() {
    // Gán ID sản phẩm cho các nút thêm vào giỏ hàng và yêu thích
    if (currentProduct) {
        // Đồng bộ trạng thái yêu thích sản phẩm với localStorage
        const wishlist = JSON.parse(localStorage.getItem('mombabyshop-wishlist') || '[]');
        const isInWishlist = wishlist.some(item => item.id === currentProduct.id);
        
        const wishlistIcon = document.getElementById('wishlistIcon');
        if (wishlistIcon && isInWishlist) {
            wishlistIcon.classList.add('text-red-500');
            wishlistIcon.style.fill = 'currentColor';
        }
    }
}

// Thêm sản phẩm vào giỏ hàng khi người dùng nhấn nút "Thêm vào giỏ"
function addToCartWithProduct() {
    if (!currentProduct) return;
    
    const selectedColor = document.querySelector('button.border-pink-500.bg-pink-50')?.textContent.trim();
    if (!selectedColor) {
        showNotification('Vui lòng chọn màu sắc', 'error');
        return;
    }
    
    const quantity = parseInt(document.getElementById('quantity')?.value || '1');
    
    const productToAdd = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.priceValue,
        image: currentProduct.mainImage,
        color: selectedColor,
        quantity: quantity
    };
    
    // Sử dụng hàm từ common.js nếu có
    if (typeof window.addToCart === 'function') {
        window.addToCart(productToAdd);
    } else {
        // Nếu không có hàm từ common.js, thêm trực tiếp vào localStorage
        const cart = JSON.parse(localStorage.getItem('mombabyshop-cart') || '[]');
        
        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        const existingProductIndex = cart.findIndex(item => 
            item.id === productToAdd.id && item.color === productToAdd.color
        );
        
        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(productToAdd);
        }
        
        localStorage.setItem('mombabyshop-cart', JSON.stringify(cart));
    }
    
    showNotification(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, 'success');
}

// Bật/tắt trạng thái yêu thích sản phẩm khi người dùng nhấn nút "Yêu thích"
function toggleWishlistWithProduct() {
    if (!currentProduct) return;
    
    const productToToggle = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.priceValue,
        image: currentProduct.mainImage
    };
    
    // Sử dụng hàm từ common.js nếu có
    if (typeof window.toggleWishlist === 'function') {
        const result = window.toggleWishlist(productToToggle);
        const isInWishlist = result.action === 'added';
        updateWishlistUI(isInWishlist);
    } else {
        // Nếu không có hàm từ common.js, thêm trực tiếp vào localStorage
        const wishlist = JSON.parse(localStorage.getItem('mombabyshop-wishlist') || '[]');
        
        // Kiểm tra sản phẩm đã có trong danh sách yêu thích chưa
        const existingProductIndex = wishlist.findIndex(item => item.id === productToToggle.id);
        let isInWishlist = false;
        
        if (existingProductIndex >= 0) {
            // Nếu có, xóa khỏi danh sách
            wishlist.splice(existingProductIndex, 1);
            isInWishlist = false;
        } else {
            // Nếu chưa, thêm vào danh sách
            wishlist.push(productToToggle);
            isInWishlist = true;
        }
        
        localStorage.setItem('mombabyshop-wishlist', JSON.stringify(wishlist));
        updateWishlistUI(isInWishlist);
    }
}

// Cập nhật UI của nút yêu thích
function updateWishlistUI(isInWishlist) {
    const icon = document.getElementById('wishlistIcon');
    if (icon) {
        if (isInWishlist) {
            icon.classList.add('text-red-500');
            icon.style.fill = 'currentColor';
            showNotification('Đã thêm vào danh sách yêu thích', 'success');
        } else {
            icon.classList.remove('text-red-500');
            icon.style.fill = 'none';
            showNotification('Đã xóa khỏi danh sách yêu thích', 'info');
        }
    }
}

// Kiểm tra hoạt động của file product-detail.js
console.log('product-detail.js loaded');
