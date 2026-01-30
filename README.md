# Preventing FOUC with Web Components

This project demonstrates a simple CSS technique to eliminate **Flash of Unstyled Content (FOUC)** when loading Web Components and Custom Elements.

## The Problem

When using Web Components (especially when lazy-loaded from a CDN), there's often a brief moment where the custom elements appear as unstyled content before the browser registers and upgrades them. This creates a jarring visual experience known as FOUC.

## The Solution

A simple 4-line CSS snippet that hides the page until all custom elements are defined:

```css
body:has(:not(:defined)) {
    opacity: 0;
    transition: opacity 0s 100ms;
}
```

Check out a live demo of it here:
https://break-stuff.github.io/css-reduced-web-component-fouc/

### How It Works

1. **`:not(:defined)`** - Selects any custom elements that haven't been defined yet
2. **`body:has(...)`** - Checks if the body contains any undefined elements
3. **`opacity: 0`** - Hides the entire page while custom elements are loading
4. **`transition: opacity 0s 100ms`** - Adds a 100ms delay before showing as a fallback in case there is a delay or problem defining your components. This can be configured to meet your needs. An important note is that visual appeal can be assessed within 50ms by a user, so try not to go crazy.

Once all custom elements are registered, the `:not(:defined)` selector no longer matches anything, the `body:has()` condition becomes false, and the page becomes visible.

## Demo Pages

- **`index.html`** - Shows the FOUC problem (no CSS fix applied)
- **`page2.html`** - Demonstrates the solution (CSS fix applied)

Both pages load the same [Shoelace](https://shoelace.style/) web components from a CDN to illustrate the difference.

## Running the Project

### Prerequisites

- Node.js installed on your system

### Installation & Running

```bash
# Install dependencies
npm install

# Start the development server
npm start
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