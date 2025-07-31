## Currency Converter Application

**Overview**

This is a Currency Converter web application that allows users to convert amounts between different currencies in real-time. It fetches live exchange rates from the ExchangeRate-API and displays country flags via FlagCDN for better user experience. The app is containerized with Docker and deployed on two web servers with traffic balanced by HAProxy.


Docker Hub Image
Image name: lionelisthename/currency-converter

Tag: v1

Docker Hub URL: https://hub.docker.com/r/lionelisthename/currency-converter

Part 1: Local Development and Testing
Build the Docker image locally

docker build -t lionelisthename/currency-converter:v1 .
Run the app locally (map container port 80 to localhost 8080)

docker run -d -p 8080:80 --name currency-converter-local lionelisthename/currency-converter:v1
Verify the app is running
Open your browser and visit:



http://localhost:8080
Or use curl:


curl http://localhost:8080
Part 2: Push to Docker Hub
Log in to Docker Hub

docker login
Push the image

docker push lionelisthename/currency-converter:v1
Part 3: Deployment on web-01 and web-02
SSH into the web servers

ssh ubuntu@localhost -p 2211  # web-01
ssh ubuntu@localhost -p 2212  # web-02
Pull the Docker image on each server

sudo docker pull lionelisthename/currency-converter:v1
Run the container on each server

sudo docker run -d --restart unless-stopped -p 8080:80 --name currency-converter-app lionelisthename/currency-converter:v1
Verify app is running on each server
From inside each server, run:


curl http://localhost:8080
Part 4: Configure Load Balancer on lb-01
SSH into the load balancer

ssh ubuntu@localhost -p 2210
Install HAProxy

sudo apt update && sudo apt install -y haproxy
Edit HAProxy config file
Open /etc/haproxy/haproxy.cfg and configure as follows:

pgsql
Copy
Edit
global
    daemon
    maxconn 256

defaults
    mode http
    timeout connect 5s
    timeout client  50s
    timeout server  50s

frontend http-in
    bind *:80
    default_backend webapps

backend webapps
    balance roundrobin
    server web01 172.20.0.11:8080 check
    server web02 172.20.0.12:8080 check
    http-response set-header X-Served-By %[srv_name]
Reload HAProxy configuration

sudo haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg
Part 5: Verify Load Balancer
From your host machine, run:


curl -I http://localhost:8082
Run multiple times and observe the X-Served-By header switching between web01 and web02, confirming load balancing.

Optional: Handling API Keys
Store API keys in environment variables.

Pass keys to your container at runtime using -e flags.

Do NOT hardcode API keys inside your Docker image or source code.

Summary
The app runs on web-01 and web-02 containers on port 8080.

HAProxy on lb-01 listens on port 80 and load balances traffic between the two web servers.

Docker image is publicly available on Docker Hub.

This setup ensures high availability and load distribution for the Currency Converter app.
