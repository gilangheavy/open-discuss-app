# 1. Wireframe Halaman Register (`/register`)

Dokumen ini menjelaskan wireframe untuk halaman pendaftaran pengguna baru.

## Tampilan Visual

```text
+-------------------------------------------------------+
|  [Logo Aplikasi]                                      |
|                                                       |
|  +-------------------------------------------------+  |
|  |                  REGISTER                       |  |
|  +-------------------------------------------------+  |
|  |                                                 |  |
|  |  Nama:                                          |  |
|  |  [___________________________________________]  |  |
|  |                                                 |  |
|  |  Email:                                         |  |
|  |  [___________________________________________]  |  |
|  |                                                 |  |
|  |  Password:                                      |  |
|  |  [___________________________________________]  |  |
|  |                                                 |  |
|  |  [ DAFTAR ]                                     |  |
|  |                                                 |  |
|  |  Sudah punya akun? [Login di sini]              |  |
|  |                                                 |  |
|  +-------------------------------------------------+  |
|                                                       |
+-------------------------------------------------------+
```

## Elemen UI

- **Input `name`**: Untuk nama lengkap pengguna.
- **Input `email`**: Untuk alamat email pengguna.
- **Input `password`**: Untuk kata sandi.
- **Tombol "Daftar"**: Mengeksekusi proses pendaftaran.
- **Link "Login di sini"**: Navigasi ke halaman `/login`.

## Catatan Tambahan

- Pastikan ada validasi input untuk setiap field (contoh: email harus format valid, password minimal 6 karakter).
- Handle state `loading` saat tombol "Daftar" diklik untuk memberi feedback visual ke pengguna.
