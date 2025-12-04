# Theatre Watson - AI Assistant Guide

## Project Overview

Theatre Watson is a comprehensive theatre discovery and tracking application for London productions. It helps users discover shows, plan their theatre visits, and access booking, reviews, dining, and navigation resources. The application features a rich dataset of 70+ London theatre productions spanning West End, Off-West End, and Fringe venues.

**Tech Stack:**
- React 19.2.0 (UI library)
- Vite 7.2.4 (build tool with HMR)
- Tailwind CSS 3.4.17 (utility-first styling)
- Lucide React 0.555.0 (icon library)
- ESLint 9.39.1 (code quality)

**Project Type:** Single-page application (SPA) with no routing or backend integration.

## Architecture Overview

### Monolithic Component Structure

This is a **single-component application** where all logic resides in `src/App.jsx` (1351 lines):

```
src/
├── App.jsx          # Main TheatreTracker component (entire application)
├── App.css          # Legacy styles (minimal, mostly replaced by Tailwind)
├── index.css        # Tailwind directives
├── main.jsx         # Application entry point
└── assets/
    └── react.svg    # Default React logo (unused)
```

**Key Architectural Decisions:**
- No component decomposition - All UI, state, and logic in one file
- No routing - Single view with filter-based navigation
- No external state management - Uses React hooks only
- No backend/API - All data hardcoded in component state
- No persistence - Data lives in memory only

### When to Refactor

If making significant feature additions, consider decomposing into:
```
src/
├── components/
│   ├── ShowCard.jsx          # Individual show display
│   ├── FilterBar.jsx         # Type/location/date filters
│   ├── SearchBar.jsx         # Search functionality
│   ├── TermsModal.jsx        # Terms & conditions modal
│   └── Hero.jsx              # Header section
├── utils/
│   ├── dateUtils.js          # Date formatting/comparison
│   └── linkGenerators.js     # Calendar/maps/review links
├── data/
│   └── shows.js              # Show database
└── App.jsx                    # Main orchestrator
```

## State Management

Uses React `useState` hooks for local state:

```javascript
const [typeFilter, setTypeFilter] = useState('all');           // "all" | "musical" | "play"
const [locationFilter, setLocationFilter] = useState('all');   // "all" | "west-end" | "off-west-end" | "fringe"
const [visitDate, setVisitDate] = useState('');                // ISO date string from date picker
const [currentDate, setCurrentDate] = useState(new Date());    // Reference for date comparisons
const [showTermsModal, setShowTermsModal] = useState(false);   // Modal visibility toggle
const [shows, setShows] = useState(initialShows);              // Theatre shows database
const [searchQuery, setSearchQuery] = useState('');            // Search input value
```

**State Management Patterns:**
- Direct state updates via setter functions
- Computed values derived from state (e.g., `filteredShows`)
- No Redux, Context API, or other state libraries
- State is scoped to the component (no global state)

## Data Structure

### Show Object Schema

```javascript
{
  id: number,                    // Unique identifier (1-308)
  title: string,                 // Show name
  venue: string,                 // Theatre name
  locationType: string,          // "west-end" | "off-west-end" | "fringe"
  date: string,                  // Opening date (YYYY-MM-DD format)
  closingDate: string,           // Closing date (YYYY-MM-DD or "2027-12-31" for open-ended)
  type: string,                  // "musical" | "play"
  description: string,           // Show description (1-3 sentences)
  bookingUrl: string,            // Official ticketing website URL
  reviewUrl?: string             // Optional review link (Guardian, TimeOut, etc.)
}
```

**Data Organization:**
- 70+ shows hardcoded in `initialShows` array
- Long-running classics (300s ID range): Lion King, Wicked, Les Mis, etc.
- Recent/upcoming productions (100s-200s ID range)
- Sorted by opening date in display

**Adding New Shows:**
1. Add to `initialShows` array in `src/App.jsx:11`
2. Use unique ID number
3. Ensure dates are in YYYY-MM-DD format
4. Use "2027-12-31" for open-ended runs
5. Include complete bookingUrl
6. Add reviewUrl if available (Guardian/TimeOut preferred)

## Styling Conventions

### Tailwind-First Approach

The application uses **Tailwind CSS utility classes** throughout with minimal custom CSS.

