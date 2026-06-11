---
name: Core Infrastructure System
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-padding: 24px
  stack-gap: 16px
  grid-gutter: 20px
  sidebar-width: 260px
---

## Brand & Style

This design system is built for high-stakes cloud infrastructure management, emphasizing **reliability, precision, and technical clarity**. The aesthetic sits at the intersection of **Corporate Modern** and **Systematic Minimalism**, prioritizing the density of information without sacrificing cognitive ease.

The target audience consists of DevOps engineers and System Administrators who require a "heads-up display" experience. The UI evokes a sense of stability through a heavy, authoritative primary palette, contrasted against a clinical, airy workspace. Every element is designed to feel intentional and engineered, using subtle depth to separate critical monitoring data from administrative controls.

## Colors

The color palette is anchored by **Slate 950 (#0f172a)**, providing a high-contrast foundation for navigation and structural headers. This depth ensures that functional status colors are immediately perceivable.

- **Primary & Neutrals**: Used for structural elements, typography, and "Steady State" UI components.
- **Semantic States**: High-chroma Emerald and Crimson are reserved strictly for system status. Use soft, desaturated versions of these colors for badge backgrounds to ensure text remains the focal point.
- **Backgrounds**: The main workspace utilizes a cool-toned white to reduce eye strain during long monitoring sessions.

## Typography

The design system utilizes **Inter** for all primary interface text, chosen for its exceptional legibility in data-heavy environments and its neutral, professional character. 

- **Hierarchy**: Headlines use tighter letter-spacing and heavier weights to anchor sections. 
- **Monospace Integration**: **JetBrains Mono** is utilized for labels, IP addresses, VM IDs, and resource metrics. This distinction helps users immediately differentiate between "System Metadata" and "UI Navigation."
- **Data Tables**: Use `body-sm` for table rows to maximize vertical information density while maintaining a comfortable 20px line height.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The sidebar remains fixed at 260px, while the main content area utilizes a fluid 12-column grid.

- **Rhythm**: A 4px base unit governs all dimensions. Cards and major sections should default to 24px padding (`base * 6`).
- **Density**: In dashboard views, use "Compact" spacing (12px) between related stat cards to emphasize their connection. For form-heavy configuration screens, increase the vertical stack gap to 32px to provide clear cognitive breathing room.
- **Mobile**: On screens below 640px, the sidebar collapses into a drawer, and 12-column grids reflow into a single column stack with 16px margins.

## Elevation & Depth

This design system uses **Tonal Layering** supplemented by **Ambient Shadows** to define hierarchy.

1.  **Level 0 (Background)**: The `#f8fafc` canvas.
2.  **Level 1 (Cards/Surfaces)**: Pure white `#ffffff`. These use a very soft, diffused shadow: `0px 1px 3px rgba(15, 23, 42, 0.08), 0px 4px 6px rgba(15, 23, 42, 0.05)`.
3.  **Level 2 (Dropdowns/Modals)**: These use a more pronounced shadow to indicate temporal interaction: `0px 10px 15px rgba(15, 23, 42, 0.1)`.

Avoid heavy inner shadows or gradients. Depth should feel like physical paper layers stacked on a cool desk.

## Shapes

The design system employs a **Rounded (8px)** corner strategy for cards and input fields. This softens the "technical" feel of the data, making the dashboard feel more like a modern SaaS application and less like a legacy terminal.

- **Buttons & Inputs**: Default to `0.5rem` (8px) for a balanced, professional look.
- **Status Badges**: Use the **Pill** shape (9999px) to distinguish them from interactive buttons or static cards.
- **Selection States**: Highlighting a row or card should use a 2px border radius internal to the parent container's 8px radius.

## Components

### Buttons
- **Primary**: Solid Slate 950 with white text. On hover, shift to Slate 800.
- **Success/Danger**: Solid Emerald/Crimson. Use these only for "Commit" actions (e.g., "Start VM" or "Delete Resource").
- **Ghost/Secondary**: Slate 950 outline with 1px width. Transparent background.

### Status Badges
- **Active/Running**: Emerald 100 background with Emerald 700 text.
- **Error/Stopped**: Crimson 100 background with Crimson 700 text.
- **Provisioning**: Amber 100 background with Amber 700 text.

### Cards
Cards are the primary container for VM stats. They must include a subtle 1px border (#e2e8f0) in addition to the shadow to ensure definition against the light grey background. 

### Data Tables
Tables are the heart of the VM Manager. Rows should have a subtle hover state (#f1f5f9) and 1px horizontal dividers. Columns containing numeric data or IDs must use the Monospace label font for alignment precision.

### Navigation
The sidebar uses the Primary color (#0f172a) as its background. Nav items should have an "active" state indicated by a left-hand 4px Emerald border and a subtle white opacity increase for the icon and text.