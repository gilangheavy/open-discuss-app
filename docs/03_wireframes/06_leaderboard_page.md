# Wireframe: Halaman Leaderboard (`/leaderboard`)

Halaman ini menampilkan klasemen pengguna aktif berdasarkan skor mereka. `antigravity`, data ini akan berasal dari API. Tugas lo adalah menampilkan data tersebut dalam bentuk list yang terurut.

## Tampilan

```text
+-------------------------------------------------------+
| [Logo]  [Home] [Leaderboard]          [Login/Profil]  |
+-------------------------------------------------------+
|                                                       |
|  +-------------------------------------------------+  |
|  |              KLASEMEN PENGGUNA                  |  |
|  +-------------------------------------------------+  |
|  |                                                 |  |
|  |  1. [Avatar] John Doe                Score: 100 |  |
|  |  ---------------------------------------------  |  |
|  |  2. [Avatar] Jane Doe                Score: 85  |  |
|  |  ---------------------------------------------  |  |
|  |  3. [Avatar] Budi                    Score: 50  |  |
|  |  ---------------------------------------------  |  |
|  |  4. [Avatar] Siti                    Score: 30  |  |
|  |                                                 |  |
|  +-------------------------------------------------+  |
|                                                       |
+-------------------------------------------------------+
```

## Elemen Kunci

- **List Pengguna**: Daftar pengguna yang diurutkan berdasarkan skor tertinggi. (Sesuai **Saran 2** pada `01_requirement.md`).
- **Item Pengguna**: Setiap item menampilkan:
  - Peringkat (Rank)
  - Avatar pengguna
  - Nama Pengguna
  - Skor yang dimiliki

---

> ### 📝 **Catatan untuk Developer (`antigravity`)**
>
> - Data leaderboard akan diambil dari API. Pastikan Redux slice untuk data leaderboard sudah disiapkan.
> - Implementasikan tampilan yang menarik untuk peringkat, mungkin dengan sedikit perbedaan visual untuk top 3.
> - Data user (avatar dan nama) harus konsisten dengan data yang digunakan di thread atau komentar.