**Color Palette:**
- **Background:** `slate-950` (main), `slate-900` (cards), `slate-800` (borders)
- **Primary Accent:** `amber-500`, `amber-600` (buttons, highlights)
- **Text:** `amber-50` (primary), `slate-300/400/500` (secondary/muted)
- **Semantic Colors:**
  - `emerald-500/600` - Now Playing indicators
  - `purple-500/600` - Musical badges
  - `indigo-500/600` - Location tags
  - `red-600/700` - Book Tickets CTAs

**Theme:** Dark theme with amber/gold theatrical accents

**Responsive Breakpoints:**
- Mobile-first design
- `md:` breakpoint (768px+) for tablet/desktop layouts
- Cards: 1 column mobile, 2 columns tablet+

**Custom Tailwind Configuration:**
```javascript
// tailwind.config.js
theme: {
  extend: {
    animation: {
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }
  }
}
```

**Styling Best Practices:**
- Use Tailwind utilities for all styling (avoid custom CSS)
- Maintain consistent spacing: `p-6`, `gap-4`, `space-y-4`
- Use semantic color names from palette above
- Group related utilities: `flex items-center gap-2`
- Use responsive modifiers: `text-sm md:text-base`

## Key Features & Functionality

### 1. Filtering System

**Multi-dimensional filtering:**
```javascript
const filteredShows = shows
  .filter(show => {
    // Hide closed shows (past closing date)
    if (new Date(show.closingDate) < currentDate) return false;

    // Type filter
    if (typeFilter !== 'all' && show.type !== typeFilter) return false;

    // Location filter
    if (locationFilter !== 'all' && show.locationType !== locationFilter) return false;

    // Search query (title or venue)
    if (searchQuery && !matches) return false;

    // Visit date filter (show running on specific date)
    if (visitDate && !isRunning) return false;

    return true;
  })
  .sort((a, b) => new Date(a.date) - new Date(b.date));
```

**Filter Types:**
- **Type:** Musical, Play, All
- **Location:** West End, Off-West End, Fringe/Local, All
- **Search:** Free text search on title/venue
- **Visit Date:** Shows running on a specific date

### 2. External Integrations

**Calendar Integration:**
```javascript
getCalendarLink(show) => Google Calendar event URL
// Pre-fills: title, venue, date, description
```

**Review Links:**
```javascript
getReviewLink(show)
// Priority: show.reviewUrl → Google search fallback
// Format: "Guardian review {title}" or "{title} reviews"
```

**Google Maps:**
```javascript
getMapsLink(venue) => Google Maps search URL
// Opens venue location in Google Maps
```

**TripAdvisor Dining:**
```javascript
getRestaurantsLink(venue) => TripAdvisor search URL
// Format: "restaurants near {venue}"
```

### 3. Date Handling

**Helper Functions:**
```javascript
formatDate(dateString)      // "Wed, 4 December 2025"
isPast(dateString)          // Has opening date passed?
isApproaching(dateString)   // Opens within 30 days?
```

**Status Indicators:**
- **Now Playing** (emerald) - Show has opened
- **Opens Soon** (amber pulse) - Opens within 30 days
- **Opens [Date]** (muted) - Future opening
- **Runs until [Date]** - Closing date or "TBC" for open-ended

**Date Formats:**
- Storage: ISO 8601 (`YYYY-MM-DD`)
- Display: Long format (`Wed, 4 December 2025`)
- Open-ended: `2027-12-31` sentinel value

### 4. Action Buttons

Each show card includes:
1. **Book Tickets** (red) - Links to `show.bookingUrl`
2. **Read Reviews** (amber) - Links to reviews via `getReviewLink()`
3. **View on Maps** (indigo) - Opens venue in Google Maps
4. **Nearby Dining** (emerald) - TripAdvisor restaurant search

**Icon Mapping:**
- `Ticket` - Book Tickets
- `BookOpen` - Read Reviews
- `MapPin` - View on Maps
- `UtensilsCrossed` - Nearby Dining

## Development Workflows

### Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Run ESLint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

**ESLint Configuration:**
- Extends: `@eslint/js`, `react-hooks`, `react-refresh`
- ECMAScript 2020+ with JSX support
- Browser globals enabled
- Custom rule: Allow unused vars matching `^[A-Z_]` (React components)

**Linting Commands:**
```bash
npm run lint              # Check for errors
npm run lint -- --fix     # Auto-fix where possible
```

