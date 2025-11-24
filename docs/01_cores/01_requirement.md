# Proyek: Membangun Aplikasi React dengan Redux

## Pengantar

Sejauh ini Anda telah:

- mengikuti Style Guide dalam menulis kode,
- menggunakan ESLint sebagai JavaScript Linter,
- menggunakan Strict Mode untuk memperbaiki bugs dari hasil sorotannya,
- mengelola state yang terprediksi perubahannya, dan
- membangun aplikasi nyata dengan React dan Redux.

Untuk menguji pemahaman yang Anda miliki, kami melakukan asesmen dengan memberikan tugas kepada Anda, untuk membangun Aplikasi React dengan Redux bertemakan “Aplikasi Forum Diskusi”. Nantinya, Reviewer kami akan memeriksa pekerjaan Anda dan memberikan reviu pada proyek yang dibuat.

## Kriteria

### Tujuan Akhir

Buatlah aplikasi React bertemakan “Aplikasi Forum Diskusi” yang memanfaatkan API https://forum-api.dicoding.dev/v1/#/ dari Dicoding Forum API. Kami mengedepankan kreativitas Anda dalam membangun aplikasi, tetapi pastikan aplikasi yang dibuat memenuhi kriteria yang dijelaskan di bawah ini.

### Kriteria Utama 1: Fungsionalitas Aplikasi

- Terdapat cara untuk mendaftar akun.
- Terdapat cara untuk login akun.
- Menampilkan daftar thread.
- Ketika item thread dipilih, menampilkan detail thread beserta komentar di dalamnya.
- Pengguna dapat membuat thread.
- Pengguna dapat membuat komentar di dalam sebuah thread.
- Menampilkan Loading Indicator ketika memuat data dari API.

#### Catatan penting.

- Perihal authorization dalam mengakses resource threads kami bebaskan. Anda boleh mengharuskan pengguna untuk login ataupun tidak - ketika ingin melihat threads. Namun, dalam berinteraksi mengubah data, seperti membuat thread atau komentar, pengguna wajib - terotentikasi.
- Item thread pada halaman daftar thread yang ditampilkan harus mengandung informasi berikut ini.
  - Judul dari thread.
  - Potongan dari body thread (opsional).
  - Waktu pembuatan thread.
  - Jumlah komentar.
  - Informasi pembuat thread:
    - Nama
    - Avatar (opsional)
- Halaman detail thread harus mengandung informasi berikut ini.
  - Judul dari thread.
  - Body dari thread.
  - Waktu pembuatan thread.
  - Informasi pembuat thread:
    - Nama
    - Avatar
- Komentar pada thread tersebut. Minimal informasi yang harus ditampilkan adalah:
  - Konten dari komentar.
  - Waktu pembuatan komentar.
  - Informasi pembuat komentar:
    - Nama
    - Avatar (opsional)

### Kriteria Utama 2: Bugs Highlighting

- Menggunakan ESLint pada source code aplikasi. Indikasinya adalah terdapat berkas konfigurasi ESLint pada proyek.
- Menerapkan salah satu Code Convention berikut.
  - Dicoding Academy JavaScript Style Guide.
  - AirBnB JavaScript Style Guide.
  - Google JavaScript Style Guide.
  - StandardJS Style Guide.
- Tidak ada indikasi error yang ditampilkan ESLint.
- Menggunakan React Strict Mode.

### Kriteria Utama 3: Arsitektur Aplikasi

- Hampir seluruh state aplikasi (terutama yang bersumber dari API) disimpan pada Redux Store. Form input atau controlled component diperbolehkan untuk mengelola state-nya sendiri.
- Tidak ada pemanggilan REST API yang dilakukan di dalam lifecycle atau efek pada komponen.
- Memisahkan kode UI dengan State di folder yang terpisah.
- React component bersifat modular dan reusable.

### Buat Proyekmu Unggul!

Selain kriteria utama yang wajib Anda penuhi, kami beri beberapa saran yang bisa Anda terapkan agar proyek lebih unggul dan mendapat nilai terbaik.

### Saran 1: Fitur Votes pada Thread dan Komentar

- Menyediakan tombol yang dapat digunakan untuk votes pada thread dan komentar.
- Menampilkan indikasi pada tombol bila pengguna sudah mem-vote thread dan komentar. Contohnya, mengubah warna tombol dari abu-abu menjadi merah bila pengguna sudah up-vote/down-vote.
- Mengedepankan User Experience dengan menerapkan Optimistically Apply Actions.
- Menampilkan jumlah votes pada thread dan komentar.

