#!/bin/bash

# Simple HTTP server for testing death-order-test.html
# Uses Python's built-in HTTP server

PORT=8080

echo "🧪 Starting Development Server..."
echo "📂 Serving from: $(pwd)"
echo ""
echo "🌐 Available pages:"
echo "   Main Calculator:     http://localhost:$PORT/index.html"
echo "   Death Order Calc:    http://localhost:$PORT/death-order.html"
echo "   Algorithm Test:      http://localhost:$PORT/death-order-test.html"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    python -m http.server $PORT
else
    echo "❌ Error: Python not found. Please install Python 3."
    exit 1
fi