**Pre-commit Checklist:**
- [ ] Run `npm run lint` and fix all errors
- [ ] Test all filters (type, location, search, date)
- [ ] Verify responsive layout (mobile + desktop)
- [ ] Check show cards render correctly
- [ ] Ensure external links work (booking, reviews, maps, dining)

### Git Workflow

**Branch Naming:**
- Feature branches: `claude/feature-description-{session-id}`
- Must start with `claude/` and end with session ID
- Example: `claude/add-sorting-feature-019tTK1oyBoeh7TfEWi2oUfo`

**Commit Guidelines:**
```bash
# Descriptive commit messages
git commit -m "Add filtering by show runtime duration"
git commit -m "Fix date comparison bug in isApproaching function"
git commit -m "Update Wicked closing date to 2026-03-15"

# Push to feature branch
git push -u origin claude/feature-name-{session-id}
```

**Common Git Operations:**
```bash
# Check branch and status
git status

# View recent changes
git log --oneline -10

# Create and switch to feature branch
git checkout -b claude/new-feature-{session-id}

# Stage and commit changes
git add src/App.jsx
git commit -m "Descriptive message"

# Push with upstream tracking
git push -u origin claude/feature-branch-{session-id}
```

**Pull Request Pattern:**
1. Develop on feature branch
2. Commit regularly with clear messages
3. Push to feature branch
4. Create PR to main branch
5. Merge via GitHub UI

## Common Development Tasks

### Adding a New Show

**Location:** `src/App.jsx:11` (inside `initialShows` array)

```javascript
{
  id: 309,                           // Next available ID
  title: "Show Title",
  venue: "Theatre Name",
  locationType: "west-end",          // or "off-west-end" | "fringe"
  date: "2026-06-15",                // Opening date (YYYY-MM-DD)
  closingDate: "2027-12-31",         // Use 2027-12-31 for open-ended
  type: "musical",                   // or "play"
  description: "Brief description of the show and its appeal.",
  bookingUrl: "https://official-ticketing-url.com/",
  reviewUrl: "https://www.theguardian.com/..." // Optional
}
```

### Modifying Filters

**Location:** `src/App.jsx` - Filter buttons around line 600-800

**Add new filter type:**
1. Add state: `const [newFilter, setNewFilter] = useState('default')`
2. Add filter logic to `filteredShows` computation
3. Add UI controls (buttons/inputs)
4. Update filter indicator counts

### Updating Styles

**Color Changes:**
1. Use Tailwind utility classes only
2. Reference color palette in this guide
3. Maintain consistency with existing theme
4. Test in both light/dark environments (if applicable)

**Layout Adjustments:**
1. Modify grid/flex utilities: `grid-cols-1 md:grid-cols-2`
2. Update spacing: `gap-4`, `p-6`, `space-y-4`
3. Adjust responsive breakpoints: `md:`, `lg:`

### Adding New Features

**Feature Development Checklist:**
1. Determine if feature fits in monolithic structure
2. Consider refactoring into components if >1500 lines
3. Add necessary state variables
4. Implement feature logic
5. Add UI elements with Tailwind styling
6. Update this CLAUDE.md if architectural changes made
7. Test all existing features for regressions
8. Run linter and fix errors

## Testing Guidelines

**Manual Testing Checklist:**

**Filters:**
- [ ] Type filter: All, Musical, Play
- [ ] Location filter: All, West End, Off-West End, Fringe
- [ ] Combined filters work together
- [ ] Search filters by title and venue
- [ ] Visit date filter shows only running shows
- [ ] Filter counts update correctly

**Show Cards:**
- [ ] All shows render with correct data
- [ ] Status badges display correctly (Now Playing, Opens Soon, etc.)
- [ ] Opening/closing dates format properly
- [ ] Descriptions display fully

**External Links:**
- [ ] Book Tickets opens correct booking URL
- [ ] Read Reviews opens review or Google search
- [ ] View on Maps opens Google Maps with venue
- [ ] Nearby Dining opens TripAdvisor search
- [ ] All links open in new tabs

**Responsive Design:**
- [ ] Mobile layout (1 column, stacked filters)
- [ ] Tablet/desktop layout (2 columns, inline filters)
- [ ] All buttons/inputs are touch-friendly
- [ ] Text is readable on all screen sizes

**Edge Cases:**
- [ ] No results found message displays when filters exclude all shows
- [ ] Closed shows are hidden from results
- [ ] Past opening dates show "Now Playing"
- [ ] Future dates show "Opens [date]"
- [ ] Open-ended shows display "TBC"

