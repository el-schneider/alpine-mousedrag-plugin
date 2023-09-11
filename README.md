# Alpine Mouse Drag Plugin

An Alpine.js plugin that adds a `x-mousedrag` directive for mouse drag scrolling with inertia. The plugin allows you to easily add drag-to-scroll functionality to any scrollable element.

## Installation

Install the package via npm:

```bash
npm install alpine-mousedrag-plugin
```

Or via yarn:

```bash
yarn add alpine-mousedrag-plugin
```

## Usage

First, import and initialize the plugin:

```typescript
import Alpine from "alpinejs";
import AlpineMouseDragPlugin from "alpine-mousedrag-plugin";

Alpine.plugin(AlpineMouseDragPlugin);
Alpine.start();
```

Then, add the `x-mousedrag` directive to any scrollable element:

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

## License

MIT
