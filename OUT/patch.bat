ECHO OFF
taskkill /f /im NumCuts.exe
taskkill /f /im NumCutsGUI.exe

copy /b /v /y NumCuts.exe C:\Programs\NumCuts\
if not exist C:\Programs\NumCuts\NumCutsGUI.exe copy /b /v /y NumCutsGUI\NumCutsGUI.exe C:\Programs\NumCuts\
copy /b /v /y NumCuts.exe "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
cd /d C:\Programs\NumCuts\
del temp.exe
cls

ren NumCutsGUI.exe temp.exe
NumCuts.exe
ren temp.exe NumCutsGUI.exe
taskkill /f /im NumCuts.exe

NumCuts.exe