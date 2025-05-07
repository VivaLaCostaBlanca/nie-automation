# Use official Node image with Debian base
FROM node:20-slim

# Install Firefox, Geckodriver, and required dependencies
RUN apt-get update && apt-get install -y \
    firefox-esr \
    wget \
    gnupg \
    curl \
    ca-certificates \
    xvfb \
    libgtk-3-0 \
    libdbus-glib-1-2 \
    libxt6 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libnss3 \
    libxss1 \
    libxtst6 \
    fonts-liberation \
    libappindicator1 \
    libappindicator3-1 \
    xdg-utils \
    unzip \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Download and install the latest Geckodriver
RUN GECKO_VER=$(curl -s https://api.github.com/repos/mozilla/geckodriver/releases/latest | grep 'tag_name' | cut -d\" -f4) && \
    wget -O /tmp/geckodriver.tar.gz "https://github.com/mozilla/geckodriver/releases/download/$GECKO_VER/geckodriver-$GECKO_VER-linux64.tar.gz" && \
    tar -xzf /tmp/geckodriver.tar.gz -C /usr/local/bin && \
    chmod +x /usr/local/bin/geckodriver && \
    rm /tmp/geckodriver.tar.gz

# Create app directory
WORKDIR /app

# Copy project files into the container
COPY . .

# Install Node dependencies
RUN npm install

# Start the app (replace if your entry file is different)
CMD ["node", "index.js"]
 
