# Core Component Library

A comprehensive component library built with the Cold War aerospace aesthetic in mind. All components are theme-aware and adapt to both Dieter Rams and Miami Vibes themes.

## Components

### Panel

A bordered container component with optional header, perfect for compartmentalized sections.

**Props:**
- `title?: string` - Optional header title
- `children: React.ReactNode` - Panel content
- `className?: string` - Additional CSS classes
- `variant?: 'default' | 'bordered' | 'elevated'` - Visual style variant
- `headerVariant?: 'default' | 'primary' | 'accent'` - Header color variant

**Example:**
```tsx
<Panel title="MISSION OVERVIEW" variant="bordered" headerVariant="primary">
  <p>Content goes here</p>
</Panel>
```

---

### StatusBadge

Mission stamp-style status indicator with various status types.

**Props:**
- `status: StatusType` - Status type: 'operational' | 'deployed' | 'active' | 'experimental' | 'archived' | 'r-d'
- `className?: string` - Additional CSS classes
- `variant?: 'default' | 'stamp' | 'badge'` - Visual style variant

**Example:**
```tsx
<StatusBadge status="deployed" variant="stamp" />
```

---

### Button

Primary and secondary button variants with multiple sizes.

**Props:**
- `variant?: 'primary' | 'secondary' | 'outline' | 'ghost'` - Button style
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `children: React.ReactNode` - Button content
- `className?: string` - Additional CSS classes
- All standard button HTML attributes

**Example:**
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  INITIATE TRANSMISSION
</Button>
```

---

### Stamp

Rotated mission stamp component for decorative labels.

**Props:**
- `text: string` - Stamp text
- `className?: string` - Additional CSS classes
- `variant?: 'default' | 'rotated' | 'badge'` - Visual style variant
- `color?: 'primary' | 'accent' | 'success' | 'warning'` - Color variant

**Example:**
```tsx
<Stamp text="FIELD TESTED" variant="rotated" color="success" />
```

---

### TechStackIcon

Geometric tech badges for displaying technology stack.

**Props:**
- `tech: TechStackType` - Technology: 'react' | 'nextjs' | 'typescript' | 'python' | 'unity' | 'nodejs' | 'tailwind' | 'git'
- `className?: string` - Additional CSS classes
- `size?: 'sm' | 'md' | 'lg'` - Icon size
- `showLabel?: boolean` - Show technology label below icon

**Example:**
```tsx
<TechStackIcon tech="react" size="md" showLabel />
```

---

### ProjectCard

Technical spec sheet-style card for displaying projects.

**Props:**
- `projectId: string` - Project identifier
- `title: string` - Project title
- `description: string` - Project description
- `dateRange: string` - Project date range
- `status: StatusType` - Project status
- `techStack: TechStackType[]` - Array of technologies used
- `link?: string` - Optional project link
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<ProjectCard
  projectId="PROJECT-2024-001"
  title="Portfolio Website"
  description="A Cold War aerospace-themed portfolio site"
  dateRange="2024-01 - 2024-03"
  status="deployed"
  techStack={['react', 'nextjs', 'typescript']}
  link="https://example.com"
/>
```

---

### Input

Form input component with label and error handling.

**Props:**
- `label?: string` - Input label
- `error?: string` - Error message
- `className?: string` - Additional CSS classes
- All standard input HTML attributes

**Example:**
```tsx
<Input
  label="SENDER_ID"
  type="text"
  placeholder="Enter your name"
  error={errors.name}
/>
```

---

### Textarea

Form textarea component with label and error handling.

**Props:**
- `label?: string` - Textarea label
- `error?: string` - Error message
- `className?: string` - Additional CSS classes
- All standard textarea HTML attributes

**Example:**
```tsx
<Textarea
  label="MESSAGE_CONTENT"
  placeholder="Enter your message"
  rows={5}
  error={errors.message}
/>
```

---

## Theme Awareness

All components automatically adapt to the current theme (Dieter Rams or Miami Vibes) and mode (light or dark). Colors are managed through CSS custom properties defined in `globals.css`.

## Usage

Import components from the ui directory:

```tsx
import { Panel, Button, StatusBadge } from '@/app/components/ui';
```

Or import individually:

```tsx
import Panel from '@/app/components/ui/Panel';
import Button from '@/app/components/ui/Button';
```

## Styling

Components use Tailwind CSS classes and theme-aware color variables:
- `bg-primary`, `text-primary` - Primary theme color
- `bg-accent`, `text-accent` - Accent theme color
- `bg-background`, `text-text` - Background and text colors
- `bg-muted`, `text-secondary` - Muted/secondary colors

All components support responsive design and are mobile-friendly.