## File Organization

```
theatre-watson/
├── .git/                       # Git repository
├── .gitignore                  # Ignore node_modules, dist, logs
├── node_modules/               # Dependencies (npm install)
├── public/                     # Static assets
│   └── vite.svg               # Vite logo (unused)
├── src/
│   ├── App.jsx                # Main application component (1351 lines)
│   ├── App.css                # Legacy styles (minimal)
│   ├── index.css              # Tailwind directives
│   ├── main.jsx               # React entry point
│   └── assets/
│       └── react.svg          # React logo (unused)
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── vite.config.js             # Vite configuration (React plugin)
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── eslint.config.js           # ESLint rules and plugins
├── README.md                  # Vite + React template README
├── CLAUDE.md                  # This file (AI assistant guide)
└── git_setup.sh               # Git setup script
```

## Dependencies

### Production Dependencies

```json
{
  "react": "^19.2.0",           // UI library
  "react-dom": "^19.2.0",       // DOM rendering
  "lucide-react": "^0.555.0"    // Icon library (30+ icons used)
}
```

**Lucide Icons Used:**
`Calendar`, `Star`, `MapPin`, `Clock`, `Search`, `ExternalLink`, `Filter`, `Info`, `ChevronRight`, `Ticket`, `BookOpen`, `UtensilsCrossed`, `X`, `Sparkles`, `Theater`, `Music`

### Development Dependencies

```json
{
  "@vitejs/plugin-react": "^5.1.1",       // Vite React plugin (Fast Refresh)
  "vite": "^7.2.4",                       // Build tool with HMR
  "tailwindcss": "^3.4.17",               // Utility-first CSS
  "autoprefixer": "^10.4.22",             // CSS vendor prefixing
  "postcss": "^8.5.6",                    // CSS processing
  "eslint": "^9.39.1",                    // Linting
  "eslint-plugin-react-hooks": "^7.0.1",  // React Hooks linting
  "eslint-plugin-react-refresh": "^0.4.24", // Fast Refresh linting
  "@types/react": "^19.2.5",              // React TypeScript types
  "@types/react-dom": "^19.2.3"           // React DOM TypeScript types
}
```

**Updating Dependencies:**
```bash
npm outdated              # Check for updates
npm update               # Update to latest minor/patch versions
npm install react@latest # Update specific package to latest major version
```

## Naming Conventions

### Code Conventions

**JavaScript:**
- **Components:** PascalCase (`TheatreTracker`)
- **Functions:** camelCase (`formatDate`, `getCalendarLink`)
- **Variables:** camelCase (`typeFilter`, `visitDate`, `showTermsModal`)
- **Constants:** camelCase for most, UPPER_SNAKE_CASE for true constants
- **Arrays:** Plural nouns (`shows`, `filteredShows`)

**CSS Classes:**
- Tailwind utility classes (no custom classes)
- Use semantic grouping: `group`, `group-hover:`, `peer`

**Files:**
- Components: PascalCase with `.jsx` extension (`App.jsx`)
- Utils: camelCase with `.js` extension (if created)
- Styles: lowercase with `.css` extension (`index.css`)
- Config: lowercase with extension (`vite.config.js`)

### Variable Naming Patterns

**Boolean Flags:**
```javascript
const [showModal, setShowModal] = useState(false);     // show* prefix
const isRunning = openDate <= today && today <= closeDate;  // is* prefix
const hasReviews = show.reviewUrl !== undefined;       // has* prefix
```

**Computed Values:**
```javascript
const filteredShows = shows.filter(/* ... */);
const totalCount = filteredShows.length;
const activeFilters = [typeFilter, locationFilter].filter(f => f !== 'all');
```

**Event Handlers:**
```javascript
const handleFilterChange = (type) => { /* ... */ };
const handleSearch = (query) => { /* ... */ };
const handleDateSelect = (date) => { /* ... */ };
```

## Performance Considerations

### Current Performance Profile

**Bundle Size:** ~500KB (development), ~150KB (production, gzipped)
- React + React DOM: ~130KB
- Lucide icons: ~15KB (tree-shaken)
- Application code: ~5KB

**Rendering Performance:**
- Single component re-renders on any state change
- 70+ show cards rendered on each filter update
- No virtualization (all cards in DOM)
- Fast enough for current dataset size (<100 shows)

### Optimization Opportunities

**If performance becomes an issue:**

