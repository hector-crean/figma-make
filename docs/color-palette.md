# Shadcn Color Palette

This color palette was exported from the Figma design: [OTS_UI_Kit](https://www.figma.com/design/Qh9TF2abYAutnaEqInMy6l/OTS_UI_Kit?node-id=7057-60387&m=dev)

## Color Variables

All colors are defined as CSS variables in `src/app/globals.css` using the OKLCH color space:

### Primary Colors

- `--primary`: `oklch(0.932 0.032 255.6)` - Your primary brand color
- `--primary-foreground`: `oklch(0.373 0.031 259.7)` - For elements on top of primary

### Secondary Colors

- `--secondary`: `oklch(0.904 0.025 238.4)` - Your secondary brand color
- `--secondary-foreground`: `oklch(0.373 0.031 259.7)` - For elements on top of secondary

### Accent Colors

- `--accent`: `oklch(0.629 0.139 249.8)` - Highlight color for active or focused elements
- `--accent-foreground`: `oklch(0.210 0.006 285.9)` - For elements on top of accent

### Background & Foreground

- `--background`: `oklch(0.825 0.043 234.1)` - Main application background color
- `--foreground`: `oklch(0.411 0.093 239.2)` - For elements on top of background

### Card Colors

- `--card`: `oklch(0.604 0.140 250.0)` - Background color for cards
- `--card-foreground`: `oklch(1.000 0.000 0)` - For elements on top of card

### Popover Colors

- `--popover`: `oklch(0.736 0.111 230.5)` - Background color for things like select menus
- `--popover-foreground`: `oklch(0.970 0.000 0)` - For elements on top of popover

### Muted Colors

- `--muted`: `oklch(0.610 0.105 283.5)` - Subtle background for elements requiring less attention
- `--muted-foreground`: `oklch(0.978 0.005 258.3)` - For elements on top of muted

### Destructive Colors

- `--destructive`: `oklch(0.697 0.154 320.1)` - For errors and destructive actions like delete
- `--destructive-foreground`: `oklch(1.000 0.000 0)` - For elements on top of destructive

### Border & Input Colors

- `--border`: `oklch(0.922 0.000 0)` - Main border color
- `--input`: `oklch(0.922 0.000 0)` - Border color for form input elements
- `--ring`: `oklch(0.709 0.000 0)` - Helps define the focus indicator

### Radius

- `--radius`: `0.875rem` (14px) - Base border radius

## Usage

These colors are automatically available throughout your application via Tailwind CSS classes:

```tsx
// Example usage
<div className="bg-primary text-primary-foreground">
  Primary colored element
</div>

<div className="bg-card text-card-foreground">
  Card element
</div>
```

## Export Date

Exported on: $(date)
