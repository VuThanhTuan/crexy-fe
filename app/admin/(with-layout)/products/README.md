# Product Management - Refactored

## Tổng quan thay đổi

Trang quản lý sản phẩm đã được refactor hoàn toàn từ modal đơn giản sang các trang riêng biệt với đầy đủ tính năng quản lý media.

## Các tính năng mới

### 1. **Rich Text Editor** cho mô tả sản phẩm
- Sử dụng Tiptap editor
- Hỗ trợ formatting: Bold, Italic, Strikethrough, Code
- Hỗ trợ Heading (H2, H3)
- Hỗ trợ Lists (Bullet & Ordered)
- Hỗ trợ Blockquote
- Undo/Redo functionality

### 2. **Media Management**
#### Ảnh đại diện:
- **Ảnh chính** (bắt buộc): 1 ảnh - hiển thị chính trên trang sản phẩm
- **Ảnh thumbnail** (tùy chọn): 1 ảnh - hiển thị trong danh sách sản phẩm

#### Ảnh slide:
- **Mặc định**: 4 ô chọn ảnh
- **Tối đa**: 10 ảnh
- **Nút thêm (+)**: Cho phép thêm ô chọn ảnh mới (tối đa 10)
- Có thể xóa từng ảnh đã chọn

### 3. **Media Picker Modal**
Khi click vào ô chọn ảnh, modal Media Picker sẽ hiển thị:

- **Grid hiển thị**: Tất cả ảnh trong hệ thống theo dạng lưới
- **Tìm kiếm**: Tìm kiếm theo tên file
- **Upload mới**: Nút upload để thêm ảnh mới ngay trong modal
- **Chọn ảnh**: Click vào ảnh để chọn, click "OK" để xác nhận
- **Preview**: Hiển thị preview ảnh đã chọn
- **Pagination**: Hỗ trợ phân trang khi có nhiều ảnh

### 4. **Routing mới**
- **Danh sách sản phẩm**: `/admin/products`
- **Tạo sản phẩm mới**: `/admin/products/create`
- **Chỉnh sửa sản phẩm**: `/admin/products/[id]/edit`

## Cấu trúc thư mục

```
app/admin/(with-layout)/products/
├── page.tsx                    # Danh sách sản phẩm
├── create/
│   └── page.tsx               # Trang tạo sản phẩm mới
├── [id]/
│   └── edit/
│       └── page.tsx           # Trang chỉnh sửa sản phẩm
├── _components/
│   ├── product-form-page.tsx  # Form chính (shared giữa create & edit)
│   ├── delete-confirmation-dialog.tsx
│   └── ... (các components cũ có thể xóa: product-modal.tsx, product-form.tsx)
└── README.md                  # File này

components/
├── RichTextEditor/
│   ├── index.tsx              # Component Rich Text Editor
│   └── styles.css             # Styles cho editor
└── MediaPicker/
    ├── index.ts               # Export file
    ├── MediaPickerModal.tsx   # Modal chọn ảnh từ thư viện
    └── ImageSelector.tsx      # Component ô chọn ảnh vuông
```

## Cách sử dụng

### Tạo sản phẩm mới
1. Từ trang danh sách sản phẩm, click nút **"Thêm sản phẩm mới"**
2. Điền thông tin cơ bản:
   - Tên sản phẩm (bắt buộc)
   - Mô tả (dùng Rich Text Editor)
   - Chọn danh mục (bắt buộc)
   - Kích hoạt sản phẩm (checkbox)
3. Chọn hình ảnh:
   - Click vào ô **"Ảnh chính"** (bắt buộc)
   - Click vào ô **"Ảnh thumbnail"** (tùy chọn)
   - Click vào các ô ảnh slide (tùy chọn, tối đa 10)
   - Trong modal Media Picker:
     - Tìm kiếm ảnh có sẵn hoặc
     - Click "Upload" để tải ảnh mới
     - Click vào ảnh để chọn
     - Click "Chọn" để xác nhận
4. Click **"Tạo mới"** để lưu

### Chỉnh sửa sản phẩm
1. Từ danh sách sản phẩm, click icon ✏️ (Pencil) trên sản phẩm cần sửa
2. Cập nhật thông tin
3. Thay đổi ảnh bằng cách:
   - Click vào ảnh hiện tại để thay đổi
   - Click nút X trên ảnh để xóa
4. Click **"Cập nhật"** để lưu

### Xóa sản phẩm
1. Click icon 🗑️ (Trash) trên sản phẩm cần xóa
2. Xác nhận trong dialog

## Media Categories

Khi lưu sản phẩm, các ảnh được lưu với các categories sau:
- `main`: Ảnh chính
- `thumbnail`: Ảnh thumbnail
- `slide`: Ảnh slide (có thể có nhiều ảnh)

## Dependencies mới

Đã cài đặt các package sau:
```json
{
  "@tiptap/react": "^2.x.x",
  "@tiptap/starter-kit": "^2.x.x",
  "@tiptap/pm": "^2.x.x"
}
```

## API Endpoints sử dụng

### Products
- `GET /admin/products` - Lấy danh sách sản phẩm
- `GET /admin/products/:id` - Lấy chi tiết sản phẩm
- `POST /admin/products` - Tạo sản phẩm mới
- `PATCH /admin/products/:id` - Cập nhật sản phẩm
- `DELETE /admin/products/:id` - Xóa sản phẩm

### Media
- `GET /admin/media` - Lấy danh sách media (có pagination, search, filter)
- `POST /admin/media/upload` - Upload file mới

## Components có thể xóa (không còn sử dụng)

Các file sau không còn được sử dụng và có thể xóa:
- `_components/product-modal.tsx`
- `_components/product-form.tsx` (nếu không dùng ở nơi khác)

## Notes

- Ảnh chính là **bắt buộc** khi tạo/cập nhật sản phẩm
- Ảnh thumbnail và ảnh slide là **tùy chọn**
- Media Picker chỉ cho phép chọn 1 ảnh tại một thời điểm
- Có thể upload ảnh mới ngay trong Media Picker modal
- Tất cả ảnh được quản lý tập trung trong thư viện media

