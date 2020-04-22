#include <io.h>
#include <windows.h>
#include <winuser.h>
#include <fstream>
#include <unistd.h>

using namespace std;

#define num_lock 0x90
#define shift 0x10


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
    p << "echo off\n";
    p << "cd " + here + "\n";
    p <<  "start \"\" " + command + "\n";
    p.close();
    system(to_char_arr(here + "exec.bat"));
    remove("exec.bat");
}


// Check if file exists
bool if_exists(const string& file_address) {
    ifstream file;
    file.open(to_char_arr(file_address));
    return !!file;
}


// Installing this program(Requires the GUI app folder in same directory as this)
void install_me(const string& installDir) {

    // Copy GUI folder to install directory
    system(to_char_arr("robocopy Numcuts-gui " + installDir + " /MIR"));

    // Set working directory to install directory
    system(to_char_arr("copy Numcuts.exe " + installDir));
    open_command_here(installDir + "NumCutsGUI.exe", installDir);
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
                if (GetAsyncKeyState(num_lock)) {
                    if (c == '0') {
                        // Default case: Num lock + 0  to show web page
                        open_command_here(address + "NumCutsGUI.exe", address);
                        open_command_here(address + "Reload.bat", address);
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
    string install_dir = "C:\\SCRunner\\";

    // Settings file or GUI file not found. First run. So, install
    if (!if_exists(install_dir + "NumCutsGUI.exe")){
        install_me(install_dir);
        printf("\n\n\n*****************INSTALLATION COMPLETE*****************\n\nPress Num Lock + 0 to open the GUI configurer anytime.\nEnter 0 to exit, 1 to continue: ");
        int i;
        scanf("%d", &i);
        if (i==0)
            exit(0);
    }

    // Program has been installed and been run before
    StealthMode();
    executor(to_char_arr(install_dir));

    return 0;
}