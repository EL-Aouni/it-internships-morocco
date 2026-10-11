# 🇲🇦 IT Internships Morocco

A web application helping Moroccan IT students find internship opportunities across the country.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![tRPC](https://img.shields.io/badge/tRPC-10-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

##  Features

-  **Smart Search** - Filter by city, IT specialty, and priority
-  **94+ Companies** - Comprehensive database across Morocco
-  **18 Cities** - From Casablanca to Oujda
-  **15 IT Specialties** - Cybersecurity, Web Dev, Cloud, AI/ML, and more
-  **One-Click Copy** - Copy email addresses instantly
-  **Fully Responsive** - Works on all devices
-  **Real-Time** - Instant search results with tRPC
- **People Finder** - Find practitioners, HR contacts and alumni by specialty (pentest/SQLi, data protection, SOC/SIEM, cloud, GRC...)
- **Message Drafts** - Short connection notes and follow-ups in French or English
- **Contact Tracker** - Track every outreach, import and export CSV

##  Quick Start

### Prerequisites

- Node.js 18+ 

### Site

 **Open your browser**
   
   Navigate to https://el-aouni.github.io/it-internships-morocco/

##  Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **API**: tRPC for type-safe APIs
- **Database**: MySQL
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: TanStack Query


##  Features in Detail

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


### Seeded Data

The database comes with:
- **94 companies** across Morocco
- **18 cities**: Casablanca, Rabat, Marrakech, Fès, Tangier, and more
- **15 IT specialties**: Web Dev, Cybersecurity, Cloud, AI/ML, Mobile, DevOps, etc.


### People Finder

Available at `/people`. It helps you reach the right person before you apply.

1. **Set your profile and goal**: name, school, internship type, target field, and what you want to ask (advice, HR contact, right team, or alumni advice).
2. **Find people**: choose who to look for (practitioners, HR/recruiters, managers, alumni), plus an optional company and city. The page builds:
   - a LinkedIn people search
   - a Google `site:linkedin.com/in` search (works without a LinkedIn account)
   - a search for hiring posts from the last 30 days
   - the company page search
3. **Copy a message**: a connection note (with a character counter for the 200-character free-account limit) and a longer follow-up for after they accept, in French or English. You can edit any message before copying.
4. **Track contacts**: import a CSV or add contacts manually, set a status (New, Request sent, Connected, Messaged, Replied, Lead obtained, Closed), add notes, and export to CSV.

**CSV columns recognised on import** (header names are matched loosely): `Contact name`, `Company`, `Public role / relevance noted`, `LinkedIn URL`, `Priority`, `Follow-up / notes`, `Status`.

#### Privacy and fair use

- The tool does **not** scrape LinkedIn or call any LinkedIn API. It only generates search URLs that you open yourself.
- Nothing is sent automatically. You read, personalise and send every message yourself.
- Contacts and settings are stored in your browser (`localStorage`) only. Nothing is sent to a server.
- Do not commit CSV files containing real people's data to this repository.
- Please be respectful: send a small number of personalised messages rather than mass messaging, and follow LinkedIn's User Agreement.

  
##  Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Adding Companies

To add new companies, edit `scripts/companies.sql` and add INSERT statements.

##  License

This project is open source and available under the MIT License.

##  Author

**EL-Aouni**
- GitHub: [@EL-Aouni](https://github.com/EL-Aouni)

##  Acknowledgments

- Built with ❤️ for Moroccan IT students
- Thanks to all companies contributing to Morocco's tech ecosystem

##  Contact

For questions or suggestions:
- Open an [issue](https://github.com/EL-Aouni/it-internships-morocco/issues)
- Reach out on GitHub

---

** If this project helped you, please give it a star!**

Made in Morocco 🇲🇦
