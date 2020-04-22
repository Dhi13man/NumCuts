cmake_minimum_required(VERSION 3.16)
project(NumCuts)

set(CMAKE_CXX_STANDARD 17)

# Add main.cpp file of project root directory as source file
set(SOURCE_FILES NumCuts.cpp)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${GCC_COVERAGE_COMPILE_FLAGS} -static-libstdc++" )

# Add executable target with source files listed in SOURCE_FILES variable
add_executable(NumCuts NumCuts.cpp)