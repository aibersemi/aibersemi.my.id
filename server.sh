#!/bin/bash

PORT=8099

function start_server() {
    if [ -f server.pid ] && ps -p $(cat server.pid) > /dev/null 2>&1; then
        echo "Server sudah berjalan dengan PID $(cat server.pid)."
        exit 1
    fi

    echo "Memulai server di http://localhost:$PORT..."
    nohup python3 -m http.server $PORT > server.log 2>&1 &
    PID=$!
    echo $PID > server.pid
    echo "Server berjalan di background (PID: $PID)."
    echo "Log dapat dilihat di file server.log."
}

function stop_server() {
    if [ -f server.pid ]; then
        PID=$(cat server.pid)
        if ps -p $PID > /dev/null 2>&1; then
            echo "Menghentikan server dengan PID $PID..."
            kill $PID
            echo "Server berhasil dihentikan."
        else
            echo "Server dengan PID $PID tidak sedang berjalan."
        fi
        rm server.pid
    else
        echo "File server.pid tidak ditemukan."
        echo "Mencoba menghentikan proses Python HTTP Server secara manual..."
        if pkill -f "python3 -m http.server $PORT"; then
            echo "Server di port $PORT berhasil dihentikan."
        else
            echo "Tidak ada server yang berjalan di port $PORT."
        fi
    fi
}

function show_help() {
    echo "Penggunaan: $0 [opsi]"
    echo "Opsi:"
    echo "  -r, --run    Menjalankan server web lokal di background"
    echo "  -s, --stop   Menghentikan server web lokal"
    echo "  -h, --help   Menampilkan bantuan ini"
}

if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

case "$1" in
    -r|--run)
        start_server
        ;;
    -s|--stop)
        stop_server
        ;;
    -h|--help)
        show_help
        ;;
    *)
        echo "Opsi tidak valid: $1"
        show_help
        exit 1
        ;;
esac
