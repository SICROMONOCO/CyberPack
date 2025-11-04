# Authentication and Security Implementation

## Overview
This document describes the authentication and security measures implemented for the admin panel.

## Client-Side Security Improvements

### 1. Session Management with Expiration
- Sessions now expire after 1 hour of inactivity
- Session data is stored as a JSON object with an `expiresAt` timestamp
- On page load, expired sessions are automatically cleared
- Invalid session data is handled gracefully with error catching

### 2. Username Enumeration Prevention
- Username and password are validated together to prevent timing attacks
- Password comparison runs even if username is incorrect
- Single "Invalid credentials" error message for both username and password failures
- Prevents attackers from determining valid usernames through response timing

### 3. Type Safety
- Added proper TypeScript interfaces for Branch, Semester, and Subject types
- Replaced `any[]` types with strongly typed arrays
- Improves code maintainability and catches type errors at compile time

### 4. Input Validation
- Credit hours validation improved to handle edge cases:
  - Empty strings are properly handled as `undefined`
  - Non-numeric values are rejected
  - Negative numbers are rejected
- Form reload logic fixed to use correct ID variables

### 5. Data Integrity Checks
- Added null checks for all Supabase insert operations
- Throws descriptive errors if insert operations succeed but return no data
- Prevents undefined access errors

## Database-Level Security (Supabase RLS)

### Row Level Security (RLS) Policies
RLS policies have been updated to properly authenticate users using Supabase Auth:

**Migration File**: `supabase/migrations/20251104152900_fix_rls_policies_for_admin_operations.sql`

#### Read Access (Public)
- All tables (branches, semesters, subjects, resources) allow SELECT operations for everyone
- This enables the view-only site to function without authentication

#### Write Access (Authenticated Only)
- INSERT, UPDATE, and DELETE operations require authentication
- Policies check `auth.uid() IS NOT NULL` to verify the user is authenticated with Supabase
- Unauthenticated requests to write operations will be rejected at the database level

### How RLS Works
1. Client authenticates with Supabase Auth (needs to be set up)
2. Supabase generates a JWT token containing the user ID
3. The JWT is sent with every database request
4. RLS policies check `auth.uid()` which extracts the user ID from the JWT
5. If no valid JWT is present, `auth.uid()` returns NULL and write operations fail

## Setup Requirements

### Environment Variables
The following environment variables must be set:
- `VITE_ADMIN_USERNAME`: The admin username
- `VITE_ADMIN_PASSWORD_HASH`: BCrypt hash of the admin password

### Supabase Configuration
To fully enable authentication at the database level:

1. **Apply the migration**:
   ```bash
   supabase db push
   ```

2. **Set up Supabase Auth** (if not already done):
   - Enable Email/Password authentication in Supabase dashboard
   - Create an admin user account
   - Update the client code to use Supabase Auth instead of local authentication

3. **Alternative: Service Role Key**:
   If you prefer to keep local authentication:
   - Use Supabase service role key for admin operations
   - Update `supabaseAcademicApi.ts` to use service role client
   - Note: Service role bypasses RLS, so ensure proper client-side checks

## Current Limitations

1. **Local Authentication Only**: The current implementation uses local username/password authentication with bcrypt, which doesn't integrate with Supabase Auth.

2. **No Server-Side Session Validation**: Sessions are stored in localStorage without server-side validation.

3. **Recommended Improvements**:
   - Integrate with Supabase Auth for full end-to-end authentication
   - Implement refresh tokens for longer sessions
   - Add CSRF protection for write operations
   - Consider implementing role-based access control (RBAC) for different admin levels

## Testing RLS Policies

You can test RLS policies using the Supabase SQL editor:

```sql
-- Test as unauthenticated user (should fail)
INSERT INTO branches (name, description) VALUES ('Test Branch', 'Test Description');

-- Test as authenticated user (should succeed)
SELECT auth.uid(); -- Check if you're authenticated
INSERT INTO branches (name, description) VALUES ('Test Branch', 'Test Description');
```

## Security Best Practices

1. **Never commit credentials**: Use environment variables for all sensitive data
2. **Use HTTPS**: Always serve the application over HTTPS in production
3. **Regular security audits**: Review and update dependencies regularly
4. **Monitor failed login attempts**: Consider implementing rate limiting
5. **Secure environment variables**: Use Vercel/hosting platform's secret management
