# Use official Nginx image as base
FROM nginx:alpine

# Copy your entire project (HTML, CSS, JS) into Nginx's web root
COPY . /usr/share/nginx/html

