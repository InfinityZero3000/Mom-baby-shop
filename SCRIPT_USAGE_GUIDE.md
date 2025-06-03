# Script Usage Guide - Mom Baby Shop

## 📜 Available Scripts

### Development Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production (local)
npm run preview      # Preview production build locally
```

### GitHub Pages Scripts
```bash
npm run build:github   # Build specifically for GitHub Pages
npm run preview:github # Preview GitHub Pages build
npm run deploy         # Deploy to GitHub Pages
npm run deploy:local   # Deploy with CNAME file (Windows)
```

### Utility Scripts
```bash
./update-image-paths.sh  # Update all image paths to use asset helper
./build-github.sh        # Manual GitHub Pages build
./auto-deploy.sh         # Automatic commit, build, and deploy
./check-and-build.sh     # Check dependencies and build both versions
```

## 🚀 Quick Deployment

### Option 1: Automatic Deployment (Recommended)
```bash
./auto-deploy.sh
```
This script will:
- ✅ Check and commit any uncommitted changes
- ✅ Install dependencies if needed
- ✅ Run quality checks
- ✅ Build for GitHub Pages
- ✅ Deploy to GitHub Pages
- ✅ Provide deployment status and URL

### Option 2: Manual Deployment
```bash
# 1. Update image paths (if needed)
./update-image-paths.sh

# 2. Build for GitHub Pages
npm run build:github

# 3. Preview build (optional)
npm run preview:github

# 4. Deploy
npm run deploy
```

## 🔧 Asset Path Management

### Image Path Helper
The project uses a centralized asset path helper (`src/lib/assets.ts`) to handle different deployment environments:

```typescript
import { getImagePath } from "../../lib/assets";

// Use this instead of direct paths
const imageSrc = getImagePath("images/product.png");
```

### Automatic Path Updates
Run the update script to convert all image paths:
```bash
./update-image-paths.sh
```

This will:
- Add `getImagePath` import to all component files
- Convert `/images/file.png` → `getImagePath("images/file.png")`
- Create backup files (`.backup` extension)

## 🌐 Environment Configuration

### Local Development
- Base path: `/`
- Assets served from: `/images/`

### GitHub Pages
- Base path: `/Mom-baby-shop/`
- Assets served from: `/Mom-baby-shop/images/`

### Environment Detection
The system automatically detects the environment based on:
- `BUILD_FOR_GITHUB` environment variable
- `window.location.hostname` containing 'github.io'
- Build process environment variables

## 📁 File Structure

```
Mom-baby-shop/
├── src/
│   ├── lib/
│   │   ├── assets.ts          # Asset path utilities
│   │   └── utils.ts           # Other utilities
│   ├── screens/              # Page components
│   └── components/           # Reusable components
├── images/                   # Static assets
├── scripts/
│   ├── auto-deploy.sh        # Automatic deployment
│   ├── build-github.sh       # GitHub Pages build
│   ├── update-image-paths.sh # Path update utility
│   └── check-and-build.sh    # Development helper
└── dist/                     # Build output
```

## 🔍 Troubleshooting

### Build Issues
1. **Dependencies not found**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Image paths not working**
   ```bash
   ./update-image-paths.sh
   npm run build:github
   ```

3. **Preview not working**
   ```bash
   npm run preview:github
   # Then visit: http://localhost:4174/Mom-baby-shop/
   ```

### Deployment Issues
1. **GitHub Pages not updating**
   - Wait 5-10 minutes for propagation
   - Check GitHub repository → Settings → Pages

2. **404 errors on routes**
   - Ensure `404.html` exists in `images/` folder
   - Check router configuration in `App.tsx`

3. **Assets not loading**
   - Verify `getImagePath` is used consistently
   - Check browser console for 404 errors

## 📊 Build Output

### Local Build
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── vendor-[hash].js
└── [copied images]
```

### GitHub Pages Build
```
dist/
├── index.html              # Updated with base path
├── assets/
│   ├── index-[hash].js     # Includes path helpers
│   ├── index-[hash].css
│   └── vendor-[hash].js
└── [copied images]         # Available at /Mom-baby-shop/images/
```

## 🎯 Best Practices

1. **Always use asset helpers**
   ```typescript
   // ✅ Good
   import { getImagePath } from "../../lib/assets";
   const src = getImagePath("images/product.png");
   
   // ❌ Avoid
   const src = "/images/product.png";
   ```

2. **Test before deploying**
   ```bash
   npm run build:github
   npm run preview:github
   # Test functionality, then deploy
   ```

3. **Use automatic deployment**
   ```bash
   ./auto-deploy.sh
   # Handles everything automatically
   ```

4. **Keep backups**
   - The update script creates `.backup` files
   - Commit changes before major updates

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [React Router GitHub Pages](https://github.com/rafgraph/spa-github-pages)
