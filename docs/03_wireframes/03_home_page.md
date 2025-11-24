# Wireframe: Halaman Daftar Thread (Home) (`/`)

Ini adalah halaman utama aplikasi. `antigravity`, perhatikan struktur komponen di sini. Kita bisa pecah menjadi beberapa komponen kecil: `Header`, `CategoryFilters`, `ThreadList`, dan `ThreadItem`.

## Tampilan

```text
+-------------------------------------------------------+
| [Logo]  [Home] [Leaderboard]          [Login/Profil]  |
+-------------------------------------------------------+
|                                                       |
|  Kategori Populer:                                    |
|  [#React] [#Redux] [#JavaScript] [Clear Filter]       |
|                                                       |
|  +-------------------------------------------------+  |
|  |  [Avatar] Judul Thread 1                        |  |
|  |  Oleh: John Doe | 1 jam yang lalu               |  |
|  |                                                 |  |
|  |  "Ini adalah potongan isi thread..."            |  |
|  |                                                 |  |
|  |  [#React]  [<3 10] [Comms: 5]                   |  |
|  +-------------------------------------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  |  [Avatar] Judul Thread 2                        |  |
|  |  Oleh: Jane Doe | 2 jam yang lalu               |  |
|  |                                                 |  |
|  |  "Pertanyaan tentang Redux Toolkit..."          |  |
|  |                                                 |  |
|  |  [#Redux]  [<3 8]  [Comms: 2]                   |  |
|  +-------------------------------------------------+  |
|                                                       |
|  (+) [Tombol Buat Thread Baru (Floating/Fixed)]       |
|                                                       |
+-------------------------------------------------------+
```

## Elemen Kunci

- **Navbar**: Navigasi utama ke `Home`, `Leaderboard`, dan `Login`/`Profil`.
- **Filter Kategori**: Tombol-tombol untuk memfilter thread berdasarkan kategori. (Sesuai Saran 3 pada `01_requirement.md`).
- **List Thread**: Daftar thread yang ada. Setiap item (`ThreadItem`) harus menampilkan:
  - Avatar & Nama Pembuat
  - Judul & Potongan Body
  - Waktu pembuatan
  - Kategori
  - Jumlah Vote & Komentar
- **Tombol Floating**: Link ke halaman `/threads/new`. Tombol ini hanya muncul jika pengguna sudah login.

---

> ### 📝 **Catatan untuk Developer (`antigravity`)**
>
> - Pastikan implementasi filter kategori berfungsi dengan baik, bisa reset filter, dan menampilkan thread yang relevan.
> - Setiap `ThreadItem` harus bisa diklik untuk navigasi ke halaman detail thread.
> - Tombol floating untuk membuat thread baru hanya boleh muncul jika user sudah authenticated.
