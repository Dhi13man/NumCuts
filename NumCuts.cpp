/*
A C++ based tool that allows you to set up custom shortcut keys that you can press along with Num Lock/Caps Lock to run anything on your PC or the web. Contains a full HTML/CSS based UI made using NodeJS and Electron Framework.

    Copyright (C) 2020  Dhiman Seal

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

#include <windows.h>
#include <winuser.h>
#include <fstream>
#include "iostream"

using namespace std;

#define num_lock VK_NUMLOCK
#define shift VK VK_RSHIFT0
#define caps_lock VK_CAPITAL

int master_key = num_lock;

// Keeps main terminal window hidden after first run
void StealthMode(){
    HWND stealth;
    AllocConsole();
    stealth = FindWindowA("ConsoleWindowClass", nullptr);
    ShowWindow(stealth,0);
}


// Helper function for parsing addresses
char *to_char_arr(const string& inString) {
    char *out = new char[inString.length() + 1];
    strcpy(out, inString.c_str());
    out[inString.length()] = '\0';
    return out;
}

void open_command_here(const string& command, const string& here){
    fstream p;
    p.open((here + "exec.bat"), ios::out);
    p << "cd /d " + here + "\n";
    p << "echo off\n";
    p <<  "start \"\" " + command + "\n";
    p.close();
    system(to_char_arr(here + "exec.bat"));
    remove("exec.bat");
}


// Check if file exists
bool file_exists(const string& file_address) {
    ifstream file;
    file.open(to_char_arr(file_address));
    return !!file;
}


// Installing this program(Requires the GUI app folder in same directory as this)
void install_me(const string& installDir) {

    // Copy GUI folder to install directory
    if (file_exists("Numcuts-gui\\NumCutsGUI.exe")) {
        system(to_char_arr("robocopy Numcuts-gui " + installDir + " /MIR"));

        // Set working directory to install directory
        system(to_char_arr("cd " + installDir));
        system(to_char_arr("copy Numcuts.exe " + installDir));
        open_command_here(installDir + "NumCutsGUI.exe", installDir);
    }
    else {
        printf("\n\n\n****************ERROR****************\nEXTRACT NUMCUTS-GUI folder to the same directory as this file and restart!!!!");
    }
}


// Helper function for executor function
string hash_splitter(string para, int which) {
    string out;
    if (which == 1) {
        for(int i = 0; para[i] != '#'; i++)
            out += para[i];
    }
    else if (which == 2) {
        int i = 0;
        while (para[i] != '#')
            i++;
        for(int j = i + 1; j < para.length(); j++)
            out += para[j];
    }
    return out;
}


// Executes through shell using defined shortcuts in settings file
void executor(const string& address) {
    bool init = true;

    // Working part of the program
    while(init) {
        char c;

        // Read data from settings
        ifstream reader;
        reader.open((address + "settings.dat"));
        string temp[3000];
        int no_of_shortcuts = 0;
        while(getline(reader, temp[no_of_shortcuts]))
            no_of_shortcuts++;

        // Interpret data from settings file
        string dictionary[2][no_of_shortcuts];
        for (int j = 0; j < no_of_shortcuts; j++) {
            dictionary[0][j] = hash_splitter(temp[j], 1);

            // If space is there in script, put quotations around it
            for (int pos = 0; pos < dictionary[0][j].length(); pos++) {
                if (dictionary[0][j][pos] == ' '){
                    dictionary[0][j] = "\"" + dictionary[0][j] + "\"";
                    break;
                }
            }
            dictionary[1][j] = hash_splitter(temp[j], 2);
        }
        reader.close();

        for(c = 8; c <= 222; c++) {
            if(GetAsyncKeyState(c)==-32767) {
                if (GetAsyncKeyState(master_key)) {
                    if (c == '0') {
                        // Default case: Num lock + 0  to show web page
                        open_command_here("NumCutsGUI.exe", address);
                        open_command_here("Reload.bat", address);
                    }
                    else {
                        // Use settings to make shortcuts
                        for (int i = 0; i < no_of_shortcuts; i++) {
                            if (c == dictionary[1][i][0] || c == toupper(dictionary[1][i][0])) {
                                open_command_here(dictionary[0][i], address);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}


int main() {
    string install_dir = "C:\\Programs\\NumCuts\\";
    int i;
    // Settings file or GUI file not found. First run. So, install
    if (!file_exists(install_dir + "NumCutsGUI.exe")){
        system("cls");
        // Choose Master key
        cout<<("NumCuts  Copyright (C) 2020  dhi13man\n"
        "This program comes with ABSOLUTELY NO WARRANTY.\n"
        "This is free software, and you are welcome to redistribute it\n"
        "under certain conditions.");
        printf("\n\n\nWhich key do you want to hold to run Shortcuts?\n\nEnter 1 for Num Lock and 0 for Caps Lock: ");
        cin>>i;
        install_me(install_dir);

        // Set master key into a file called m_key.dat in install dir
        ofstream k_file;
        k_file.open(install_dir + "m_key.dat");
        k_file<<((i==0) ? caps_lock : num_lock);
        k_file.close();


        string key = (i==0)? "Caps Lock" : "Num Lock";
        cout<<"\n\n\n*****************INSTALLATION COMPLETE*****************\n";
        if (i==0)
            cout<<"\nDefault key changed to Caps Lock. Please only use it now, not Num Lock.";
        cout<<("\nPress " + key + " + 0 to open the configuring GUI anytime.");
        cin.ignore();
        cin.ignore();
        open_command_here("Reload.bat", install_dir);
        return(0);
    }

    // Program has been installed and been run before
    // Read Master Key
    ifstream k_file;
    k_file.open(install_dir + "m_key.dat");
    k_file>>i;
    k_file.close();
    master_key = i;

    // Start working
    StealthMode();
    executor(to_char_arr(install_dir));

    return 0;
}
