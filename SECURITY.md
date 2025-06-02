# API Security Documentation

## POST /post Endpoint Security

The POST `/post` endpoint has been secured with multiple comprehensive layers of protection:

### 1. API Key Authentication

- **Required**: API key must be provided in request headers
- **Headers**:
  - `x-api-key: YOUR_API_KEY` OR
  - `authorization: Bearer YOUR_API_KEY`
- **Error**: Returns 401 if missing, 403 if invalid

### 2. Rate Limiting

- **Limit**: 10 requests per 15 minutes per IP address
- **Response**: Returns 429 if limit exceeded
- **Storage**: In-memory (consider KV storage for production scaling)

### 3. Request Size Validation

- **Maximum Size**: 10MB per request
- **Response**: Returns 413 if request too large

### 4. CSRF Protection

- Cross-Site Request Forgery protection is enabled globally
- CSRF token must be included for state-changing operations

### 5. Security Headers

- **Global Headers**:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - Content Security Policy configured
- **Per-Request Headers**:
  - Additional security headers on POST responses

### 6. Input Validation

- **Title**: 3-200 characters, required
- **Content**: Minimum 10 characters, required
- **Slug**: 3-100 characters, lowercase letters/numbers/hyphens only, required, unique
- **Summary**: Maximum 500 characters, optional
- **Category ID**: Must reference existing category, required
- **Reading Time**: Number between 0-1000 minutes
- **Cover**: URL validation (optional)

# API Security Documentation

## POST /post Endpoint Security

The POST `/post` endpoint has been secured with multiple comprehensive layers of protection:

### 1. API Key Authentication

- **Required**: API key must be provided in request headers
- **Headers**:
  - `x-api-key: YOUR_API_KEY` OR
  - `authorization: Bearer YOUR_API_KEY`
- **Error**: Returns 401 if missing, 403 if invalid

### 2. Rate Limiting

- **Limit**: 10 requests per 15 minutes per IP address
- **Response**: Returns 429 if limit exceeded
- **Storage**: In-memory (consider KV storage for production scaling)

### 3. Request Size Validation

- **Maximum Size**: 10MB per request
- **Response**: Returns 413 if request too large

### 4. CSRF Protection

- Cross-Site Request Forgery protection is enabled globally
- CSRF token must be included for state-changing operations

### 5. Security Headers

- **Global Headers**:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - Content Security Policy configured
- **Per-Request Headers**:
  - Additional security headers on POST responses

### 6. Input Validation

- **Title**: 3-200 characters, required
- **Content**: Minimum 10 characters, required
- **Slug**: 3-100 characters, lowercase letters/numbers/hyphens only, required, unique
- **Summary**: Maximum 500 characters, optional
- **Category ID**: Must reference existing category, required
- **Reading Time**: Number between 0-1000 minutes
- **Cover**: URL validation (optional)

### 7. Advanced Content Sanitization

- Uses `sanitize-html` library for robust HTML sanitization
- **Allowed Tags**: h1-h6, p, br, hr, ul, ol, li, strong, b, em, i, u, a, img, blockquote, code, pre, table elements
- **Allowed Attributes**: Limited to safe attributes (href, src, alt, etc.)
- **Allowed Schemes**: http, https, mailto only
- **Code Highlighting**: Supports language classes for syntax highlighting
- **Removes**: All script tags, event handlers, dangerous protocols

### 8. Business Logic Security

- **Slug Uniqueness**: Prevents duplicate slugs
- **Category Validation**: Ensures category exists before creating post
- **Database Constraints**: Leverages schema constraints for data integrity
- **Error Handling**: Prevents information leakage with generic error messages

### 9. Logging & Monitoring

- Request logging for security monitoring
- Timestamp tracking for audit trails
- IP-based rate limiting tracking

## Example Request

```bash
curl -X POST \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F "title=My Blog Post" \
  -F "content=This is the content of my blog post..." \
  -F "slug=my-blog-post" \
  -F "summary=A short summary" \
  -F "category_id=category-uuid" \
  -F "reading_time=5" \
  -F "cover=https://example.com/image.jpg" \
  http://localhost:8787/post
```

## Response Format

**Success (201):**

```json
{
  "message": "Post created successfully",
  "post": {
    "id": "uuid",
    "title": "My Blog Post",
    "slug": "my-blog-post",
    "status": "draft",
    "createdAt": 1640995200000
  }
}
```

**Error (400/401/403/429/500):**

```json
{
  "error": "Error message",
  "details": ["Validation error 1", "Validation error 2"]
}
```

## Environment Variables Required

- `API_KEY`: The secret API key for authentication

## Production Recommendations

### Enhanced Rate Limiting

Consider using Cloudflare KV or D1 for distributed rate limiting.

### API Key Management

- Use strong, randomly generated API keys
- Implement key rotation policies
- Store keys securely in environment variables

### Additional Security Measures

- Implement request signing for additional authenticity
- Set up monitoring and alerting for suspicious activity
- Regular security audits of allowed HTML tags
