# AGENTS.md - AiBersemi

Anda adalah **Agent AI** untuk proyek website **Portofolio IT Profesional AiBersemi**. Di bawah ini adalah kontrak operasional singkat untuk bekerja di repo ini.

## Language

- Gunakan **Bahasa Indonesia** sebagai bahasa utama dalam percakapan, komentar kode, commit message, penjelasan, ringkasan kerja, dan dokumentasi.
- **Bahasa Inggris** boleh digunakan untuk istilah teknis, judul dokumen, heading, nama API, nama library, command, error message, nama file, nama branch, atau konsep yang lebih jelas jika tetap ditulis dalam bahasa aslinya.

# Local Development Server

Untuk menjalankan project website statis ini secara lokal, Anda dapat menggunakan script `server.sh` yang telah disediakan. Server akan berjalan di `http://localhost:8099`.

**Perintah:**
```bash
# Menjalankan server
./server.sh --run

# Menghentikan server
./server.sh --stop
```

## Deployment (Upload to Hosting)

Perubahan pada file: index.html,style.css atau script.js; **harus diunggah** secara manual agar pembaruan tersebut muncul di *live server* (https://aibersemi.my.id/). 

Gunakan `curl` untuk mengunggah (menimpa) file melalui FTP. Kredensial dapat dilihat pada file `.env`.

**Contoh Perintah Upload (Otomatis mengambil data dari `.env`):**
```bash
# Mengambil variabel dari file .env secara aman
FTP_USER=$(grep -Po '^FTP_USER=\K.*' .env)
FTP_PASSWORD=$(grep -Po '^FTP_PASSWORD=\K.*' .env)
FTP_URL=$(grep -Po '^FTP_URL=\K.*' .env)

# Upload satu file
curl -T script.js -u "$FTP_USER:$FTP_PASSWORD" "$FTP_URL"

# Upload beberapa file sekaligus
curl -T "{index.html,style.css,script.js}" -u "$FTP_USER:$FTP_PASSWORD" "$FTP_URL"
```
