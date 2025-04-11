# Islamic Education Portal

A comprehensive bilingual (English/Somali) educational platform focused on Islamic knowledge, refutations, and community Q&A.

## 🌟 Features

- **Bilingual Content**: Full support for both English and Somali languages
- **Educational Library**: Structured categories of Islamic educational content
- **Refutations Section**: Articles addressing misconceptions about Islam
- **Community Q&A**: Ask questions and receive detailed responses
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Theme Customization**: Light and dark mode support
- **Collaboration Features**: Real-time indicators of other users viewing the same content

## 📋 Project Structure

```
islamic-education-portal/
├── client/               # Frontend code
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # React context providers
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and types
│   │   ├── pages/        # Page components
├── server/               # Backend code
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage implementation
│   ├── vite.ts           # Vite configuration for server
├── shared/               # Shared between client and server
│   ├── schema.ts         # Database schema and types
```

## 🛠️ Technology Stack

### Frontend
- **React**: UI library
- **Typescript**: Type safety
- **Tailwind CSS**: Styling
- **Shadcn/UI**: Component library
- **React Query**: Data fetching and caching
- **Wouter**: Routing
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Backend
- **Node.js**: Runtime
- **Express**: Web framework
- **Drizzle ORM**: Database ORM
- **PostgreSQL**: Database

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
```
git clone https://github.com/your-username/islamic-education-portal.git
cd islamic-education-portal
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with:
```
DATABASE_URL=postgresql://username:password@localhost:5432/db_name
```

4. Run the development server
```
npm run dev
```

The application will be available at http://localhost:3000.

## 📝 Multilingual Support

The application supports both English and Somali languages. Content is stored in the database with both language versions, and the user can toggle between languages using the language selector in the navigation bar.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.