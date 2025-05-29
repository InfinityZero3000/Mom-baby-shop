# MomBaby Shop - Hướng dẫn Điều hướng

## 📝 Tổng quan
MomBaby Shop là một website thương mại điện tử được thiết kế dựa trên các designs Figma, với các trang chức năng hoàn chỉnh.

## 🛣️ Các Routes có sẵn

### 1. Trang chủ - `/home` (Mặc định)
- **Component**: `ImprovedHomePage`
- **Mô tả**: Trang chủ cải tiến với hero section, danh mục sản phẩm, sản phẩm nổi bật
- **Tính năng**:
  - Hero section với slogan và CTA
  - Grid danh mục sản phẩm (6 categories)
  - Carousel sản phẩm nổi bật
  - Section lợi ích (miễn phí ship, bảo hành, đổi trả)
  - Newsletter signup
  - Brand showcase

### 2. Trang sản phẩm chính - `/products`
- **Component**: `MainProductPage`
- **Mô tả**: Trang hiển thị tất cả sản phẩm với tính năng lọc và tìm kiếm
- **Tính năng**:
  - Sidebar filters (categories, price range, brands)
  - Product grid với view modes (grid/list)
  - Sort options (popular, price, newest)
  - Pagination
  - Product badges (NEW, BESTSELLER)
  - Search functionality

### 3. Danh sách xe đẩy - `/strollers`
- **Component**: `StrollerListPage`
- **Mô tả**: Trang chuyên về xe đẩy em bé
- **Tính năng**:
  - Advanced filtering (brand, price range, features)
  - Product comparison
  - Detailed product specifications
  - Customer reviews
  - Add to cart functionality
  - Wishlist feature

### 4. Danh sách quần áo - `/clothing`
- **Component**: `ClothingListPage`
- **Mô tả**: Trang chuyên về quần áo trẻ em
- **Tính năng**:
  - Category filters (áo, quần, váy, etc.)
  - Size and age filters
  - Material information
  - Color options
  - Seasonal collections
  - Care instructions

### 5. Trang gốc - `/original`
- **Component**: `TrangCh` (Original design)
- **Mô tả**: Trang thiết kế gốc ban đầu

## 🎨 Design System

### Colors
- **Primary Pink**: `#ef62f9`
- **Primary Blue**: `#0bbdf8`
- **Text Dark**: `#1f2937`
- **Background**: `#f9fafb`

### Typography
- **Headings**: Paytone_One, Pattaya
- **Body**: SVN-Helves-Regular
- **UI**: System default

### Components
- Sử dụng **Shadcn UI** components
- **Tailwind CSS** cho styling
- **Lucide React** cho icons

## 🔧 Technical Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI + Radix UI
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🚀 Cách chạy dự án

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Responsive Design

Tất cả các components đều được thiết kế responsive:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🧩 Navigation Flow

```
Homepage (/) → redirects to /home
├── /home (ImprovedHomePage)
├── /products (MainProductPage)
├── /strollers (StrollerListPage)
├── /clothing (ClothingListPage)
└── /original (TrangCh - Original)
```

## 💡 Features chính

1. **Search**: Tìm kiếm sản phẩm toàn trang
2. **Filters**: Lọc theo category, giá, brand, size
3. **Cart**: Thêm sản phẩm vào giỏ hàng
4. **Wishlist**: Lưu sản phẩm yêu thích
5. **Product Views**: Grid/List view modes
6. **Pagination**: Phân trang sản phẩm
7. **Responsive**: Tương thích mobile/tablet/desktop

## 📸 Screenshots

- Trang chủ với hero section và categories
- Product listing với advanced filters
- Stroller page với detailed specs
- Clothing page với size/color options

## 🔮 Future Enhancements

- Shopping cart persistence
- User authentication
- Product detail pages
- Checkout process
- Payment integration
- Admin panel
