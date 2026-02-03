# Preventing FOUC with Web Components

This project demonstrates a simple CSS technique to eliminate **Flash of Unstyled Content (FOUC)** when loading Web Components and Custom Elements.

## The Problem

When using Web Components (especially when lazy-loaded from a CDN), there's often a brief moment where the custom elements appear as unstyled content before the browser registers and upgrades them. This creates a jarring visual experience known as FOUC.

## The Solution

A simple CSS snippet that hides the page until all custom elements are defined:

```css
/* must define property to work properly for all browsers */
@property --wc-loaded {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

body {
  /* start timeout regardless if there are undefined components */
  animation: showBody 0s linear 100ms forwards;
  
  /* hide for until components are defined or 100ms - whichever comes first */
  &:has(:not(:defined)) {
    opacity: var(--wc-loaded, 0);
  }
}

/* update variable to prevent opactity flash for subsequent component loads */
@keyframes showBody {
  to {
    --wc-loaded: 1;
  }
}
```

Check out a live demo of it here:
https://break-stuff.github.io/css-reduced-web-component-fouc/

### How It Works

This solution uses a clever combination of CSS selectors, custom properties, and animations to prevent FOUC while maintaining a good user experience:

1. **`@property --wc-loaded`** - Defines a custom CSS property with an initial value of `0`. This is required for proper browser compatibility and serves as a flag to track component loading state.

2. **`animation: showBody 0s linear 100ms forwards`** - Sets up a zero-duration animation with a 100ms delay. This serves two purposes:
   - Creates a timeout mechanism that ensures the page displays after 100ms even if components are slow to load
   - Updates the `--wc-loaded` property to `1` after the delay

3. **`:not(:defined)`** - A powerful CSS pseudo-class that selects any custom elements that haven't been registered with the browser yet. This includes all web components that are still loading or haven't been defined.

4. **`body:has(:not(:defined))`** - Uses the `:has()` pseudo-class to check if the body contains ANY undefined custom elements. This selector dynamically evaluates as components are defined.

5. **`opacity: var(--wc-loaded, 0)`** - Sets the body opacity to the value of `--wc-loaded` (defaulting to 0). When undefined components exist:
   - Initially: opacity is `0` (page hidden)
   - After 100ms: `--wc-loaded` becomes `1` (page shows)
   - After all components load: the `:has(:not(:defined))` selector stops matching, removing the opacity override entirely

6. **`@keyframes showBody`** - Defines the animation that updates the `--wc-loaded` property to `1`. This prevents opacity flashing when new components are dynamically added to the page after initial load.

**The Magic:** Once all custom elements are registered, the `:not(:defined)` selector no longer matches anything, causing the `body:has(:not(:defined))` condition to become false. This removes the opacity rule, and the page becomes fully visible. For fast connections, the 100ms timeout ensures minimal delay, while slow connections still show content rather than leaving users with a blank screen indefinitely.

## Demo Pages

This project includes three demo pages that showcase different aspects of the FOUC prevention technique:

### 1. `index.html` - With FOUC (The Problem)

This page intentionally **does not** include the CSS fix, allowing you to see the FOUC problem in action. When you load this page (especially on slower connections or with throttled network speeds), you'll notice:
- Custom elements briefly appear as unstyled, fallback content
- Component styling "pops in" as the web components are registered
- A jarring visual flash as elements upgrade from undefined to defined

**Purpose:** Demonstrates the baseline problem that needs solving.

### 2. `page2.html` - Without FOUC (The Solution)

This page includes the complete CSS solution in a `<style>` block in the head. The page demonstrates:
- Smooth loading with no visual flash of unstyled content
- The page remains hidden (opacity: 0) until components are defined or 100ms timeout
- Includes an "Add Unknown Element" button to test how the solution handles dynamically added undefined elements

**Purpose:** Shows the CSS fix working under normal page load conditions.

### 3. `page3.html` - Without FOUC (Dynamic Injection)

This page also includes the CSS fix and specifically tests dynamic component injection scenarios:
- **"Add Select Component" button** - Dynamically injects a new `<sl-select>` component that needs to be loaded and defined
- **"Add Unknown Element" button** - Injects a completely undefined custom element (`<not-defined>`) to demonstrate how the solution prevents flashing when new undefined elements are added after initial page load
- Shows how the `--wc-loaded` custom property prevents opacity flashing for subsequent component loads

**Purpose:** Demonstrates that the solution works for dynamically added components, not just initial page load.

### Key Differences

All three pages load the same [Shoelace](https://shoelace.style/) web components to ensure a fair comparison:
- Same component library
- Same components used on each page
- Only difference is the presence (or absence) of the CSS fix

This makes it easy to see the impact of the solution by comparing page behavior side-by-side.

## Running the Project

### Prerequisites

- Node.js installed on your system

### Installation & Running

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The server will start and you can view the demo in your browser. Navigate between the two pages to see the difference:

- Visit the "With FOUC" page to see the problem
- Visit the "Without FOUC" page to see the solution in action

## Browser Compatibility

This technique works in all modern browsers that support:
- CSS `:has()` pseudo-class
- CSS `:not()` pseudo-class
- CSS `:defined` pseudo-class

## Credits

This demo uses [Shoelace](https://shoelace.style/) web components to demonstrate the FOUC issue and the solution.