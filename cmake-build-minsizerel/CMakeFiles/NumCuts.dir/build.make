# CMAKE generated file: DO NOT EDIT!
# Generated by "MinGW Makefiles" Generator, CMake Version 3.16

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

SHELL = cmd.exe

# The CMake executable.
CMAKE_COMMAND = "D:\Program Files\JetBrains\apps\CLion\ch-0\201.7223.86\bin\cmake\win\bin\cmake.exe"

# The command to remove a file.
RM = "D:\Program Files\JetBrains\apps\CLion\ch-0\201.7223.86\bin\cmake\win\bin\cmake.exe" -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts"

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts\cmake-build-minsizerel"

# Include any dependencies generated for this target.
include CMakeFiles/NumCuts.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/NumCuts.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/NumCuts.dir/flags.make

CMakeFiles/NumCuts.dir/NumCuts.cpp.obj: CMakeFiles/NumCuts.dir/flags.make
CMakeFiles/NumCuts.dir/NumCuts.cpp.obj: ../NumCuts.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir="C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts\cmake-build-minsizerel\CMakeFiles" --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/NumCuts.dir/NumCuts.cpp.obj"
	D:\mingw\bin\g++.exe  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles\NumCuts.dir\NumCuts.cpp.obj -c "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts\NumCuts.cpp"

CMakeFiles/NumCuts.dir/NumCuts.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/NumCuts.dir/NumCuts.cpp.i"
	D:\mingw\bin\g++.exe $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts\NumCuts.cpp" > CMakeFiles\NumCuts.dir\NumCuts.cpp.i

CMakeFiles/NumCuts.dir/NumCuts.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/NumCuts.dir/NumCuts.cpp.s"
	D:\mingw\bin\g++.exe $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts\NumCuts.cpp" -o CMakeFiles\NumCuts.dir\NumCuts.cpp.s

# Object files for target NumCuts
NumCuts_OBJECTS = \
"CMakeFiles/NumCuts.dir/NumCuts.cpp.obj"

# External object files for target NumCuts
NumCuts_EXTERNAL_OBJECTS =

NumCuts.exe: CMakeFiles/NumCuts.dir/NumCuts.cpp.obj
NumCuts.exe: CMakeFiles/NumCuts.dir/build.make
NumCuts.exe: CMakeFiles/NumCuts.dir/linklibs.rsp
NumCuts.exe: CMakeFiles/NumCuts.dir/objects1.rsp
NumCuts.exe: CMakeFiles/NumCuts.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir="C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts\cmake-build-minsizerel\CMakeFiles" --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable NumCuts.exe"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\NumCuts.dir\link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/NumCuts.dir/build: NumCuts.exe

.PHONY : CMakeFiles/NumCuts.dir/build

CMakeFiles/NumCuts.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles\NumCuts.dir\cmake_clean.cmake
.PHONY : CMakeFiles/NumCuts.dir/clean

CMakeFiles/NumCuts.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts" "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts" "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts\cmake-build-minsizerel" "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts\cmake-build-minsizerel" "C:\Users\dhi13man\Desktop\Work shit\CLion-workspace\NumCuts\cmake-build-minsizerel\CMakeFiles\NumCuts.dir\DependInfo.cmake" --color=$(COLOR)
.PHONY : CMakeFiles/NumCuts.dir/depend

