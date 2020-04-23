ECHO OFF
taskkill /f /im NumCuts.exe
taskkill /f /im NumCutsGUI.exe

copy C:\Programs\NumCuts\settings.dat 
del /f /q C:\Programs\NumCuts\
del /f /q "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\NumCuts.exe"
del /f /q NumCuts.exe
del /f /q NumCuts-GUI
rd  /s /q C:\Programs\NumCuts\
rd /s /q NumCuts-GUI
cls

echo NumCuts Uninstalled! Settings file moved here in case you want to reinstall in the future!
echo For future reinstallation, just move Settings file back to install directory to get your settings back.
pause