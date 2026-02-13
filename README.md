# 🇲🇦 IT Internships Morocco

A full-stack web application helping Moroccan IT students find internship opportunities across the country.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![tRPC](https://img.shields.io/badge/tRPC-10-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

- 🔍 **Smart Search** - Filter by city, IT specialty, and priority
- 🏢 **94+ Companies** - Comprehensive database across Morocco
- 🌍 **18 Cities** - From Casablanca to Oujda
- 💼 **15 IT Specialties** - Cybersecurity, Web Dev, Cloud, AI/ML, and more
- 📧 **One-Click Copy** - Copy email addresses instantly
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Real-Time** - Instant search results with tRPC

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MySQL database (or PlanetScale account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EL-Aouni/it-internships-morocco.git
   cd it-internships-morocco
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your database URL:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/cyber_internships"
   ```

4. **Create database and import data**
   ```bash
   # Create the database
   mysql -u root -p -e "CREATE DATABASE cyber_internships;"
   
   # Import the schema and seed data
   mysql -u root -p cyber_internships < scripts/companies.sql
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **API**: tRPC for type-safe APIs
- **Database**: MySQL
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: TanStack Query

## 🗂️ Project Structure

```
it-internships-morocco/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/trpc/          # tRPC API routes
│   │   ├── search/            # Search page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # UI components
│   │   └── trpc-provider.tsx # tRPC client provider
│   ├── lib/                   # Utilities
│   │   ├── db.ts              # Database connection
│   │   ├── trpc.ts            # tRPC client
│   │   └── utils.ts           # Helper functions
│   └── server/                # Backend code
│       ├── routers/           # tRPC routers
│       │   └── companies.ts   # Companies router
│       ├── index.ts           # Main router
│       └── trpc.ts            # tRPC initialization
├── scripts/
│   └── companies.sql          # Database seed file
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎯 Features in Detail

### Search & Filter
- Filter by 18 Moroccan cities
- Filter by 15 IT specialties
- Priority-based filtering (High/Medium/Low)
- Real-time results

### Company Information
Each company card shows:
- Company name and description
- Location (city)
- IT specialty
- Contact email with copy button
- Phone number
- Website link
- Priority indicator

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Add environment variable: `DATABASE_URL`
   - Deploy!

3. **Set up Database (PlanetScale)**
   - Create account at [planetscale.com](https://planetscale.com)
   - Create database
   - Import `scripts/companies.sql`
   - Copy connection string to Vercel

See full deployment guide in `DEPLOYMENT_GUIDE.md`

## 📊 Database

### Companies Table Schema

```sql
CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  speciality VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(255),
  priority ENUM('high', 'medium', 'low'),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_city (city),
  INDEX idx_speciality (speciality),
  INDEX idx_priority (priority)
);
```

### Seeded Data

The database comes with:
- **94 companies** across Morocco
- **18 cities**: Casablanca, Rabat, Marrakech, Fès, Tangier, and more
- **15 IT specialties**: Web Dev, Cybersecurity, Cloud, AI/ML, Mobile, DevOps, etc.

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Adding Companies

To add new companies, edit `scripts/companies.sql` and add INSERT statements.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**EL-Aouni**
- GitHub: [@EL-Aouni](https://github.com/EL-Aouni)

## 🙏 Acknowledgments

- Built with ❤️ for Moroccan IT students
- Thanks to all companies contributing to Morocco's tech ecosystem

## 📧 Contact

For questions or suggestions:
- Open an [issue](https://github.com/EL-Aouni/it-internships-morocco/issues)
- Reach out on GitHub

---

**⭐ If this project helped you, please give it a star!**

Made with ☕ in Morocco 🇲🇦
