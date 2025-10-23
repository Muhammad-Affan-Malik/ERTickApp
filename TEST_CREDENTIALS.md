# Test Credentials for ERTickApp

## Authentication Test Credentials

For automated testing and manual QA, use the following hardcoded credentials:

### Valid Login Credentials
- **User ID:** `1111`
- **Password:** `1111`

### Test Scenarios

#### ✅ Successful Login
```
User ID: 1111
Password: 1111
Expected: Redirects to /dashboard
```

#### ❌ Failed Login - Invalid User ID
```
User ID: 0000
Password: 1111
Expected: "Invalid User ID or Password" error with shake animation
```

#### ❌ Failed Login - Invalid Password
```
User ID: 1111
Password: 0000
Expected: "Invalid User ID or Password" error with shake animation
```

#### ❌ Failed Login - Empty Fields
```
User ID: (empty)
Password: (empty)
Expected: "Please enter your User ID and Password" error
```

#### ❌ Failed Login - Partial Empty
```
User ID: 1111
Password: (empty)
Expected: "Please enter your Password" error
```

## Test User Profile
- **Username:** 1111
- **Display Name:** User 1111
- **Session Storage:** localStorage with keys `isAuthenticated` and `user`

## Authentication Flow
1. User enters credentials on landing page inline form
2. Click "Login" button
3. Loading spinner appears for 2 seconds
4. If valid: Redirects to `/dashboard` with session stored in localStorage
5. If invalid: Shows error message with shake animation on both fields

## Session Persistence
- Authentication state persists across page refreshes via localStorage
- Authenticated users cannot access landing page (auto-redirect to dashboard)
- Unauthenticated users cannot access dashboard (auto-redirect to landing page)

## Testing with TestSprite
Make sure to configure TestSprite with these credentials:
```json
{
  "testCredentials": {
    "validUserId": "1111",
    "validPassword": "1111"
  }
}
```

## Notes for Developers
- Credentials are hardcoded in `src/contexts/AuthContext.tsx` (lines 55-56)
- Replace with proper backend authentication before production deployment
- Current implementation is for demo/testing purposes only
- DO NOT use these credentials in production!

## Security Warning
⚠️ **IMPORTANT:** This is a demo authentication system with hardcoded credentials. Before deploying to production:
1. Implement proper backend authentication API
2. Use secure password hashing (bcrypt, argon2, etc.)
3. Implement JWT or session tokens
4. Add rate limiting to prevent brute force attacks
5. Implement CAPTCHA for additional security
6. Use HTTPS for all authentication requests
7. Add password complexity requirements
8. Implement account lockout after failed attempts
9. Add two-factor authentication (2FA)
10. Log all authentication attempts for security monitoring

