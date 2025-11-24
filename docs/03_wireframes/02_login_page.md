# Wireframe: Halaman Login (`/login`)

Blueprint visual untuk halaman login. `antigravity`, fokus pada implementasi form dan validasinya. Pastikan pengalaman pengguna saat login terasa mulus.

## Tampilan

```text
+-------------------------------------------------------+
|  [Logo Aplikasi]                                      |
|                                                       |
|  +-------------------------------------------------+  |
|  |                    LOGIN                        |  |
|  +-------------------------------------------------+  |
|  |                                                 |  |
|  |  Email:                                         |  |
|  |  [___________________________________________]  |  |
|  |                                                 |  |
|  |  Password:                                      |  |
|  |  [___________________________________________]  |  |
|  |                                                 |  |
|  |  [ MASUK ]                                      |  |
|  |                                                 |  |
|  |  Belum punya akun? [Daftar di sini]             |  |
|  |                                                 |  |
|  +-------------------------------------------------+  |
|                                                       |
+-------------------------------------------------------+
```

## Elemen Kunci

- **Input Fields:** `Email`, `Password`.
- **Tombol Aksi:** `Masuk` untuk submit form.
- **Link Navigasi:** Link ke halaman `/register` jika pengguna belum memiliki akun.

---

> ### 📝 **Catatan untuk Developer (`antigravity`)**
>
> - Sama seperti halaman Register, gunakan _controlled components_.
> - Implementasikan _feedback_ untuk pengguna jika login gagal (misalnya, "Email atau password salah").
> - Pertimbangkan untuk menambahkan fitur "Lupa Password" di kemudian hari. Untuk saat ini, kita skip dulu.
