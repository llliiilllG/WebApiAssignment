# Database Schema Documentation

## Collections Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  fname: String,
  lname: String,
  email: String,
  password: String (hashed),
  phone: String,
  role: String ("user" | "admin"),
  createdAt: Date,
  updatedAt: Date
}
```

### Packages Collection (Products)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stockAvailable: [String],
  cc: String,
  modelYear: String,
  mileage: String,
  fuelType: String,
  transmission: String,
  color: String,
  brand: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  packageId: ObjectId (ref: Package),
  fullName: String,
  email: String,
  phone: String,
  tickets: Number,
  pickupLocation: String,
  paymentMethod: String,
  status: String ("pending" | "confirmed" | "cancelled"),
  createdAt: Date
}
```

### Reviews Collection
```javascript
{
  _id: ObjectId,
  packageId: ObjectId (ref: Package),
  rating: Number,
  comment: String,
  createdAt: Date
}
```

### Wishlist Collection
```javascript
{
  _id: ObjectId,
  customer: ObjectId (ref: User),
  packages: [ObjectId] (ref: Package),
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes
- Email field on Users collection (unique)
- PackageId on Bookings collection
- Customer field on Wishlist collection

## Relationships
- Bookings reference Packages
- Reviews reference Packages
- Wishlist references Users and Packages
