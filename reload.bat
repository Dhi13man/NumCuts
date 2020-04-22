echo off

if not exist "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\NumCuts.exe" (
    rem copy NumCuts.exe "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
)

taskkill /f /im NumCuts.exe
NumCuts.exe