### Saran 2: Menampilkan Leaderboard

- Terdapat halaman untuk menampilkan leaderboard.
- Setiap item leaderboard, harus menampilkan informasi berikut ini.
  - Nama pengguna.
  - Avatar pengguna.
  - Score.

### Saran 3: Filter Daftar Thread Berdasarkan Kategori

- Terdapat fitur untuk mem-filter item thread yang ditampilkan pada halaman daftar threads.

> Catatan: API tidak menyediakan endpoint untuk filter daftar threads, sehingga fitur ini dibangun murni dari sisi Front-End dengan memanipulasi state aplikasi.

---

#### Contoh Aplikasi

Kami mendorong Anda untuk berkreasi dalam mengerjakan proyek submission dengan menambahkan atau menetapkan gaya secara mandiri. Namun, berikut gambaran besar dari aplikasi yang perlu Anda buat.
https://dicoding-forum-app.vercel.app/
Hindari meniru persis contoh aplikasi. Inilah waktu yang tepat untuk mengasah kemampuan dan kreativitas Anda dalam membangun proyek.

## Instruksi Pengerjaan

Ikuti instruksi berikut agar lebih mudah dalam mengerjakan submission.

### Buat Rencana yang Matang

- Buat sketsa dari aplikasi yang akan dibuat
  Dalam mengerjakan proyek ini, Anda perlu menentukan visual berdasarkan fungsionalitas aplikasi. Salah satu cara terbaik adalah dengan menggambar tiap halaman aplikasi menggunakan kertas dan pensil. Hal ini akan sangat membantu Anda untuk memberikan ide informasi yang harus ada pada setiap halaman aplikasi.
  Selain dengan kertas dan pensil, Anda juga bisa memanfaatkan aplikasi mock-up gratis seperti Figma.

- Pecah view menjadi hierarki komponen
  Setelah menggambar tiap halaman aplikasi, Anda bisa tandai yang bisa dijadikan komponen terpisah dengan memberi garis kotak. Ini akan memudahkan Anda dalam menentukan hierarki komponennya.

- Tentukan Action yang dapat terjadi pada aplikasi
  Anda perlu menganalisis action yang mungkin terjadi pada aplikasi terhadap sebuah data. Contohnya, menetapkan nilai state dari API atau menambah dan memodifikasi state. Ini akan memudahkan Anda dalam menentukkan state dan action yang harus dibuat pada aplikasi.

### Fase Coding

- Buatlah folder baru untuk memulai proyek React. Kami sarankan Anda untuk menggunakan create-react-app agar tidak perlu repot menyiapakan module bundler dan lain sebagainya.
- Pasanglah dependencies yang sudah pasti dibutuhkan seperti redux atau redux toolkit, react-redux, dan lainnya. Jangan dulu pasang dependencies yang sekiranya belum Anda butuhkan.
- Buatlah kode yang berhubungan dengan state terlebih dulu, seperti action dan reducer. Kemudian buatlah Redux store dan daftarkan seluruh reducer yang sudah dibuat.
- Uji Redux Store dan pastikan bekerja dengan baik. Anda bisa mengeceknya via console terlebih dulu.
- Buatlah komponen dan pastikan store berfungsi dengan baik ketika digunakan pada komponen.
- Tambahkan react-router jika Anda sudah membutuhkannya.
  Selesaikan aplikasi berdasarkan kriteria yang ada.

Jika Anda sudah berpengalaman dalam membangun aplikasi, Anda bisa menyesuaikan alur yang cocok dengan kebutuhan Anda sendiri.

## Penilaian

Submission akan dinilai oleh reviewer dalam skala 1-5. Untuk mendapatkan nilai tinggi, Anda bisa menerapkan beberapa saran berikut.

- Menerapkan Saran 1: Fitur Votes pada Thread dan Komentar.
- Menerapkan Saran 2: Menampilkan Leaderboard.
- Menerapkan Saran 3: Filter Daftar Thread Berdasarkan Kategori.
- Saran lainnya:
  - Aplikasi yang Anda bangun mudah untuk digunakan. Contohnya, tidak membuat pengguna bingung dan menggunakan warna yang mudah dalam membaca teks.
  - Aplikasi yang Anda bangun memiliki tampilkan yang menarik.


---

---

# Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi

Selamat! Anda sudah berada di penghujung kelas Menjadi React Web Developer Expert. Sejauh ini, Anda telah:

