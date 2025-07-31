## Currency Converter Application

**Overview**

This is a Currency Converter web application that allows users to convert amounts between different currencies in real-time. It fetches live exchange rates from the ExchangeRate-API and displays country flags via FlagCDN for better user experience. The app is containerized with Docker and deployed on two web servers with traffic balanced by HAProxy.

**Docker Image Details**

**Docker Hub Repository**: https://hub.docker.com/r/lionelisthename/currency-converter

**Image Name:** lionelisthename/currency-converter

**Tags**: v1, latest

**Build Instructions (Local)**

To build the Docker image locally, run the following commands in your project directory:

# Clone the repository (if not already cloned)

git clone https://github.com/lionelisthename/currency-converter.git

cd currency-converter

# Build the Docker image with tag 'v1'

docker build -t lionelisthename/currency-converter:v1 .

# Optionally tag the image as 'latest'

docker tag lionelisthename/currency-converter:v1 lionelisthename/currency-converter:latest

# Run Instructions (On Web01 & Web02)

SSH into each server and run the following commands to pull and run the Docker image:


# Pull the latest image from Docker Hub

docker pull lionelisthename/currency-converter:latest


# Run the container with restart policy and port mapping

docker run -d --name currency-app --restart unless-stopped -p 8080:8080 lionelisthename/currency-converter:latest

Your application will be accessible internally at:

http://web-01:8080

http://web-02:8081

# Load Balancer Configuration (Lb01)

Edit /etc/haproxy/haproxy.cfg or the mounted HAProxy config file on the load balancer server to include the following backend section:

backend webapps
    balance roundrobin
    server web01 172.20.0.11:8080 check
    server web02 172.20.0.12:8080 check
    
Reload HAProxy without downtime by running:

docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg'
This configuration will distribute incoming requests evenly (round-robin) between Web01 and Web02.

# Testing Load Balancing

From your host machine or any client, test the load balancer by sending multiple requests:

curl http://<load-balancer-ip>:<port>

Repeat the curl command several times. The responses should alternate between the two web servers, confirming round-robin load balancing is working correctly.

# Handling Secrets (Hardening)

API keys are not baked into the Docker image.

Use environment variables to pass sensitive information at runtime:


docker run -d --name currency-app --restart unless-stopped -p 8080:8080 \
-e API_KEY="your_api_key_here" lionelisthename/currency-converter:latest

This keeps secrets secure and separate from the image source code and repository.

#Application Features & Purpose

1.Real-time currency conversion using ExchangeRate-API

2.Country flags displayed using FlagCDN

3.User-friendly interface with dropdowns, amount input, and swap functionality

4.Error handling for API downtime with offline fallback messages

5,Clear data presentation with interactive user input

#Credits

ExchangeRate-API for live exchange rates: https://www.exchangerate-api.com

FlagCDN for country flags: https://flagcdn.com

#Challenges & Solutions

1.Handling dynamic loading of flags for multiple currencies

2.Managing API key securely without exposing it in the public repository

3.Ensuring smooth load balancing and session handling between containers
