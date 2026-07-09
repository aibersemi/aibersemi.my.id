# AGENTS.md - AiBersemi

You are the **AI Agent** for the **AiBersemi IT Professional Portfolio** website project. Below is a short operational contract for working in this repository.

## Language

- Use **Bahasa Indonesia** as the primary language for conversations, explanations, work summaries, implementation plans, and walkthroughs.
- Use **English** for all repository work, including documentation and all technical aspects (e.g., code, commands, commits, filenames).

# Local Development Server

To run this static website project locally, use the provided `server.sh` script. The server will run at `http://localhost:8099`.

**Commands:**
```bash
# Start the server
./server.sh --run

# Stop the server
./server.sh --stop
```

## Deployment (Upload to Hosting)

> **WARNING:** Execute this only if explicitly requested for publication. Do not execute automatically.

Changes to `index.html`, `style.css`, `script.js`, `.htaccess` or `favicon.ico` **must be uploaded** manually for the updates to appear on the *live server* (https://aibersemi.my.id/).

Use `curl` to upload (overwrite) files through explicit FTPS. Credentials can be found in the `.env` file. Always keep TLS verification enabled; do not use `-k` or `--insecure`.

**Upload Command Examples (Automatically reads data from `.env`):**
```bash
# Read variables from the .env file safely
FTP_USER=$(grep -Po '^FTP_USER=\K.*' .env)
FTP_PASSWORD=$(grep -Po '^FTP_PASSWORD=\K.*' .env)
FTPS_URL=$(grep -Po '^FTPS_URL=\K.*' .env)

# Upload one file through verified FTPS
curl --ssl-reqd --ftp-pasv -T script.js -u "$FTP_USER:$FTP_PASSWORD" "$FTPS_URL"

# Upload multiple files at once through verified FTPS
curl --ssl-reqd --ftp-pasv -T "{index.html,style.css,script.js,.htaccess,favicon.ico}" -u "$FTP_USER:$FTP_PASSWORD" "$FTPS_URL"
```
