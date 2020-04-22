# Num-Cuts
A C++ based tool that allows you to set up custom shortcut keys that you can press along with Num Lock/Caps Lock to run anything on your PC or the web. Contains a full HTML/CSS based UI made using NodeJS and Electron Framework.

# The Repository has 2 Branches:


Master: 
--
Contains the back-end code constructed in C++ and Batch. It is responsible for self-installation to C:\\ScrRunner (modifiable) and Startup, and executing the Scripts and GUI based on shortcuts.

Master-GUI:
--
Contains the front-end GUI interface made through HTML, CSS and JavaScript, built into an app using Nodejs and the Electron framework.





---


How to use Released NumCuts:
--
1. Simply extract all the contents of the compressed Release file and run NumCuts.exe.
2. The Release can only be executed on the specific OS and architecture it's been built for.
3. Once it's done installing and NumCutsGUI runs, add your own Shorctcuts and close the GUI. You may remove the extracted files then, if you wish.
4. Run your assigned shortcuts with Num-Lock(or Caps Lock if so set) + (the assigned key) 
5. If needed, open the GUI again to reconfigure shorcuts, using Num-Lock(or Caps Lock if so set) + 0.


How to use Source Code:
--
1. Both the compiled outputs of the source codes in Master and Master-GUI must be placed in the same folder. Then NumCuts.exe must be executed once to set everything up. The original files can then be deleted.
2. As this software has been built around Windows Batch and Shell-Script, it is Windows only.


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

The execution software:
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
