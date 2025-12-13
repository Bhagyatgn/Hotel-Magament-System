# 🎨 Design System & Visual Specifications

## Color Palette

### Primary Colors

```
Indigo (#6366f1)
- Used for: Primary buttons, links, primary actions
- RGB: (99, 102, 241)
- Used in: Hero backgrounds, CTA buttons, highlights

Indigo Light (#818cf8)
- Used for: Hover states, lighter backgrounds
- RGB: (129, 143, 248)

Indigo Dark (#4f46e5)
- Used for: Button hover states, darker accents
- RGB: (79, 70, 229)
```

### Secondary Colors

```
Pink (#ec4899)
- Used for: Secondary actions, accents
- RGB: (236, 72, 153)
- Used in: Secondary buttons, highlights

Amber/Gold (#f59e0b)
- Used for: Ratings, highlights, tertiary accents
- RGB: (245, 158, 11)
- Used in: Star ratings, warning states
```

### Status Colors

```
Success (#10b981) - Green
- Used for: Confirmed bookings, success messages
- RGB: (16, 185, 129)

Danger (#ef4444) - Red
- Used for: Deletion, errors, cancel buttons
- RGB: (239, 68, 68)

Warning/Pending (#f59e0b) - Amber
- Used for: Pending status, warnings
- RGB: (245, 158, 11)
```

### Neutral Colors

```
Text Dark (#1e293b)
- Used for: Primary text, headings
- RGB: (30, 41, 59)

Text Gray (#64748b)
- Used for: Secondary text, descriptions
- RGB: (100, 116, 139)

Border (#e2e8f0)
- Used for: Borders, dividers
- RGB: (226, 232, 240)

Light Background (#f8fafc)
- Used for: Page backgrounds, secondary backgrounds
- RGB: (248, 250, 252)

White (#ffffff)
- Used for: Cards, containers, primary backgrounds
- RGB: (255, 255, 255)
```

## Typography

### Font Family

```
Primary: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif
- Modern, clean, professional
- Excellent readability
- Works across all platforms
```

### Font Sizes & Weights

```
H1 (Page Title): 3.5rem / 56px, Weight: 800
- Used for: Main page headings

H2 (Section Title): 2.5rem / 40px, Weight: 800
- Used for: Section headings

H3 (Subsection): 1.5rem / 24px, Weight: 700
- Used for: Subsection titles

H4 (Card Title): 1.3rem / 21px, Weight: 700
- Used for: Hotel/Room card titles

Body Text: 1rem / 16px, Weight: 400
- Used for: Main content text

Small Text: 0.9rem / 14px, Weight: 400
- Used for: Labels, secondary text

Extra Small: 0.85rem / 13px, Weight: 600
- Used for: Badges, tags, labels

Line Height: 1.6
- Ensures good readability
```

## Spacing System

### Margin & Padding Units

```
xs: 0.5rem  (8px)
sm: 1rem    (16px)
md: 1.5rem  (24px)
lg: 2rem    (32px)
xl: 3rem    (48px)
2xl: 4rem   (64px)
```

### Common Spacings

```
Section Padding: 2rem to 4rem
Card Padding: 1.5rem
Input Padding: 0.75rem 1rem
Button Padding: 0.875rem 2rem
Gap Between Items: 1rem to 2rem
```

## Shadows & Elevation

### Shadow System

```
Shadow SM: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- Used for: Subtle elements

Shadow MD: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Used for: Cards, navigation

Shadow LG: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- Used for: Modals, dropdowns, hover states

Shadow XL: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
- Used for: Large cards on hover, prominent elements
```

## Border Radius

```
xs: 0.25rem (4px)
sm: 0.5rem  (8px) - Default for inputs, buttons
md: 0.75rem (12px)
lg: 1rem    (16px) - Default for cards
xl: 1.5rem  (24px) - Large containers
2xl: 2rem   (32px) - Hero sections
full: 50%   - Circles/avatars
```

## Animation Specifications

### Transitions

```
Default Duration: 0.3s ease
Fast Duration: 0.15s ease
Slow Duration: 0.5s ease
Very Slow Duration: 0.8s ease

Easing Functions:
- ease: Smooth default
- ease-in-out: Used for scale/transform
- cubic-bezier(0.4, 0, 0.2, 1): Custom smooth curve
```

### Animation Effects

#### Fade In Animation

```
Duration: 0.8s ease-out
From: opacity: 0; transform: translateY(30px)
To: opacity: 1; transform: translateY(0)
Used for: Page elements on load
```

#### Float Animation

```
Duration: 3s ease-in-out infinite
0%: transform: translateY(0)
50%: transform: translateY(-20px)
100%: transform: translateY(0)
Used for: Hero images
```

#### Hover Effects

