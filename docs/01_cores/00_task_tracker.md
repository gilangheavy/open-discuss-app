# Task Tracker Proyek: Aplikasi Forum Diskusi

Berikut adalah daftar tugas pengembangan yang perlu diselesaikan. Daftar ini akan diperbarui secara berkala sesuai progres proyek.

---

## ✅ Fase 0: Setup & Konfigurasi Awal

- [x] Inisialisasi Proyek React menggunakan Vite.
- [x] Instal dan konfigurasi Tailwind CSS untuk proyek Vite.
- [x] Inisialisasi shadcn/ui dengan style 'default' dan palet warna 'blue'.
- [x] Setup ESLint dengan `eslint-config-google` untuk menjaga kualitas kode.
- [x] Hapus file boilerplate dari Vite untuk memulai dari awal yang bersih.
- [x] Buat struktur folder awal di dalam `src/` (app, components, features, services, utils).

**Status Fase:** Completed (21 November 2025)

---

## ✅ Fase 1: State Management & Redux Setup

- [x] Konfigurasi Redux Store (`src/app/store.js`).
- [x] Buat `authSlice.js` dengan `asyncThunk` untuk register, login, dan get profile.
- [x] Buat `usersSlice.js` dengan `asyncThunk` untuk get all users.
- [x] Tambahkan `authReducer` dan `usersReducer` ke dalam store.

**Status Fase:** Completed (21 November 2025)

---

## ✅ Fase 2: Fitur Autentikasi & Core Features

- [x] Implementasi UI Halaman Registrasi (`RegisterPage.jsx`).
- [x] Integrasi `RegisterPage` dengan `asyncRegister` thunk.
- [x] Audit & Refactor kode autentikasi awal.
- [x] Implementasi UI Halaman Login (`LoginPage.jsx`).
- [x] Implementasi sesi persisten (auto-login saat refresh) di `App.jsx`.
- [x] Implementasi header/navbar dinamis (menampilkan status login & tombol logout).
- [x] Implementasi fitur Threads (List, Detail, Create, Vote).
- [x] Implementasi fitur Comments (Create, Vote).
- [x] Implementasi fitur Leaderboards.
- [x] Perbaikan isu Linting & Formatting di seluruh proyek.

**Status Fase:** Completed (22 November 2025)

---

## ✅ Fase 3: Testing & Quality Assurance

- [x] Setup & Konfigurasi Playwright untuk E2E Testing.
- [x] Buat skenario test untuk alur Login & Register.
- [x] Buat skenario test untuk alur Membuat Thread Baru.
- [x] Buat skenario test untuk alur Memberi Komentar & Vote.

**Status Fase:** Completed (23 November 2025)

---

## ✅ Fase 4: Perbaikan Berdasarkan Review

- [x] Aktifkan React Strict Mode di seluruh aplikasi.
- [x] Implementasi Optimistic Update untuk fitur Vote Thread.
- [x] Implementasi Optimistic Update untuk fitur Vote Komentar.

**Status Fase:** Completed (23 November 2025)

---

## ⏳ Fase 5: Submission 2 - UI Upgrade, Testing & CI/CD

- [x] **UI Upgrade (Completed - Issue #2)**:
    - [x] Setup & Konfigurasi `shadcn/ui` sebagai React Ecosystem.
    - [x] Refactor komponen UI yang ada (Buttons, Inputs, Cards, etc.) menggunakan `shadcn/ui`.
- [~] **Automation Testing (In Progress - Issue #3)**:
    - [x] Setup & Konfigurasi environment testing (Vitest, React Testing Library).
    - [x] Buat Unit Test untuk Reducers (min. 2).
    - [x] Buat Unit Test untuk Thunks (min. 2).
    - [x] Buat Integration Test untuk Komponen (min. 2).
    - [ ] Buat E2E Test untuk alur Login (1 skenario - using Cypress).
- [x] **CI/CD (Completed - Issue #1)**:
    - [x] Konfigurasi GitHub Actions untuk menjalankan test pada setiap push/PR (`.github/workflows/ci.yml`).
    - [x] Konfigurasi Vercel untuk Continuous Deployment.
    - [x] Terapkan Branch Protection di `master`/`main`.
    - [x] Siapkan panduan untuk screenshot yang dibutuhkan untuk submission.

**Status Fase:** In Progress (Mulai 24 November 2025)
*Catatan: `[x]` = Selesai, `[~]` = Sedang Dikerjakan, `[ ]` = Belum Dikerjakan. Next Step: Implementasi E2E Test Login dengan Cypress.*

---