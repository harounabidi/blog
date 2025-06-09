# Server-Side Theme Management Implementation

## Overview

This implementation replaces client-side localStorage theme management with server-side cookie-based theme management to prevent theme flashing on page load.

## Key Changes

### 1. Server-Side Theme Detection (`utils/theme.ts`)

- `getThemeFromRequest()`: Reads theme from cookies server-side
- `getThemeClass()`: Returns appropriate CSS class for the theme
- `getThemeStyleLinks()`: Returns theme-specific CSS links
- `getThemeScript()`: Inline script to prevent FOUC (Flash of Unstyled Content)

### 2. Updated Layout Component (`src/pages/layout.tsx`)

- Now reads theme from request cookies
- Applies correct theme class to `<html>` element server-side
- Injects theme-specific CSS links
- Includes inline script for immediate theme application

### 3. Enhanced Theme Manager (`src/js/theme-manager.ts`)

- Migrated from localStorage to cookies
- Added server-side API synchronization
- Maintains backward compatibility with localStorage migration
- Async theme switching with proper error handling

### 4. Theme API Route (`src/routes/theme.ts`)

- POST `/api/theme` endpoint for theme updates
- Sets secure, HttpOnly-false cookies
- Handles development vs production security flags
- Returns JSON response for client confirmation

### 5. Updated 404 Page (`src/pages/404.tsx`)

- Now accepts context for theme detection
- Applies server-detected theme consistently

## Flow

### Initial Page Load

1. Server reads theme from `theme` cookie
2. If no cookie exists, defaults to light theme server-side
3. Client-side script checks cookie and system preference
4. If no cookie, sets cookie based on system preference
5. Applies correct theme class immediately to prevent flashing

### Theme Switching

1. User clicks theme toggle button
2. Theme manager toggles HTML class immediately
3. Updates cookie client-side
4. Calls `/api/theme` API to sync server-side cookie
5. Updates icon visibility and CSS links

## Benefits

1. **No Theme Flashing**: Server renders with correct theme from the start
2. **System Preference Support**: Falls back to `prefers-color-scheme` when no cookie exists
3. **Cookie Persistence**: Theme persists across sessions and devices
4. **Backward Compatibility**: Migrates existing localStorage users to cookies
5. **SEO Friendly**: Search engines see consistent theme

## Security Considerations

- Cookies are set with `SameSite=Lax` for CSRF protection
- `secure` flag is enabled in production for HTTPS-only transmission
- Cookies are accessible to JavaScript for client-side theme switching
- 1-year expiration for long-term preference storage

## Implementation Notes

- The inline script in the head prevents FOUC by applying theme before CSS loads
- Server-side defaults to light theme for simplicity and SEO consistency
- Client-side script handles system preference detection and cookie setting
- Theme API route validates theme values and handles environment-specific security settings
