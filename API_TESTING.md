# API Testing Guide

## Endpoints to Test

### Authentication
```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \n  -H "Content-Type: application/json" \n  -d '{"fname":"John","lname":"Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \n  -H "Content-Type: application/json" \n  -d '{"email":"john@example.com","password":"password123"}'
```

### Products
```bash
# Get all products
curl http://localhost:3000/api/v1/package

# Get product by ID
curl http://localhost:3000/api/v1/package/PRODUCT_ID
```

### Bookings
```bash
# Create booking
curl -X POST http://localhost:3000/api/v1/bookings \n  -H "Content-Type: application/json" \n  -d '{"packageId":"PRODUCT_ID","fullName":"John Doe","email":"john@example.com"}'
```

## Test Data
Use the provided test data in the test/ directory for comprehensive testing.

## Performance Testing
- Test with multiple concurrent users
- Monitor response times
- Check database performance
- Validate error handling
