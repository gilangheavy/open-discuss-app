# Wireframe: Halaman Buat Thread (`/threads/new`)

Ini adalah halaman untuk membuat diskusi baru. Penting untuk diingat, `antigravity`, bahwa halaman ini adalah _protected route_. Artinya, hanya pengguna yang sudah login yang bisa mengakses dan menggunakan halaman ini.

## Tampilan

```text
+-------------------------------------------------------+
| [Logo]  [Home] [Leaderboard]          [Login/Profil]  |
+-------------------------------------------------------+
|                                                       |
|  +-------------------------------------------------+  |
|  |               BUAT DISKUSI BARU                 |  |
|  +-------------------------------------------------+  |
|  |                                                 |  |
|  |  Judul:                                         |  |
|  |  [___________________________________________]  |  |
|  |                                                 |  |
|  |  Kategori: (opsional)                           |  |
|  |  [___________________________________________]  |  |
|  |                                                 |  |
|  |  Isi Diskusi:                                   |  |
|  |  +-------------------------------------------+  |
|  |  |                                           |  |
|  |  |                                           |  |
|  |  |                                           |  |
|  |  +-------------------------------------------+  |
|  |                                                 |  |
|  |  [ BUAT ]                                       |  |
|  |                                                 |  |
|  +-------------------------------------------------+  |
|                                                       |
+-------------------------------------------------------+
```

## Elemen Kunci

- **Input `Judul`**: Untuk judul thread, bersifat wajib diisi.
- **Input `Kategori`**: Untuk kategori thread, bersifat opsional. Mungkin bisa pakai autocomplete atau dropdown dari daftar kategori yang sudah ada.
- **Textarea `Isi Diskusi`**: Konten utama dari thread, juga wajib diisi.
- **Tombol `Buat`**: Memicu pengiriman data untuk membuat thread baru.

---

> ### 📝 **Catatan untuk Developer (`antigravity`)**
>
> - Implementasikan mekanisme _route protection_ untuk halaman ini. Jika user belum login, redirect ke halaman login atau tampilkan pesan.
> - Validasi input sebelum pengiriman data ke API. Pastikan judul dan isi diskusi tidak kosong.
> - Setelah thread berhasil dibuat, arahkan pengguna kembali ke halaman utama (`/`) atau halaman detail thread yang baru saja dibuat.
