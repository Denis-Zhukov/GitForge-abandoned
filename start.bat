@echo off
cd "./client"
start cmd /k "title Client GitForge && npm start"
cd "../server"
start cmd /k "title Server GitForge && npm start"