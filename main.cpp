#include <io.h>
#include <windows.h>
#include <winuser.h>
#include <fstream>
#include <cstring>
#include "cstdlib"

using namespace std;

// TODO GUI

#define num_lock 0x90
#define shift 0x10


// Keeps main terminal window hidden after first run
void StealthMode(){
    HWND stealth;
    AllocConsole();
    stealth = FindWindowA("ConsoleWindowClass",nullptr);
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
    p << "echo off\n";
    p << "cd " + here + "\n";
    p <<  "start \"\" " + command;
    p.close();
    system(to_char_arr(here + "exec.bat"));
    remove("exec.bat");
}


// Installing this program(Requires the GUI app folder in same directory as this)
void install_me(const string& installDir) {
    // Create the folder at install location
    char *temp = to_char_arr(installDir);
    mkdir(temp);

    // Copy GUI folder to install directory
    system(to_char_arr("robocopy Numcuts-gui " + installDir + " /MIR"));

    // Set working directory to install directory
    system(to_char_arr("copy Numcuts.exe " + installDir));
    open_command_here("NumCutsGUI.exe", installDir);
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
    ifstream reader;

    // Read data from settings file
    reader.open((address + "settings.dat"));
    string temp[3000];
    int no_of_shortcuts = 0;
    while(getline(reader, temp[no_of_shortcuts]))
        no_of_shortcuts++;
    
    // Interpret data from settings file
    string dictionary[2][no_of_shortcuts];
    for (int j = 0; j < no_of_shortcuts; j++) {
        dictionary[0][j] = hash_splitter(temp[j], 1);
        dictionary[1][j] = hash_splitter(temp[j], 2);
    }

    // Working part of the program
    while(init) {
        char c;
        for(c = 8; c <= 222; c++) {
            if(GetAsyncKeyState(c)==-32767) {
                if (GetAsyncKeyState(num_lock)) {
                    if (c == '0') {
                        // Default case: Num lock + 0  to show web page
                        open_command_here("NumCutsGUI.exe", address);
                        Sleep(300);
                    }
                    else {
                        // Use settings to make shortcuts
                        for (int i = 0; i < no_of_shortcuts; i++) {
                            if (c == dictionary[1][i][0] || c == toupper(dictionary[1][i][0])) {
                                open_command_here(dictionary[0][i], address);
                                Sleep(300);
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
    string install_dir = "C:\\SCRunner\\";
    fstream p;
    p.open((install_dir + ("settings.dat")), ios::in);

    // Settings file not found. First run. So, install
    if (!p){
        install_me(install_dir);
        printf("\n\nFrom next run on, press Num-lock + 0 to open configuration page anytime! \nPress enter to exit.");
        scanf("cxc");
        exit(1);
    }

    // Program has been installed and been run before
    StealthMode();
    executor(install_dir);

    return 0;
}