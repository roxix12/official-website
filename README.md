# 🚀 CDW Burhan Portfolio - Full-Stack Developer Portfolio

A modern, responsive portfolio website built with React and Supabase, featuring a complete admin panel for content management.

## ✨ Features

### 🎨 Frontend (Main Website)
- **Modern React Architecture** - Built with Vite for optimal performance
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Components** - Smooth animations and user interactions
- **SEO Optimized** - Meta tags, structured data, and performance optimization
- **Blog System** - Dynamic blog with categories, tags, and search
- **Project Showcase** - Portfolio gallery with filtering and previews
- **Newsletter Integration** - Automated email notifications for subscribers
- **Contact Forms** - Multiple contact methods with form validation
- **Real-time Comments** - Comment system with moderation

### 🛠️ Admin Panel
- **Content Management** - Full CMS for all website content
- **Blog Management** - Create, edit, and publish blog posts
- **Project Management** - Manage portfolio projects with media
- **Newsletter Management** - Subscriber management and email campaigns
- **Analytics Dashboard** - Track website performance and engagement
- **Media Library** - Upload and manage images and assets
- **Settings Panel** - Site-wide configuration and customization

### 🔧 Backend & Database
- **Supabase Integration** - PostgreSQL database with real-time features
- **Authentication System** - Secure admin authentication
- **File Storage** - Image and media file management
- **Email System** - Automated notifications and newsletters
- **API Integration** - RESTful APIs for all data operations

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database
- **Row Level Security** - Database security policies
- **Real-time Subscriptions** - Live data updates

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Vercel** - Deployment platform

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cdw_burhan_portfolio.git
   cd cdw_burhan_portfolio
   ```

2. **Install dependencies**
   ```bash
   # Main website
   npm install
   
   # Admin panel
   cd admin-panel
   npm install
   cd ..
   ```

3. **Set up environment variables**
   
   Create `.env` files in both root and `admin-panel` directories:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   Run the main database setup file in your Supabase SQL editor:
   ```sql
   -- Run FIX_ALL_DATABASE_ERRORS.sql
   ```

5. **Start development servers**
   ```bash
   # Main website (port 5173)
   npm run dev
   
   # Admin panel (port 5174)
   cd admin-panel
   npm run dev
   ```

## 📁 Project Structure

```
cdw_burhan_portfolio/
├── admin-panel/          # Admin panel React app
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/       # Admin pages
│   │   ├── services/    # API services
│   │   └── contexts/    # React contexts
├── database/            # SQL setup files
├── docs/               # Documentation
├── public/             # Static assets
├── src/                # Main website React app
│   ├── components/     # Reusable components
│   ├── pages/         # Website pages
│   ├── services/      # API services
│   └── styles/        # CSS styles
└── README.md          # This file
```

## 🔧 Configuration

### Database Setup
1. Create a new Supabase project
2. Run `FIX_ALL_DATABASE_ERRORS.sql` in the SQL editor
3. Configure Row Level Security policies
4. Set up storage buckets for media files

### Email Configuration
1. Configure SMTP settings in Supabase
2. Set up email templates
3. Configure newsletter automation

## 🚀 Deployment

### Main Website
```bash
npm run build
# Deploy to Vercel, Netlify, or your preferred platform
```

### Admin Panel
```bash
cd admin-panel
npm run build
# Deploy to a secure subdomain
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**CDW Burhan** - Full-Stack Developer
- Website: [Your Website URL]
- Email: cdwburhan@gmail.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

## 🙏 Acknowledgments

- Thanks to the React and Supabase communities
- Inspiration from modern portfolio designs
- Open source libraries that made this possible

---

⭐ If you found this project helpful, please give it a star on GitHub!
