cmake_minimum_required(VERSION 3.15)
project(shrtcut_runner)

set(CMAKE_CXX_STANDARD 14)

add_executable(shrtcut_runner main.cpp referencecode_keylogger.cpp)