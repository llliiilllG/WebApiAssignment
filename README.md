# 🚲 Rider's Choice - Premium Motorcycle Store

A full-stack web application for a premium motorcycle showroom, built with React.js frontend and Node.js/Express backend with MongoDB database.

## 🌟 Features

### Customer Features
- **Browse Bikes**: View comprehensive bike catalog with detailed specifications
- **Bike Details**: Detailed view with specifications (CC, model year, mileage, fuel type, etc.)
- **Shopping Cart**: Add bikes to cart with quantity management
- **Wishlist**: Save favorite bikes for later
- **Customer Reviews**: Submit and view customer reviews
- **User Authentication**: Register, login, and profile management
- **Checkout Process**: Complete purchase flow

### Admin Features
- **Dashboard**: Analytics and overview of business metrics
- **Bike Management**: Add, edit, and delete bikes with detailed specifications
- **Order Management**: View and manage customer orders
- **User Management**: Manage customer accounts
- **Review Management**: View and moderate customer reviews
- **Payment Tracking**: Monitor payment status

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **JWT** - Authentication
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Auto-restart server
- **Morgan** - HTTP request logger
- **Helmet** - Security headers
- **XSS-Clean** - XSS protection

## 📁 Project Structure

```
bike/
├── trek_web_backend-master/          # Backend API
│   ├── config/                       # Configuration files
│   ├── controllers/                  # API controllers
│   ├── middleware/                   # Custom middleware
│   ├── models/                       # Database models
│   ├── routes/                       # API routes
│   ├── public/                       # Static files
│   └── server.js                     # Main server file
│
└── trekweb_frontend-main/            # Frontend application
    ├── src/
    │   ├── components/               # React components
    │   │   ├── common/               # Shared components
    │   │   ├── private/              # Admin components
    │   │   └── public/               # Public components
    │   ├── assets/                   # Static assets
    │   └── main.jsx                  # App entry point
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup
```bash
cd trek_web_backend-master
npm install
```

Create a `.env` file in `config/` directory:
```env
PORT=3000
LOCAL_DATABASE_URI=mongodb://localhost:27017/riders-choice
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
# or
npm start
```

### Frontend Setup
```bash
cd trekweb_frontend-main
npm install
```

Start the frontend development server:
```bash
npm run dev
```

## 📊 Database Models

### Bike Model
- Title, description, price
- Category (Adventure, Luxury, Budget, Sports, Cruiser)
- Specifications (CC, model year, mileage, fuel type, transmission, color, brand)
- Stock availability
- Image uploads

### User Model
- Customer information
- Authentication details
- Profile management

### Review Model
- Customer name
- Bike reference
- Rating and comments
- Timestamp

### Order Model
- Customer details
- Bike information
- Payment status
- Order tracking

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### Bikes
- `GET /api/v1/package` - Get all bikes
- `POST /api/v1/package` - Add new bike
- `PUT /api/v1/package/:id` - Update bike
- `DELETE /api/v1/package/:id` - Delete bike

### Reviews
- `GET /api/v1/reviews` - Get all reviews
- `POST /api/v1/reviews` - Submit review
- `DELETE /api/v1/reviews/:id` - Delete review

### Orders
- `GET /api/v1/bookings` - Get all orders
- `POST /api/v1/bookings` - Create order

## 🎨 UI/UX Features

- **Modern Design**: Clean, responsive interface with green theme
- **Mobile Responsive**: Works seamlessly on all devices
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **User-Friendly Navigation**: Intuitive menu structure
- **Loading States**: Proper feedback during data operations
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

- **JWT Authentication**: Secure user sessions
- **Input Validation**: Server-side validation
- **XSS Protection**: Cross-site scripting prevention
- **CORS Configuration**: Proper cross-origin handling
- **Helmet Security**: Security headers
- **MongoDB Sanitization**: SQL injection prevention

## 📱 Screenshots

The application includes:
- **Home Page**: Hero section with featured bikes
- **Bike Catalog**: Grid view with filtering and search
- **Bike Details**: Comprehensive bike information
- **Shopping Cart**: Cart management with checkout
- **Admin Dashboard**: Analytics and management tools
- **Review System**: Customer feedback management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gaurav Koirala**
- GitHub: [@llliiilllG](https://github.com/llliiilllG)
- Email: koiralagaurav22@gmail.com

## 🙏 Acknowledgments

- React.js community for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database solution
- All contributors and testers

---

**Rider's Choice** - Your trusted partner for premium motorcycles and exceptional riding experiences! 🏍️ 