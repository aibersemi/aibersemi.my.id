# AiBersemi

Website portofolio IT profesional AiBersemi.

Repo ini digunakan sebagai catatan kerja dan arsip pengembangan website pribadi. Kode dibuat terbuka agar bisa dilihat, dipelajari, atau diunduh, tetapi repository ini tidak disiapkan sebagai proyek kontribusi publik.

## Website

Live site:

https://aibersemi.my.id/

## Teknologi

- HTML
- CSS
- JavaScript
- Shell script untuk server lokal

## Development Lokal

Jalankan server lokal:

```bash
./server.sh --run
```

Website lokal akan tersedia di:

```text
http://localhost:8099
```

Hentikan server:

```bash
./server.sh --stop
```

## Deployment

Deployment ke hosting dilakukan manual melalui FTP sesuai instruksi internal di `AGENTS.md`.

File yang biasanya perlu diunggah setelah perubahan:

- `index.html`
- `style.css`
- `script.js`
- `favicon.ico`

## Kebijakan Repository

- Repository ini bersifat publik untuk transparansi portofolio.
- Issues, Projects, Discussions, dan Wiki tidak digunakan.
- Perubahan utama dikelola langsung oleh pemilik repository.
- Pull request dari pihak lain tidak menjadi bagian dari workflow utama.