1. **Memoization:**
```javascript
const filteredShows = useMemo(() => {
  return shows.filter(/* ... */).sort(/* ... */);
}, [shows, typeFilter, locationFilter, searchQuery, visitDate]);
```

2. **Component Splitting:**
```javascript
const ShowCard = React.memo(({ show }) => { /* ... */ });
```

3. **Virtual Scrolling:**
- Use `react-window` or `react-virtualized`
- Render only visible cards
- Critical if dataset grows beyond 200 shows

4. **Lazy Loading:**
```javascript
const TermsModal = lazy(() => import('./components/TermsModal'));
```

5. **Debounced Search:**
```javascript
const debouncedSearch = useMemo(
  () => debounce((query) => setSearchQuery(query), 300),
  []
);
```

## Browser Compatibility

**Target Browsers:**
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features used (optional chaining, nullish coalescing)
- No IE11 support

**CSS Features:**
- CSS Grid and Flexbox
- Custom properties (CSS variables via Tailwind)
- Modern color functions

**JavaScript Features:**
- Arrow functions
- Destructuring
- Template literals
- Array methods (filter, map, sort)
- Optional chaining (`show?.reviewUrl`)
- Date object (native)

## Known Limitations

1. **No Data Persistence:** All data is in memory, resets on page refresh
2. **No User Accounts:** No authentication or user-specific data
3. **No Backend API:** All data hardcoded in frontend
4. **No Routing:** Single-page app with no URL-based navigation
5. **No Analytics:** No tracking of user behavior or popular shows
6. **No Accessibility Audit:** ARIA labels and keyboard navigation may need improvement
7. **No Internationalization:** English-only, GBP currency, UK date formats
8. **No PWA Features:** No offline support, service workers, or installability
9. **No Automated Tests:** No unit, integration, or e2e tests
10. **Monolithic Structure:** Single 1351-line component (refactoring recommended for growth)

## Future Enhancement Ideas

**High Priority:**
1. Component decomposition for maintainability
2. Add basic unit tests (Jest + React Testing Library)
3. Implement accessibility improvements (ARIA labels, keyboard nav)
4. Add sorting options (alphabetical, by opening date, by closing date)
5. Enhance mobile UX (swipe gestures, collapsible filters)

**Medium Priority:**
6. Add favorite/bookmark functionality
7. Integrate real-time ticket availability
8. Add show poster images
9. Implement "Notify Me" for upcoming shows
10. Add price range indicators

**Low Priority:**
11. User accounts and saved preferences
12. Social sharing features
13. Recommendation engine
14. Calendar export (.ics files)
15. Backend API for dynamic data

## Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**ESLint Errors:**
```bash
# Auto-fix most issues
npm run lint -- --fix

# Check specific file
npx eslint src/App.jsx
```

**Styling Not Applied:**
```bash
# Verify Tailwind content paths in tailwind.config.js
# Ensure index.css imports Tailwind directives
# Check browser console for CSS errors
```

**Shows Not Displaying:**
- Verify `initialShows` array syntax (no trailing commas)
- Check date format (must be `YYYY-MM-DD`)
- Ensure `closingDate` is in future
- Check filter state values

**External Links Not Working:**
- Verify URL encoding in link generators
- Check `bookingUrl` format (must include `https://`)
- Test links in new browser tab

### Debug Mode

**Inspect Filtered Shows:**
```javascript
// Add temporary logging in App.jsx
console.log('Filtered shows:', filteredShows);
console.log('Active filters:', { typeFilter, locationFilter, searchQuery, visitDate });
console.log('Total shows:', shows.length);
```

**React DevTools:**
- Install React Developer Tools browser extension
- Inspect component state and props
- Profile rendering performance

## Contact & Resources

**Project Repository:** https://github.com/RichardMPS/theatre-watson

**Documentation:**
- React: https://react.dev
- Vite: https://vite.dev
- Tailwind CSS: https://tailwindcss.com
- Lucide Icons: https://lucide.dev

**AI Assistant Notes:**
- Always read existing code before making changes
- Maintain consistent styling with Tailwind utilities
- Test all filters and external links after modifications
- Update this CLAUDE.md when making architectural changes
- Run `npm run lint` before committing
- Follow git branch naming convention: `claude/{description}-{session-id}`

---

**Last Updated:** 2025-12-04
**Codebase Version:** Based on commit `630c329`
**Maintained by:** AI assistants working with RichardMPS
