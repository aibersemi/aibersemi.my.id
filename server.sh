#!/bin/bash

PORT=8099

function start_server() {
    if [ -f server.pid ] && ps -p $(cat server.pid) > /dev/null 2>&1; then
        echo "Server is already running with PID $(cat server.pid)."
        exit 1
    fi

    echo "Starting server at http://localhost:$PORT..."
    nohup python3 -m http.server $PORT > server.log 2>&1 &
    PID=$!
    echo $PID > server.pid
    echo "Server is running in the background (PID: $PID)."
    echo "Logs are available in the server.log file."
}

function stop_server() {
    if [ -f server.pid ]; then
        PID=$(cat server.pid)
        if ps -p $PID > /dev/null 2>&1; then
            echo "Stopping server with PID $PID..."
            kill $PID
            echo "Server stopped successfully."
        else
            echo "Server with PID $PID is not running."
        fi
        rm server.pid
    else
        echo "server.pid file was not found."
        echo "Trying to stop the Python HTTP Server process manually..."
        if pkill -f "python3 -m http.server $PORT"; then
            echo "Server on port $PORT stopped successfully."
        else
            echo "No server is running on port $PORT."
        fi
    fi
}

function show_help() {
    echo "Usage: $0 [option]"
    echo "Options:"
    echo "  -r, --run    Run the local web server in the background"
    echo "  -s, --stop   Stop the local web server"
    echo "  -h, --help   Show this help message"
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
        echo "Invalid option: $1"
        show_help
        exit 1
        ;;
esac
