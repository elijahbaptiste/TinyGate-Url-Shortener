# TinyGate - URL Shortener Web App

## Overview
TinyGate is a simple and efficient URL shortener built with Node.js, Express, and MongoDB. This web app allows users to generate shortened URLs and track usage analytics.

## Features
- ✂️ **Generate short links** for long URLs.
- 🔗 **Custom short URLs** for branding purposes.
- 📊 **Click tracking** to monitor usage statistics.
- 🗑 **Auto-expiring links** to manage temporary URLs.
- 🚀 **Scalable and lightweight** design.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Tools**: Mongoose, dotenv, shortid

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/tinygate.git
   ```
2. Navigate to the project directory:
   ```sh
   cd tinygate
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   BASE_URL=http://localhost:5000
   ```
5. Start the server:
   ```sh
   npm start
   ```

## Usage
- Visit `http://localhost:5000` and enter a long URL.
- Click **Shorten** to generate a short link.
- Use the short URL to redirect to the original link.
- View analytics on link usage.

## Roadmap
- [ ] Add website blacklist to block websites with harmful content
- [ ] Host the website online
- [ ] Add custom short urls
- [ ] Copy Button for generated short links
- [ ] Dark Mode Toggle

## Contributing
Contributions are welcome! Please open an issue to discuss changes before submitting a PR.

## License
MIT License. See `LICENSE` for details.

## Contact
For support, contact elijahbaptiste79@gmail.com or open an issue on GitHub.

---

> *"Shorten your links, simplify your sharing."*

