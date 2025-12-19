# GitHub Actions Workflows

## 📁 Workflow Files

### Development
- **`cicd-dev.yml`** - Deploy to Dev environment
  - **Trigger:** Push to `dev` branch
  - **Image tag:** `dev-<commit-sha>`
  - **Namespace:** `crexy-dev`

### Production  
- **`cicd-prod.yml`** - Deploy to Production
  - **Trigger:** Create Release (v1.0.0, v1.0.1, etc.)
  - **Image tag:** Version tag (v1.0.0)
  - **Namespace:** `crexy-prod`
  - **Protection:** Requires `production` environment approval

## 🎯 Tại sao tách riêng?

1. **Rõ ràng** - Mỗi workflow có mục đích riêng
2. **Dễ maintain** - Sửa dev không ảnh hưởng production
3. **Security** - Production có environment protection
4. **Testing** - Dev fast, Production strict
5. **Review** - Changes rõ ràng hơn

## 🔄 Usage

### Deploy to Dev
```bash
git push origin dev
# → Auto triggers
```

### Deploy to Production
```bash
git tag v1.0.0
git push origin v1.0.0
# Or create release on GitHub
```

## 📚 More Info

See [Backend README](../../crexy-be/.github/workflows/README.md) for detailed comparison.
