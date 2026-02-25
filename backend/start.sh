#!/bin/bash
echo "Starting migrations..."
php artisan migrate --force
echo "Starting server..."
php artisan serve --host=0.0.0.0 --port=8000
echo "Server stopped!"
