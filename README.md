# Alpine Mouse Drag Plugin

[![npm version](https://img.shields.io/npm/v/alpine-mousedrag-plugin.svg)](https://www.npmjs.com/package/alpine-mousedrag-plugin)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/alpine-mousedrag-plugin)](https://bundlephobia.com/package/alpine-mousedrag-plugin)

An Alpine.js plugin that adds a `x-mousedrag` directive for mouse and touch drag scrolling with inertia. The plugin allows you to easily add drag-to-scroll functionality to any scrollable element.

## Features

- Mouse drag scrolling for any element with overflow
- Touch support for mobile devices
- Smooth inertia effect with configurable friction
- TypeScript support
- Zero dependencies (except for Alpine.js)

## Installation

```bash
# npm
npm install alpine-mousedrag-plugin
```

## Usage

### Module bundlers (Vite, Webpack, etc.)

```ts
import Alpine from 'alpinejs';
import AlpineMouseDragPlugin from 'alpine-mousedrag-plugin';

// Register the plugin
Alpine.plugin(AlpineMouseDragPlugin);

// Start Alpine
Alpine.start();
```

### Usage in HTML

```html
<div x-data x-mousedrag class="scrollable-element">
  <!-- Your scrollable content here -->
</div>
```

### Modifiers

- `disableinertia`: Use this modifier to disable the inertia effect.

```html
<div x-data x-mousedrag.disableinertia class="scrollable-element">
  <!-- Your scrollable content here -->
</div>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
