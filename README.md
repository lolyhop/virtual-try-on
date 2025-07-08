# Virtual Try-On Studio

A luxury virtual try-on application built with Next.js and React, featuring an immersive experience for discovering and trying on high-end fashion items from brands like Gucci, Versace, and Prada.

## ✨ Features

- **Brand Recommendations (Home)**: Browse and virtually try on luxury brand items with side-by-side comparison
- **Brand Showcase**: Explore curated luxury fashion by category with prices and brand information
- **AI Creator**: Generate custom outfits using AI with personalized preferences
- **Saved Outfits**: View and manage your collection of favorite looks
- **Virtual Try-On Technology**: Advanced simulation with color-matched backgrounds and fitting indicators

## 🏗️ Tech Stack

- **Frontend**: Next.js 15.3.5 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with custom gradients and animations
- **Database**: JSON-based storage for clothing items and user data
- **Deployment**: Docker & Docker Compose ready
- **Images**: Local asset management with optimized loading

## 🚀 Quick Start (Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🐳 Docker Deployment

### Prerequisites

- Docker and Docker Compose installed on your system
- At least 2GB RAM available for containers

### Production Deployment

1. **Clone the repository** (if not already done)
```bash
git clone <your-repo-url>
cd virtual-try-on
```

2. **Build and run with Docker Compose**
```bash
# Build and start the application
docker-compose up --build -d

# View logs (optional)
docker-compose logs -f virtual-try-on
```

3. **Access the application**
- Main app: [http://localhost:3000](http://localhost:3000)
- Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Production with Nginx (Recommended)

For production environments with load balancing and SSL:

```bash
# Start with nginx reverse proxy
docker-compose --profile production up --build -d

# Access via nginx
# HTTP: http://localhost:80
# HTTPS: https://localhost:443 (requires SSL setup)
```

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build -d

# View logs
docker-compose logs -f [service-name]

# Check service status
docker-compose ps

# Access container shell
docker-compose exec virtual-try-on sh
```

### Environment Configuration

Create a `.env.local` file for custom environment variables:

```env
# .env.local
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000

# Add your custom environment variables here
# API_URL=https://your-api.com
# DATABASE_URL=your-database-url
```

### Health Monitoring

The application includes health checks:
- **Endpoint**: `/api/health`
- **Docker Health Check**: Automatic container health monitoring
- **Nginx Health**: Available at `/health` when using nginx profile

Example health response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "memory": {
    "used": 45,
    "total": 128
  }
}
```

## 📁 Project Structure

```
virtual-try-on/
├── app/
│   ├── page.tsx              # Brand Recommendations (Landing)
│   ├── gallery/              # Brand Showcase
│   ├── new-outfit/           # AI Creator
│   ├── generate/             # Redirects to home
│   └── api/
│       ├── clothing/         # Clothing data API
│       └── health/           # Health check endpoint
├── data/
│   ├── clothing.json         # Luxury brand items database
│   └── images/               # Local fashion images
├── public/
│   └── data/images/          # Public image assets
├── docker-compose.yml        # Multi-service Docker setup
├── Dockerfile               # Optimized Next.js container
├── nginx.conf               # Production reverse proxy config
└── .dockerignore            # Docker build optimization
```

## 🎨 Key Features Explained

### Virtual Try-On Process
1. Select any luxury item from the sidebar
2. View detailed brand information and pricing
3. Click "Virtual Try-On" to see AI simulation
4. Compare original vs. try-on result side-by-side
5. Save favorites or add to cart

### Brand Integration
- **Gucci**: Red-pink color themes with luxury pricing
- **Versace**: Purple-black sophisticated styling
- **Prada**: Blue-gray minimalist aesthetics
- Custom brand badges and price displays

### AI Features
- Intelligent outfit generation based on preferences
- Color-matched background simulation
- Perfect fit indicators
- Style recommendations

## 🔧 Development

### Local Development
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checks
```

### Docker Development
```bash
# Development with auto-reload
docker-compose -f docker-compose.dev.yml up

# Production testing locally
docker-compose up --build
```

## 🌐 Production Deployment

### Manual Production Setup
1. Configure your domain in `nginx.conf`
2. Add SSL certificates to `./ssl/` directory
3. Update environment variables
4. Run with production profile:

```bash
docker-compose --profile production up -d
```

### Scaling
```bash
# Scale the main application
docker-compose up --scale virtual-try-on=3 -d

# With load balancer
docker-compose --profile production up --scale virtual-try-on=3 -d
```

## 📊 Performance Features

- **Multi-stage Docker builds** for optimized image size
- **Nginx reverse proxy** with gzip compression
- **Rate limiting** for API protection
- **Static asset caching** for faster load times
- **Health checks** for container monitoring
- **Standalone output** for minimal production bundles

## 🛠️ Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check what's using port 3000
lsof -i :3000

# Use different port
PORT=3001 docker-compose up
```

**Build fails:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

**Container health check fails:**
```bash
# Check container logs
docker-compose logs virtual-try-on

# Test health endpoint manually
curl http://localhost:3000/api/health
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ using Next.js, Docker, and modern web technologies.**
