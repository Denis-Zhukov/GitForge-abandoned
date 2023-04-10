@echo off
cd "./client"
start /b "" cmd /c "npm i"
cd "../server"
start /b "" cmd /c "npm i"