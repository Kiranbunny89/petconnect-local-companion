# 🐾 PetConnect - Find Your Perfect Pet

**PetConnect** is a modern React-based web application designed to connect loving pets with their forever homes. Built with **TypeScript** and powered by **Vite**, the platform provides a seamless experience for pet adoption and listings.

---

## 🌐 Live Website

🔗 **Visit PetConnect**: [https://unique-lolly-3f60b6.netlify.app](https://unique-lolly-3f60b6.netlify.app)

---

## ✨ Features

### 🏠 User Experience
- Beautiful landing page with hero section
- Grid view of all available pets with detailed profiles
- Advanced search: filter by breed, age, gender, and location
- Pet details including health records
- Direct contact with pet owners/shelters

### 🔐 Authentication & Profiles
- Secure user registration & login
- Profile management and preferences
- Protected routes for logged-in users

### 📝 Pet Management
- Add pet listings with form validation
- AI-powered pet listing validator
- Image support and pet galleries
- Vaccination and health status info

### 🎨 Design & UI
- Warm, pet-themed color palette
- Fully responsive layout
- Built with `shadcn/ui` and Radix UI
- Smooth, modern animations

---

## 🛠️ Technology Stack

### Frontend
- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**

### UI Components
- **shadcn/ui**
- **Radix UI**
- **Lucide React**
- **React Hook Form**

### State & Data
- **TanStack Query**
- **localStorage**
- **Zod** for schema validation

### Development Tools
- **ESLint**
- **Hot Reload**
- **Type checking with TypeScript**

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Kiranbunny89/petconnect-local-companion.git
cd petconnect-local-companion

# Install dependencies
npm install

# Run the development server
npm run dev

# Open in browser
http://localhost:8080
```

### Build for Production

```bash
npm run build
```

---

## 📱 Pages & Features

| Page             | Description                  | Features                                           |
|------------------|------------------------------|----------------------------------------------------|
| **Home**         | Landing page                 | Hero section, testimonials, featured pets         |
| **All Pets**     | Browse available pets        | Grid, filters, pagination                          |
| **Pet Details**  | Individual pet profiles      | Photos, health info, contact                      |
| **Add Pet**      | List a new pet               | Form with validation and image upload              |
| **Profile**      | User dashboard               | Manage profile, favorites, listed pets             |
| **Login/Register**| Auth pages                  | Login, registration, password reset                |
| **Contact**      | Get in touch                 | Support, feedback, inquiries                       |

---

## 🎨 Design System

### Color Palette
- 🟠 **Primary Orange**: `#FF6B35`
- 🌿 **Secondary Earth Tones**
- ⚪ **Clean backgrounds**
- 🔵 **Soft accent colors** (blues, greens)

### Typography
- Modern, readable fonts
- Responsive sizes
- High contrast for accessibility

### Components
- Reusable UI components
- Accessible-first design
- Consistent styling across pages

---

## 🧩 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Navigation.tsx   # Main navigation bar
│   └── PetCard.tsx      # Pet card component
├── pages/               # Route-based pages
│   ├── HomePage.tsx
│   ├── AllPetsPage.tsx
│   ├── AddPetPage.tsx
│   └── ...
├── utils/               # Utilities
│   ├── storage.ts
│   ├── validator.ts
│   └── router.ts
├── hooks/               # Custom React hooks
├── lib/                 # Library-specific utilities
└── assets/              # Images and static files
```

---

## 💡 Key Highlights

### 🤖 AI Pet Validator
- Real-time form validation
- Suggestions for better pet listings
- Intelligent feedback for users

### 📱 Responsive Design
- Mobile-first layouts
- Touch-friendly UI
- Optimized for all screen sizes

### ♿ Accessibility
- WCAG-compliant design
- Keyboard navigation
- Screen reader compatibility

### ⚡ Performance
- Fast load times
- Minimal bundle size
- Efficient client-side state

---

## 🚀 Deployment

### Platform: [Netlify](https://www.netlify.com)

**Live Site:** [https://unique-lolly-3f60b6.netlify.app](https://unique-lolly-3f60b6.netlify.app)

**Build Command:**  
```bash
npm run build
```

**Publish Directory:**  
```
dist
```

**Deployment:**  
- Auto-deploy on push to `main` branch

---

## 🤝 Contributing

We welcome contributions!

### Contribution Steps
1. Fork the repository
2. Create your branch:  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:  
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to GitHub:  
   ```bash
   git push origin feature/amazing-feature
   ```
5. Create a Pull Request 🚀

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🐕 About PetConnect

PetConnect was built with the goal of making pet adoption easier, more accessible, and joyful—for both animals and their new families.

### Our Goals
- 🧩 Simplify the adoption process
- 🤝 Connect pets with loving families
- 📚 Provide detailed pet info
- 🐾 Support shelters and animal welfare

---

**Made with ❤️ for pets and their future families**

🌐 [Visit PetConnect](https://unique-lolly-3f60b6.netlify.app)
