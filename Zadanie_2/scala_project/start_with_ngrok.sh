#!/bin/bash

docker run -d --name scala_project -p 9000:9000 scala_project:latest

ngrok http 9000