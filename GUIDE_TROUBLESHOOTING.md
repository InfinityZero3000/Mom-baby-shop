
## 🚀 **HƯỚNG DẪN DEPLOY CHÍNH XÁC**

### **Phương pháp 1: Manual Deploy (Khuyến nghị để test)**

#### macOS/Linux:
```bash
# Option 1: Full deployment process
npm run deploy:mac

# Option 2: Step by step
# 1. Clean build
rm -rf dist

# 2. Build for GitHub Pages
npm run build:mac

# 3. Verify build
ls -la dist/

# 4. Deploy using gh-pages
npx gh-pages -d dist

# 5. Wait 2-3 minutes for GitHub Pages to update
```

#### Windows:
```powershell
# Option 1: Full deployment process
npm run deploy:win

# Option 2: Step by step
# 1. Clean build
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# 2. Build for GitHub Pages
npm run build:win

# 3. Verify build
dir dist

# 4. Deploy using gh-pages
npx gh-pages -d dist

# 5. Wait 2-3 minutes for GitHub Pages to update
```

### **Phương pháp 2: GitHub Actions (Tự động)**

```bash
# 1. Commit changes
git add .
git commit -m "Fix deployment configuration"

# 2. Push to main branch
git push origin main

# 3. Check GitHub Actions tab
# URL: https://github.com/YOUR_USERNAME/Mom-baby-shop/actions
```

## 🔧 **KIỂM TRA VÀ DEBUG**

### **1. Verify Build Output**
```bash
# Check if all files exist
ls -la dist/
# Should see:
# - index.html
# - 404.html  
# - assets/ folder
# - All image files
```

### **2. Test Local Build**
```bash
# Serve built files locally to test
npx serve dist -s

# Or use Python
cd dist && python3 -m http.server 8000
```

### **3. Check GitHub Pages Settings**
1. Go to: `https://github.com/YOUR_USERNAME/Mom-baby-shop/settings/pages`
2. Verify:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` 
   - Folder: `/ (root)`

### **4. Common URL Issues**

**❌ Wrong URLs:**
```
https://YOUR_USERNAME.github.io/mom-baby-shop/  (lowercase)
https://YOUR_USERNAME.github.io/Mom-Baby-Shop/ (different case)
```

**✅ Correct URL:**
```
https://YOUR_USERNAME.github.io/Mom-baby-shop/
```

## 🐛 **TROUBLESHOOTING CHECKLIST**

### **Nếu vẫn hiện màn hình trắng:**

#### **1. Check Browser Console**
```javascript
// Open DevTools (F12) → Console tab
// Look for errors like:
// - Failed to load resource
// - Module not found
// - CORS errors
```

#### **2. Check Network Tab**
```javascript
// DevTools → Network tab → Reload page
// Look for:
// - 404 errors on JS/CSS files
// - Failed resource loads
// - Wrong paths
```

#### **3. Force Refresh**
```bash
# Clear browser cache:
# - Ctrl+F5 (Windows/Linux)
# - Cmd+Shift+R (Mac)
# - Or use incognito/private mode
```

#### **4. Verify Repository Name**
```bash
# Check git remote
git remote -v

# Should match:
# origin  https://github.com/YOUR_USERNAME/Mom-baby-shop.git
```

## 📝 **POST-DEPLOYMENT CHECKLIST**

### **After successful deployment:**

1. **Test all routes:**
   ```
   ✅ https://YOUR_USERNAME.github.io/Mom-baby-shop/
   ✅ https://YOUR_USERNAME.github.io/Mom-baby-shop/#/products
   ✅ https://YOUR_USERNAME.github.io/Mom-baby-shop/#/login
   ```

2. **Test authentication flow:**
   - Login with test accounts
   - Access protected routes
   - Verify user data persistence

3. **Test responsive design:**
   - Mobile view
   - Tablet view
   - Desktop view

## 🔄 **IF PROBLEMS PERSIST**

### **Complete Reset Strategy:**

```bash
# 1. Delete gh-pages branch
git push origin --delete gh-pages

# 2. Clean everything
rm -rf dist node_modules package-lock.json

# 3. Fresh install
npm install

# 4. Fresh build
npm run build:github

# 5. Manual deploy
npx gh-pages -d dist

# 6. Wait 5-10 minutes
```

## 📞 **Support Commands**

```bash
# Check current branch
git branch

# Check remote URL
git remote -v

# Check build output
npm run build:github && ls -la dist/

# Test local preview
npm run preview

# Deploy manually
npx gh-pages -d dist
```

---

**📌 Lưu ý quan trọng:**
- GitHub Pages có thể mất 5-10 phút để cập nhật
- Luôn clear browser cache khi test
- Sử dụng incognito mode để tránh cache issues
- Check GitHub Actions logs nếu dùng auto-deploy
