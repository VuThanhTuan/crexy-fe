# 🚀 CI/CD Setup Guide

## GitHub Secrets cần thiết

Vào **Settings → Secrets and variables → Actions**, thêm các secrets sau:

### Required Secrets

| Secret Name | Mô tả | Cách lấy |
|------------|-------|----------|
| `AWS_ACCESS_KEY_ID` | AWS Access Key có quyền push ECR | AWS IAM Console |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Access Key | AWS IAM Console |
| `GITOPS_TOKEN` | GitHub Personal Access Token | GitHub Settings → Developer settings → Personal access tokens |

### Tạo AWS IAM User cho CI/CD

```bash
# 1. Tạo IAM User
aws iam create-user --user-name github-actions-crexy-frontend

# 2. Attach policy cho phép push ECR
aws iam attach-user-policy \
  --user-name github-actions-crexy-frontend \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser

# 3. Tạo access key
aws iam create-access-key --user-name github-actions-crexy-frontend
# Lưu lại Access Key ID và Secret Access Key
```

### Tạo GitHub Personal Access Token

1. Vào GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Chọn scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
4. Copy token và lưu vào Secret `GITOPS_TOKEN`

## Workflow Files

### `.github/workflows/cicd.yml`
Pipeline chính cho CI/CD:
- **Trigger:** Push to `dev` branch hoặc tạo Release
- **Jobs:**
  1. `prepare` - Xác định environment và image tag
  2. `test` - Run tests và linting
  3. `build-and-push` - Build Docker image và push lên ECR
  4. `update-gitops` - Update image tag trong infrastructure repo

## Cấu hình cần thay đổi

### Trong `.github/workflows/cicd.yml`

```yaml
env:
  AWS_REGION: ap-southeast-1              # ⚠️ Thay bằng region của bạn
  AWS_ACCOUNT_ID: 123456789012            # ⚠️ Thay bằng AWS Account ID
  ECR_REPOSITORY: crexy-frontend          # Tên ECR repo
  INFRA_REPO: your-username/crexy-infrastructure  # ⚠️ Thay bằng infra repo
```

### Build-time Environment Variables

Next.js cần các biến `NEXT_PUBLIC_*` lúc build time. Trong workflow:

```yaml
build-args: |
  NEXT_PUBLIC_API_URL=${{ needs.prepare.outputs.environment == 'production' && 'https://api.crexy.me' || 'https://api-dev.crexy.me' }}
```

⚠️ **Lưu ý:** Nếu thay đổi biến `NEXT_PUBLIC_*`, phải rebuild image!

## Cách sử dụng

### Development Deployment

```bash
# 1. Develop tính năng mới
git checkout -b feature/new-ui

# 2. Commit và push
git add .
git commit -m "feat: redesign homepage"
git push origin feature/new-ui

# 3. Merge vào dev → Tự động deploy
```

### Production Deployment

```bash
# 1. Tạo Release với tag v1.0.0
# GitHub Actions sẽ:
# - Build với NEXT_PUBLIC_API_URL=https://api.crexy.me
# - Push image v1.0.0 lên ECR
# - Update production kustomization.yaml
# - ArgoCD deploy lên production
```

## Next.js Specific Notes

### Environment Variables

**Build-time** (cần rebuild image khi thay đổi):
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_*` - Bất kỳ biến nào exposed ra browser

**Runtime** (có thể thay đổi trong ConfigMap):
- `NODE_ENV`
- Server-side variables (không có prefix `NEXT_PUBLIC_`)

### Image Size Optimization

Dockerfile đã optimize:
- Multi-stage build
- Chỉ copy production dependencies
- Standalone output mode
- Non-root user

## Troubleshooting

### Build lỗi: "Module not found"

```bash
# Đảm bảo dependencies được install đầy đủ
npm ci
npm run build
```

### Image quá lớn

```bash
# Check image size
docker images | grep crexy-frontend

# Nếu > 500MB, kiểm tra:
# - .dockerignore có exclude node_modules, .next chưa
# - Dockerfile có dùng standalone output chưa
```

### Environment variables không có

- `NEXT_PUBLIC_*` phải set lúc **build time** trong workflow
- Server variables set trong **ConfigMap** của K8s

## Monitoring

### Check Deployment

```bash
# Frontend pods
kubectl get pods -n crexy-dev -l app=frontend

# Logs
kubectl logs -f deployment/frontend -n crexy-dev

# Describe nếu có lỗi
kubectl describe pod <pod-name> -n crexy-dev
```

### Performance

```bash
# Resource usage
kubectl top pods -n crexy-dev -l app=frontend

# Nếu OOM, tăng memory limits trong overlay
```

## Best Practices

1. **Optimize Bundle Size**
   - Use dynamic imports
   - Analyze with `npm run build` output

2. **Cache Strategy**
   - GitHub Actions cache npm modules
   - Docker layer caching

3. **Security**
   - Don't put secrets in `NEXT_PUBLIC_*` vars
   - Use environment-specific builds

4. **Testing**
   - Add E2E tests in pipeline
   - Lighthouse CI for performance

## Advanced: Preview Deployments

Có thể thêm workflow cho PR previews:

```yaml
# .github/workflows/preview.yml
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      # Build image với tag pr-<number>
      # Deploy vào namespace crexy-preview-<number>
      # Comment PR với preview URL
```
