# CURRENCY CONVERTER

## Overview

this is a simple **Currency converter** that allows users to convert amounts between different currencies using live exchange rates from the ExchangeRate-API. and it also provide the latest news about currencies using the NewsAPI.

## Features

1.Select currencies from dropdown menus with their respective country flags
2.Enter any amount of money to convert it between the chosen currencies
3.Currency news feed
4.Offline detection for user-friendly messaging

## Deployment Setup

**Server Setup**

1.The app runs inside Nginx web servers (web01 and web02), each serving the app on port 80.

2.A Load Balancer (lb-01) is configured with HAProxy to distribute HTTP requests in a round-robin fashion between the two Nginx servers.

3.HAProxy configuration adds a header X-Served-By to identify which backend server handled the request.

**Access**
-The app is accessible through the load balancer IP or hostname, which forwards requests to the backend servers.

-You can test directly on each backend using their IPs or localhost with assigned ports (e.g., http://localhost:8080 for web01,http://localhost:8081 for web02,http://localhost:8082 for load balancer).

**How to Run Locally**

Clone the repository:

bash
Copy
Edit
git clone <your-repo-url>
cd <project-folder>
Build the Docker image:

bash
Copy
Edit
docker build -t currency-converter .
Run the container locally:

bash
Copy
Edit
docker run -d -p 8080:80 currency-converter
Open your browser and navigate to:

arduino
Copy
Edit
http://localhost:8080

**what i used**
1.HTML,CSS,JAVASCRIPT
2.NGINX(server)
3.HAProxy (load balancer)
4.Docker (containerization)
5.ExchangeRate-API (currency rates)
6.NewsAPI (currency news)

## Challenges

-Dynamically loading and displaying correct country flags for each currency.


