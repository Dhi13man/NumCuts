# NumCuts
A C++ based tool that allows you to set up custom shortcut keys that you can press along with Num Lock/Caps Lock to run anything on your PC or the web. Contains a full HTML/CSS based UI made using NodeJS and Electron Framework.

#


Master Branch(this): 
--
Contains the back-end code constructed in C++ and Batch. It is responsible for self-installation to C:\\ScrRunner (modifiable) and Startup, and executing the Scripts and GUI based on shortcuts.

Master-GUI Branch:
--
Contains the front-end GUI interface made through HTML, CSS and JavaScript, built into an app using Nodejs and the Electron framework.


---


How to use Released NumCuts:
--
1. Extract all the contents of the compressed Release file into the same folder and run NumCuts.exe.
2. Once it's done installing and NumCutsGUI runs, add your own Shorctcuts and close the GUI. You may remove the extracted files then, if you wish.
3. Run your assigned shortcuts with Num-Lock(or Caps Lock if so set) + (the assigned key) 
4. The original extracted files can then be deleted.
5. If needed, open the GUI again to reconfigure shorcuts, using Num-Lock(or Caps Lock if so set) + 0.


How to use Source Code:
--
1. Modify the Source codes in either branch as needed.
2. Compile the Source code of Master(C++), and package Master-GUI(Nodejs Electron). 
3. The Release can only be executed on the specific OS and architecture it's been built for.
4. Rename the output GUI executable in the folder obtained after packaging the source code in Master-GUI branch, to NumCutsGUI.exe.
5. Place the compiled output of the source code of Master, and the packaged output folder of Master-GUI, in the same folder. 
6. Rename the packaged output folder of Master-GUI, to "NumCuts-GUI". This folder must have a file called NumCutsGUI.exe. If it doesn't, take necessary action.
7. Move Reload.bat and move_to_startup.bat from Master-GUI branch to "Numcuts-GUI" folder.
8. Execute NumCuts.exe to set everything up. The original files can then be deleted.


---


Software/Dependencies used to create this tool:
--


The GUI:
1. Electron Framework v8.2.3
2. Nodejs v13.13.0 and it's depenencies, (mostly 'fs')
3. HTML5
4. CSS
5. JavaScript
6. Bootstrap
7. Based on Agency, a free Bootstrap Template
Adobe DreamWeaver

The execution tool:
1. C++14
2. Basic Windows Shell Script
3.MingW-w64 Toolchain(for compiling and making the cpp)
4. Jetbrains products:
   CLion, 
   WebStorm


Note:
--

1. NumCuts has been programmed to automatically move to Windows Startup, so it can launch automatically every time the PC starts.
2. The console also hides itself after installation. No Window is visible at all, thereby other operations are not disturbed.
3. Being built around Batch commands, it will only work on Windows. Feel free to make your own versions for other systems.
