# Wireframe: Halaman Detail Thread (`/threads/:id`)

Halaman ini menampilkan satu thread secara penuh beserta komentar-komentar di dalamnya. `antigravity`, di sini akan banyak melibatkan state management (untuk vote thread, vote komentar, dan penambahan komentar). Pastikan logikanya terisolasi dan mudah dipahami.

## Tampilan

```text
+-------------------------------------------------------+
| [Logo]  [Home] [Leaderboard]          [Login/Profil]  |
+-------------------------------------------------------+
|                                                       |
|  [#Kategori]                                          |
|  # Judul Thread Yang Sangat Menarik                   |
|                                                       |
|  [Avatar] Dibuat oleh: John Doe                       |
|  21 Nov 2025                                          |
|                                                       |
|  ---------------------------------------------------  |
|  Isi lengkap thread ditampilkan di sini. Bisa         |
|  terdiri dari beberapa paragraf yang menjelaskan      |
|  topik diskusi secara mendalam.                       |
|  ---------------------------------------------------  |
|                                                       |
|  [ ^ Upvote ] [ v Downvote ]  (Total: 15)             |
|                                                       |
|  ---------------------------------------------------  |
|  Komentar (5)                                         |
|                                                       |
|  +-------------------------------------------------+  |
|  |  Beri Komentar:                                 |  |
|  |  [___________________________________________]  |  |
|  |  [ KIRIM ]                                      |  |
|  +-------------------------------------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  |  [Avatar] Jane Doe | 10 menit lalu              |  |
|  |  "Sangat setuju dengan pendapat ini!"           |  |
|  |  [ ^ ] [ v ] (Total: 2)                         |  |
|  +-------------------------------------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  |  [Avatar] Budi | 30 menit lalu                  |  |
|  |  "Izin bertanya gan..."                         |  |
|  |  [ ^ ] [ v ] (Total: 0)                         |  |
|  +-------------------------------------------------+  |
|                                                       |
+-------------------------------------------------------+
```

## Elemen Kunci

- **Detail Thread**: Menampilkan konten utama thread (Judul, Body, Author, Waktu, Kategori).
- **Vote Controls**: Tombol Upvote & Downvote untuk thread. (Sesuai **Saran 1** pada `01_requirement.md`). Status vote harus diperbarui secara real-time.
- **Form Komentar**: `Textarea` dan `Tombol Kirim`. Form ini hanya muncul jika pengguna sudah login. Setelah submit, komentar baru harus langsung terlihat.
- **List Komentar**: Menampilkan semua komentar pada thread. Setiap item komentar memiliki:
  - Avatar, Nama, Waktu
  - Konten komentar
  - Vote controls untuk komentar.

---

> ### 📝 **Catatan untuk Developer (`antigravity`)**
>
> - Halaman ini akan mengambil data thread berdasarkan ID (`:id`) dari parameter URL. Gunakan `useParams` dari `react-router-dom`.
> - Pertimbangkan untuk menggunakan `useEffect` untuk memuat data thread dan komentarnya saat komponen pertama kali di-mount.
> - Implementasikan optimistik UI update untuk voting dan penambahan komentar agar user experience lebih baik, lalu konfirmasi ke server.
