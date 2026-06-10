@echo off
REM Build script for production deployment on Windows

echo Building Student Management System...
echo.

echo [1/3] Installing dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to install dependencies
    exit /b 1
)

echo.
echo [2/3] Collecting static files...
python manage.py collectstatic --noinput
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to collect static files
    exit /b 1
)

echo.
echo [3/3] Seeding database with initial data...
python manage.py seed_data
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to seed database
    exit /b 1
)

echo.
echo ==================================================
echo BUILD COMPLETE
echo ==================================================
echo.
pause
