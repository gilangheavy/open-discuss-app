# Rencana Arsitektur: Aplikasi Forum Diskusi

Dokumen ini menguraikan arsitektur yang akan kita gunakan untuk membangun aplikasi forum diskusi. Tujuannya adalah memastikan aplikasi yang kita bangun _robust_, _scalable_, dan mudah dikelola, sesuai dengan kriteria yang ditetapkan.

## 1. Struktur Folder

Untuk memisahkan dengan jelas antara UI, state management, dan logika lainnya, kita akan menggunakan struktur folder berikut:

```
src/
|-- app/
|   |-- store.js        # Konfigurasi Redux Store
|
|-- components/         # Komponen UI (reusable & "dumb")
|   |-- common/         # Komponen umum (Button, Input, etc.)
|   |-- threads/        # Komponen terkait threads
|   |-- comments/       # Komponen terkait comments
|
|-- features/           # State management & logika per fitur (Redux Toolkit)
|   |-- auth/
|   |   |-- authSlice.js
|   |-- threads/
|   |   |-- threadsSlice.js
|   |-- threadDetail/
|   |   |-- threadDetailSlice.js
|   |-- users/
|   |   |-- usersSlice.js
|   |-- leaderboard/
|   |   |-- leaderboardSlice.js
|
|-- services/
|   |-- api.js          # Konfigurasi instance & interceptor (jika perlu)
|
|-- utils/              # Fungsi-fungsi helper
|
|-- App.jsx
|-- index.js
```

**Penjelasan:**

- **`app/`**: Konfigurasi pusat aplikasi, terutama Redux store.
- **`components/`**: Berisi komponen React yang fokus pada tampilan (UI). Komponen di sini tidak boleh mengakses Redux store atau melakukan pemanggilan API secara langsung. Mereka menerima data dan _event handlers_ melalui `props`.
- **`features/`**: Inti dari state management kita. Setiap folder di dalamnya merepresentasikan satu "fitur" atau "domain data" (misalnya, `threads`, `auth`). Di dalamnya terdapat _slice_ Redux yang berisi _reducers_ dan _async thunks_ untuk fitur tersebut.
- **`services/`**: Tempat terpusat untuk logika pemanggilan API. _Async thunks_ dari _slices_ akan memanggil fungsi dari sini.
- **`utils/`**: Kumpulan fungsi utilitas murni yang bisa digunakan di seluruh aplikasi (misal: format tanggal).

## 2. State Management (Redux Toolkit)

Kita akan menggunakan **Redux Toolkit** karena menyederhanakan banyak hal, termasuk penulisan _actions_, _reducers_, dan logika asinkron.

### Rancangan Slices

- **`authSlice`**:
  - **State**: `status` ('idle', 'loading', 'succeeded', 'failed'), `error`, `authUser` (null atau objek user).
  - **Async Thunks**:
    - `asyncRegister(name, email, password)`
    - `asyncLogin(email, password)`
    - `asyncGetOwnProfile()`
- **`usersSlice`**:
  - **State**: `status`, `error`, `users` (array of user objects).
  - **Async Thunks**:
    - `asyncGetAllUsers()`: Untuk mendapatkan data semua pengguna yang dibutuhkan, misalnya untuk info pembuat thread/komentar.
- **`threadsSlice`**:
  - **State**: `status`, `error`, `threads` (array of thread objects).
  - **Async Thunks**:
    - `asyncGetAllThreads()`
    - `asyncCreateThread(title, body, category)`
    - `asyncToggleUpVoteThread(threadId)`
    - `asyncToggleDownVoteThread(threadId)`
    - `asyncToggleNeutralVoteThread(threadId)`
