# Num-Cuts
A C++ based tool that allows you to set up custom shortcut keys that you can press along with Num Lock to run anything on your PC or the web. Contains a full HTML/CSS based UI made using NodeJS and Electron Framework.

The Repository has 2 Branches:
--

# Master: 
Contains the back-end code constructed in C++ and Batch. It is responsible for self-installation to C:\\ScrRunner (modifiable) and Startup, and executing the Scripts and GUI based on shortcuts.

# Master-GUI:
Contains the front-end GUI interface made through HTML, CSS and JavaScript, built into an app using Nodejs and the Electron framework.

Release Usage:
--
The Release can only be executed on the specific OS and architecture it's been built for. Simply extract all the contents of the Release rar and run NumCuts.exe.

Source code Usage:
--
1. Both the compiled outputs of the source codes in Master and Master-GUI must be placed in the same folder. Then NumCuts.exe must be executed once to set everything up. The original files can then be deleted.
2. As this software has been built around Windows Batch and Shell-Script, it is Windows only.
