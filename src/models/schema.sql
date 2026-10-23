-- ==============================================================================
-- Database Schema: PC Part Builder & Hardware Compatibility Checker
-- Chuẩn hóa: 3NF (Third Normal Form) kết hợp JSONB cho thông số kỹ thuật đa dạng
-- IT用語: データベーススキーマ (Database Schema), 正規化 (Normalization), 外部キー制約 (Foreign Key Constraint)
-- ==============================================================================

-- Bật extension mở rộng cho UUID (nếu cần dùng UUID làm khóa chính)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BẢNG DANH MỤC LINH KIỆN (パーツカテゴリテーブル)
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,      -- 'CPU', 'MOTHERBOARD', 'RAM', 'GPU', 'PSU', etc.
    name VARCHAR(100) NOT NULL,            -- 'Vi xử lý', 'Bo mạch chủ', etc.
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG LINH KIỆN PHẦN CỨNG (パーツマスターテーブル)
-- specs lưu trữ cấu trúc động theo từng linh kiện:
-- Ví dụ CPU: {"socket": "LGA1700", "cores": 14, "threads": 20, "has_igpu": true}
-- Ví dụ Motherboard: {"socket": "LGA1700", "ram_type": "DDR5", "ram_slots": 4, "form_factor": "ATX", "pcie_version": "5.0"}
-- Ví dụ GPU: {"length_mm": 300, "recommended_psu": 650, "vram_gb": 12}
-- Ví dụ PSU: {"wattage": 750, "efficiency_rating": "80_PLUS_GOLD", "form_factor": "ATX"}
CREATE TABLE IF NOT EXISTS components (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(150),
    price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    tdp_wattage INT NOT NULL DEFAULT 0,    -- Công suất tiêu thụ danh định (W)
    image_url VARCHAR(500),
    specs JSONB NOT NULL DEFAULT '{}'::jsonb, -- Thông số chi tiết dạng JSONB linh hoạt
    stock_quantity INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index tăng tốc tìm kiếm & truy vấn JSONB (インデックス作成)
CREATE INDEX IF NOT EXISTS idx_components_category_id ON components(category_id);
CREATE INDEX IF NOT EXISTS idx_components_brand ON components(brand);
CREATE INDEX IF NOT EXISTS idx_components_specs_gin ON components USING gin(specs);

-- 3. BẢNG CẤU HÌNH MÁY TÍNH (PC構成テーブル)
CREATE TABLE IF NOT EXISTS builds (
    id SERIAL PRIMARY KEY,
    build_name VARCHAR(200) NOT NULL,
    user_identifier VARCHAR(100),          -- ID người dùng hoặc session ID của khách vãng lai
    total_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    estimated_wattage INT NOT NULL DEFAULT 0,
    is_compatible BOOLEAN DEFAULT TRUE,
    compatibility_notes JSONB DEFAULT '[]'::jsonb, -- Ghi chú xung đột nếu có
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. BẢNG CHI TIẾT LINH KIỆN TRONG BUILD (構成明細テーブル - Bảng liên kết n-n)
CREATE TABLE IF NOT EXISTS build_items (
    id SERIAL PRIMARY KEY,
    build_id INT NOT NULL REFERENCES builds(id) ON DELETE CASCADE,
    component_id INT NOT NULL REFERENCES components(id) ON DELETE RESTRICT,
    slot_type VARCHAR(50) NOT NULL,        -- 'CPU', 'MOTHERBOARD', 'RAM', etc.
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(12, 2) NOT NULL,   -- Giá linh kiện tại thời điểm lưu cấu hình
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_build_items_build_id ON build_items(build_id);
CREATE INDEX IF NOT EXISTS idx_build_items_component_id ON build_items(component_id);

-- Dữ liệu mẫu ban đầu cho Categories (マスター初期データ)
INSERT INTO categories (code, name, description) VALUES
    ('CPU', 'Vi xử lý', 'Bộ xử lý trung tâm (Central Processing Unit)'),
    ('MOTHERBOARD', 'Bo mạch chủ', 'Bảng mạch chính kết nối các linh kiện'),
    ('RAM', 'Bộ nhớ trong', 'Bộ nhớ truy xuất ngẫu nhiên (DDR4 / DDR5)'),
    ('GPU', 'Card đồ họa', 'Bộ xử lý đồ họa rời'),
    ('PSU', 'Nguồn máy tính', 'Bộ nguồn cung cấp điện năng (Power Supply Unit)'),
    ('STORAGE', 'Ổ cứng lưu trữ', 'Ổ đĩa SSD NVMe / SATA / HDD'),
    ('CASE', 'Vỏ máy tính', 'Thùng máy tính bảo vệ linh kiện'),
    ('COOLER', 'Tản nhiệt CPU', 'Tản nhiệt khí hoặc tản nhiệt nước AIO')
ON CONFLICT (code) DO NOTHING;
