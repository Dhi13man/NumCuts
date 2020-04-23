echo off
taskkill /f /im NumCuts.exe
taskkill /f /im NumCutsGUI.exe

copy /b /v /y NumCuts.exe C:\SCRunner\
copy /b /v /y NumCuts.exe "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
cd /d C:\SCRunner\
cls

ren NumCutsGUI.exe temp.exe
NumCuts.exe
ren temp.exe NumCutsGUI.exe
taskkill /f /im NumCuts.exe

NumCuts.exe