- **`threadDetailSlice`**:
  - **State**: `status`, `error`, `threadDetail` (null atau objek thread detail).
  - **Async Thunks**:
    - `asyncGetThreadDetail(threadId)`
    - `asyncCreateComment(threadId, content)`
    - `asyncToggleUpVoteComment(threadId, commentId)`
    - `asyncToggleDownVoteComment(threadId, commentId)`
    - `asyncToggleNeutralVoteComment(threadId, commentId)`
- **`leaderboardSlice`**:
  - **State**: `status`, `error`, `leaderboard` (array of leaderboard items).
  - **Async Thunks**:
    - `asyncGetLeaderboard()`

### Alur Data

1. **Komponen UI**: Memanggil `dispatch` dengan sebuah _async thunk_ (misal: `dispatch(asyncGetAllThreads())`).
2. **Async Thunk**: Menjalankan pemanggilan API melalui modul `services/api.js`.
3. **Hasil API**: Setelah selesai, _async thunk_ akan `dispatch` _action_ internal (misal: `fulfilled` atau `rejected`).
4. **Slice Reducer**: Menangani _action_ tersebut dan memperbarui state di Redux store.
5. **Komponen UI**: Berlangganan ke Redux store (via `useSelector`) dan akan otomatis di-render ulang dengan data baru.

## 3. Strategi Pemanggilan API

- Semua fungsi yang berinteraksi langsung dengan REST API akan ditempatkan di dalam `src/services/api.js`.
- Fungsi-fungsi ini akan bersifat _asynchronous_ dan mengembalikan data hasil dari API.
- _Async thunks_ (di dalam _slices_) akan menjadi satu-satunya yang boleh memanggil fungsi-fungsi dari `services/api.js`. Ini memastikan kriteria "Tidak ada pemanggilan REST API di dalam komponen" terpenuhi.
- Kita akan menyimpan token autentikasi yang didapat dari API dan menyertakannya dalam _header_ `Authorization` untuk setiap permintaan yang membutuhkan autentikasi.

## 4. Hierarki Komponen (Contoh Awal)

- **`App.jsx`**: Root komponen, mengatur routing.
- **Pages (Smart Components/Containers)**:
  - `HomePage.jsx`: Menampilkan daftar thread. Mengambil data dari `threadsSlice`.
  - `DetailPage.jsx`: Menampilkan detail thread dan komentar. Mengambil data dari `threadDetailSlice`.
  - `LoginPage.jsx`: Form untuk login.
  - `RegisterPage.jsx`: Form untuk registrasi.
  - `NewThreadPage.jsx`: Form untuk membuat thread baru.
  - `LeaderboardPage.jsx`: Menampilkan leaderboard.
- **Presentational Components (Dumb Components)**:
  - `common/Loading.jsx`
  - `common/Header.jsx`
  - `threads/ThreadList.jsx`
  - `threads/ThreadItem.jsx`
  - `comments/CommentList.jsx`
  - `comments/CommentItem.jsx`
  - `leaderboard/LeaderboardList.jsx`

## Langkah Berikutnya

Developer (`antigravity`) dapat mulai bekerja dengan urutan berikut:

1.  **Setup Proyek**: Inisialisasi proyek React, install `redux-toolkit`, `react-redux`, `react-router-dom`.
2.  **Konfigurasi ESLint**: Siapkan file `.eslintrc.json` sesuai dengan salah satu style guide yang disetujui.
3.  **Buat `store.js`**: Konfigurasi Redux store.
4.  **Implementasi Fitur Autentikasi**: Buat `authSlice` dan `usersSlice` beserta komponen UI untuk Login & Register.
5.  **Implementasi Fitur Threads**: Lanjutkan dengan `threadsSlice` dan `threadDetailSlice` beserta komponen UI-nya.
6.  **Implementasi Fitur Tambahan**: Kerjakan fitur _leaderboard_ dan _voting_ jika waktu memungkinkan.
7.  **Styling & Refinement**: Poles tampilan dan UX aplikasi.

Dokumen ini adalah panduan awal. Kita dapat menyesuaikannya seiring berjalannya proyek.
