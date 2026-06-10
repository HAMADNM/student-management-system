#!/bin/bash
# Build script for production deployment on Linux/Mac

echo "Building Student Management System..."
echo ""

echo "[1/3] Installing dependencies..."
pip install -r requirements.txt || exit 1

echo ""
echo "[2/3] Collecting static files..."
python manage.py collectstatic --noinput || exit 1

echo ""
echo "[3/3] Seeding database with initial data..."
python manage.py seed_data || exit 1

echo ""
echo "=================================================="
echo "BUILD COMPLETE"
echo "=================================================="
echo ""