```
Cards:
- Scale: 1 → 1 (no scale, but shadow lift)
- Transform: translateY(0) → translateY(-8px)
- Shadow: MD → XL

Images:
- Scale: 1 → 1.05
- Transition: 0.3s ease

Links:
- Underline width: 0 → 100%
- Transition: 0.3s ease
```

## Component Specifications

### Buttons

#### Primary Button

```
Background: Linear gradient #6366f1 → #4f46e5
Color: White
Padding: 0.875rem 2rem
Border: None
Border Radius: 0.5rem
Font Weight: 600
Font Size: 1rem
Cursor: pointer
Hover:
  - Transform: translateY(-2px)
  - Shadow: XL
  - Opacity: unchanged
Disabled:
  - Opacity: 0.5
  - Cursor: not-allowed
```

#### Secondary Button

```
Background: Transparent
Color: White
Border: 2px solid White
Padding: 0.875rem 2rem
Border Radius: 0.5rem
Font Weight: 600
Font Size: 1rem
Hover:
  - Background: White
  - Color: #6366f1
  - Transform: translateY(-2px)
```

### Form Inputs

```
Background: White
Color: #1e293b
Border: 1px solid #e2e8f0
Padding: 0.75rem 1rem
Border Radius: 0.5rem
Font Size: 1rem
Font Family: inherit
Line Height: 1.5

Focus State:
  - Outline: none
  - Border Color: #6366f1
  - Box Shadow: 0 0 0 3px rgba(99, 102, 241, 0.1)
```

### Cards

```
Background: White
Border Radius: 1rem
Box Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Overflow: hidden
Transition: all 0.3s ease

Hover State:
  - Transform: translateY(-8px)
  - Box Shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

Images within cards:
  - Scale on hover: 1 → 1.05
  - Transition: 0.3s ease
```

### Status Badges

```
Confirmed (Success):
  - Background: rgba(16, 185, 129, 0.1)
  - Color: #10b981
  - Border: Optional

Pending (Warning):
  - Background: rgba(245, 158, 11, 0.1)
  - Color: #f59e0b

Cancelled (Danger):
  - Background: rgba(239, 68, 68, 0.1)
  - Color: #ef4444

Common:
  - Padding: 0.4rem 1rem
  - Border Radius: 2rem
  - Font Size: 0.85rem
  - Font Weight: 600
```

## Responsive Breakpoints

```
Mobile: < 480px
- Full width layouts
- Single column grids
- Larger touch targets

Tablet: 480px - 768px
- 2 column grids
- Adjusted padding
- Medium font sizes

Desktop: > 768px
- 3+ column grids
- Full styling
- Original spacing
```

## Layout Patterns

### Grid System

```
- Default: repeat(auto-fill, minmax(300px, 1fr))
- Mobile: 1fr (single column)
- Tablet: repeat(auto-fit, minmax(200px, 1fr))
- Desktop: repeat(auto-fill, minmax(300px, 1fr))
- Gap: 1.5rem - 2rem
```

### Navigation

```
- Sticky positioning
- Top: 0
- Z-index: 100
- Flex between logo and links
- Padding: 1rem 2rem
- Box shadow: MD
```

### Section Spacing

```
- Padding: 4rem 2rem vertical
- Max Width: 1200px container
- Margin: 0 auto for centering
- Margin Between Sections: 4rem
```

## Accessibility

### Color Contrast

```
Text on Background: Minimum 4.5:1 ratio
- Dark text (#1e293b) on white: 12:1 ✓
- White text on indigo (#6366f1): 5.5:1 ✓
```

### Interactive Elements

```
Minimum size: 44x44px for touch targets
Focus states: Always visible
Labels: Associated with inputs
Alt text: Provided for all images
Semantic HTML: Used throughout
```

## Performance Considerations

### CSS Optimization

```
- CSS Variables for theming
- Minified production builds
- Efficient selectors
- Minimal specificity
- GPU-accelerated animations (transform, opacity)
```

### Image Optimization

```
- Lazy loading ready
- Alt text provided
- Responsive sizes
- Format: JPG for photos, PNG for icons
```

---

## Design Token Summary

| Token           | Value   | Usage                   |
| --------------- | ------- | ----------------------- |
| Primary Color   | #6366f1 | Buttons, links, accents |
| Secondary Color | #ec4899 | Secondary actions       |
| Accent Color    | #f59e0b | Ratings, highlights     |
| Text Dark       | #1e293b | Headings, primary text  |
| Text Light      | #64748b | Secondary text          |
| Border          | #e2e8f0 | Dividers, borders       |
| Background      | #f8fafc | Page background         |
| Success         | #10b981 | Success states          |
| Danger          | #ef4444 | Error/danger states     |

---

_This design system ensures consistency, professionalism, and accessibility across the entire Hotel Booking application._
