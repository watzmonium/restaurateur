#!/bin/bash
# Function to stop both processes
stop_processes() {
    echo "Stopping processes..."
    pkill -P $$
}

# Trap Ctrl-C signal to stop processes
trap stop_processes SIGINT
wait &

# Start frontend server
cd ./frontend
npm run dev &
frontend_pid=$!

# Start backend server
cd ../backend
npm run dev &
backend_pid=$!

# Wait for processes to finish
wait $frontend_pid
wait $backend_pid
