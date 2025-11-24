# Wireframe: Halaman Register (`/register`)

Ini adalah blueprint visual untuk halaman pendaftaran. `antigravity`, saat lo membuat komponen untuk halaman ini, pastikan semua elemen UI di bawah ini ter-cover.

## Tampilan

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

- **Input Fields**:
  - `Nama`: Tipe `text`.
  - `Email`: Tipe `email`.
  - `Password`: Tipe `password`.
- **Tombol**:
  - `Daftar`: Memicu aksi registrasi.
- **Link**:
  - `Login di sini`: Navigasi ke halaman `/login`.