- menguji aplikasi React secara otomatis pada tingkatan Unit, Integration atau Component, dan End-to-End testing;
- menggunakan Jest, React Testing Library, dan Cypress dalam dalam menguji aplikasi secara otomatis.
- mencoba kultur TDD;
- menggunakan Git dalam mengelola source code;
- men-deploy aplikasi dengan cara yang efisien, cepat, dan aman dengan CI/CD; dan
- menggunakan ekosistem atau library yang mendukung pengembangan lebih cepat dan efisien.
Untuk menguji pemahaman dan lulus dari kelas ini, kami perlu melakukan asesmen dengan memberikan tugas, yakni menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi yang sudah Anda buat di submission sebelumnya. Reviewer kami akan memeriksa pekerjaan Anda dan menentukan kelulusan Anda pada kelas ini.

## Tujuan Akhir
- Buat pengujian mulai dari Unit, Integration, dan End-to-End pada Aplikasi Forum Diskusi.
- Deploy Aplikasi Forum Diskusi dengan teknik CI/CD.
- Memanfaatkan salah satu React Ecosystem pada Aplikasi Forum Diskusi.

### Kriteria Utama 1: Automation Testing
- Buat minimal dua pengujian fungsi Reducer.
- Buat minimal dua pengujian Thunk Function.
- Buat minimal dua pengujian React Components.
- Buat minimal satu pengujian End-to-End untuk alur login aplikasi.
- Wajib menulis skenario pengujian pada masing-masing berkas pengujian.
- Pengujian dapat dijalankan dengan perintah npm test dan npm run e2e.

> Catatan penting.
>
> Anda bisa tentukan sendiri fungsi reducer, thunk, dan React component yang hendak diuji. Untuk mengasah kemampuan, kami sarankan untuk menguji unit yang kompleks. Contonya, fungsi reducer yang > memiliki banyak kondisi atau fungsi thunk yang men-dispatch banyak action.

### Kriteria Utama 2: Deployment Aplikasi
- Deploy aplikasi dengan menggunakan teknik CI/CD.
- Continuous Integration diterapkan dengan GitHub Actions.
- Continuous Deployment diterapkan dengan Vercel.
- Memproteksi branch master.
- Melampirkan URL Vercel aplikasi Anda pada catatan submission.
- Melampirkan screenshot sebagai bukti telah menerapkan konfigurasi CI/CD dan branch protection dengan benar. Screenshot yang perlu dilampirkan:
  - 1_ci_check_error: menunjukkan CI check error karena pengujian gagal,
  - 2_ci_check_success: menunjukkan CI check success karena pengujian berhasil,
  - 3_branch_protection: menunjukkan branch protection.

### Kriteria Utama 3: Memanfaatkan Salah Satu Ecosystem React
- Memanfaatkan minimal satu React Ecosystem pada daftar berikut: [Awesome React Ecosystem](https://github.com/dicodingacademy/awesome-react-ecosystem#react-tools).
- Berikut penggunaan Ecosystem React yang tidak kami pertimbangkan untuk memenuhi kriteria :
  - Create React Apps
  - Vite
  - React Router
  - React Icons
  - Redux
  - Redux Thunk
  - Redux Toolkit
  - Jest
  - Vitest
  - React Testing Library

### Kriteria Utama 4: Mempertahankan Kriteria Submission Sebelumnya
Aplikasi harus tetap mempertahankan kriteria utama yang ada di submission sebelumnya.

- Fungsionalitas Aplikasi
- Bugs Highlighting
- Arsitektur Aplikasi

### Penilaian

Submission akan dinilai oleh reviewer dalam skala 1-5. Untuk mendapatkan nilai tinggi, Anda bisa menerapkan beberapa saran berikut.

  - Terdapat lebih dari tiga pengujian fungsi reducer.
- Terdapat lebih dari tiga pengujian fungsi thunks.
- Terdapat lebih dari tiga pengujian pada React Component.
- Memiliki minimal 2 stories komponen.
- Menerapkan saran pada submission sebelumnya, seperti:
  - fitur votes pada thread dan komentar;
  - menampilkan leaderboard; dan
  - filter daftar thread berdasarkan kategori.
- Saran lainnya.
- Aplikasi yang Anda bangun mudah untuk digunakan. Contohnya, tidak membuat pengguna bingung dan menggunakan warna yang mudah dalam membaca teks.
- Aplikasi yang Anda bangun memiliki tampilkan yang menarik.