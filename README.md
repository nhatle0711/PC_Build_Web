# 🖥️ PC Part Builder & Hardware Compatibility Checker

> Hệ thống gợi ý, lắp ráp và kiểm tra tính tương thích linh kiện máy tính thời gian thực (Real-time Compatibility Engine) xây dựng trên nền tảng **Node.js (Express)**, **PostgreSQL (3NF + JSONB)** và **Redis Cache**.

---

## 📑 Mục lục
1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Sơ đồ kiến trúc & Cấu trúc thư mục](#2-sơ-đồ-kiến-trúc--cấu-trúc-thư-mục)
3. [Từ vựng IT tiếng Nhật (IT用語)](#3-từ-vựng-it-tiếng-nhật-it用語)
4. [Hướng dẫn cài đặt & Chạy ứng dụng](#4-hướng-dẫn-cài-đặt--chạy-ứng-dụng)
5. [Quy chuẩn phát triển & Kiểm thử](#5-quy-chuẩn-phát-triển--kiểm-thử)

---

## 1. Tổng quan dự án

Dự án cung cấp giao diện trực quan cho người dùng tự lựa chọn các thành phần linh kiện (CPU, Motherboard, RAM, GPU, PSU, Storage, Case, Cooler), tự động tính toán tổng công suất tiêu thụ điện (Wattage) và chạy thuật toán phát hiện xung đột phần cứng (Socket mismatch, RAM DDR incompatibility, thiếu khe cắm, kích thước card đồ họa vượt quá case).

### Các tính năng cốt lõi:
- **Khảo sát nhu cầu & ngân sách**: Gợi ý linh kiện phù hợp với mục đích sử dụng (Gaming, Đồ họa, Văn phòng).
- **Kho linh kiện (Catalog) & Bộ lọc thông minh**: Lọc đa tiêu chí theo nhãn hàng, socket, chuẩn RAM, công suất.
- **Bàn lắp ráp (Builder Workspace)**: Thêm/bớt linh kiện, cập nhật thanh đo tải nguồn PSU thời gian thực.
- **Compatibility Engine (Công cụ kiểm tra tương thích)**: Kiểm tra chéo đa chiều các ràng buộc kỹ thuật.
- **Lưu trữ & chia sẻ cấu hình**: Lưu cấu hình máy tính vào cơ sở dữ liệu PostgreSQL.

---

## 2. Sơ đồ kiến trúc & Cấu trúc thư mục

### Kiến trúc phân tầng (Layered Architecture):
```text
[ Client (HTML5 / Vanilla CSS / JS) ]
                  │
                  ▼ HTTP / REST API (/api/v1/...)
[ Express Routing (routes/) ]
                  │
                  ▼ Middleware (Rate Limit, Auth, Validation)
[ Controllers (controllers/) ] ──► [ Input Validations (validations/) ]
                  │
                  ▼ Call Business Logic
[ Services (services/) ]
       ├── Compatibility Engine (Xử lý thuật toán tương thích)
       └── Build Service (Tính tổng giá, công suất, quản lý cấu hình)
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
[ PostgreSQL Pool ]     [ Redis Cache ]
 (3NF + JSONB Specs)   (Component Cache)
```

### Cấu trúc thư mục chi tiết:
```text
├── public/                   # Frontend tĩnh (HTML5 Semantic, CSS, Client JS)
│   ├── index.html            # Trang chủ & form khảo sát ngân sách/nhu cầu
│   ├── catalog.html          # Kho linh kiện & bộ lọc
│   ├── builder.html          # Bàn lắp ráp PC & thanh đo nguồn PSU
│   ├── saved.html            # Danh sách cấu hình PC đã lưu
│   ├── css/
│   │   └── style.css         # Styling hệ thống
│   └── js/
│       └── main.js           # Client JS xử lý tương tác UI
├── src/                      # Mã nguồn Backend Node.js
│   ├── config/               # Cấu hình kết nối DB & Cache
│   │   ├── db.js             # PostgreSQL Pool configuration
│   │   └── redis.js          # Redis Client configuration
│   ├── constants/            # Định nghĩa hằng số hệ thống
│   │   └── hardware.constants.js
│   ├── controllers/          # Nhận Request & phản hồi Response
│   │   ├── component.controller.js
│   │   └── build.controller.js
│   ├── middlewares/          # Bộ lọc trung gian & xử lý lỗi
│   │   └── error.middleware.js
│   ├── models/               # Định nghĩa Schema & DDL
│   │   └── schema.sql
│   ├── routes/               # Quản lý endpoint RESTful API
│   │   ├── index.js
│   │   ├── component.routes.js
│   │   └── build.routes.js
│   ├── services/             # Business Logic độc lập
│   │   ├── compatibility.service.js
│   │   └── build.service.js
│   ├── utils/                # Tiện ích chung
│   │   └── apiResponse.js
│   ├── validations/          # Validate payload đầu vào
│   │   └── build.validation.js
│   ├── app.js                # Cấu hình Express app
│   └── server.js             # Entry point khởi động máy chủ
├── tests/                    # Kiểm thử tự động (Jest & Supertest)
│   ├── unit/                 # Unit test cho logic tương thích
│   │   └── compatibility.test.js
│   └── integration/          # Integration test cho API build
│       └── build.api.test.js
├── .cursorrules              # Quy tắc AI Mentor & IT用語
├── .env.example              # Mẫu biến môi trường
├── .eslintrc.json            # Cấu hình linting
├── .gitignore                # Danh sách file loại trừ git
├── .prettierrc               # Cấu hình format mã nguồn
├── package.json              # Khai báo thư viện & scripts
└── README.md                 # Tài liệu hướng dẫn
```

---

## 3. Từ vựng IT tiếng Nhật (IT用語)

| Từ vựng (Kanji / Katakana) | Phiên âm Romaji | Nghĩa tiếng Việt |
| :--- | :--- | :--- |
| **要件定義** (ようけんていぎ) | Youken Teigi | Định nghĩa yêu cầu dự án |
| **基本設計** (きほんせっけい) | Kihon Sekkei | Thiết kế cơ bản / Thiết kế hệ thống |
| **詳細設計** (しょうさいせっけい) | Shousai Sekkei | Thiết kế chi tiết hàm và dữ liệu |
| **実装** (じっそう) | Jissou | Triển khai mã nguồn (Coding) |
| **互換性** (ごかんせい) | Gokan-sei | Tính tương thích phần cứng |
| **業務ロジック** (ぎょうむロジック) | Gyoumu Rojikku | Logic nghiệp vụ (Business Logic) |
| **単体テスト** (たんたいテスト) | Tantai Tesuto | Kiểm thử đơn vị (Unit Test) |
| **結合テスト** (けつごうテスト) | Ketsugou Tesuto | Kiểm thử tích hợp (Integration Test) |
| **例外処理** (れいがいしょり) | Reigai Shori | Xử lý ngoại lệ / Error Handling |
| **保守性** (ほしゅせい) | Hoshu-sei | Tính dễ bảo trì (Maintainability) |

---

## 4. Hướng dẫn cài đặt & Chạy ứng dụng

### 1. Chuẩn bị môi trường:
- Node.js version 18.x hoặc cao hơn.
- PostgreSQL 14+ và Redis server.

### 2. Thiết lập biến môi trường:
Sao chép `.env.example` thành `.env` và cập nhật thông số kết nối:
```bash
cp .env.example .env
```

### 3. Cài đặt các thư viện phụ thuộc:
*(Sau khi xác nhận sẵn sàng, chạy lệnh)*
```bash
npm install
```

### 4. Khởi chạy dự án:
- Chế độ phát triển (Development with nodemon):
```bash
npm run dev
```
- Chế độ sản phẩm (Production):
```bash
npm start
```

---

## 5. Quy chuẩn phát triển & Kiểm thử

- Chạy kiểm thử tự động toàn bộ:
```bash
npm test
```
- Chạy kiểm thử đơn vị (Unit Test logic tương thích):
```bash
npm run test:unit
```
- Chạy kiểm thử tích hợp (Integration Test API):
```bash
npm run test:integration
```
- Kiểm tra lỗi cú pháp (Linting):
```bash
npm run lint
```
- Tự động định dạng mã nguồn (Format):
```bash
npm run format
```
