# CSS

We use SASS as a pre-processor and have the ability to drop in parts, for example, of the [Twitter Bootstrap](https://getbootstrap.com/docs/4.0) framework if needed and deemed reasonable.

## Setup
We follow a modified approach of the ITCSS *(Inverted Triangle CSS)* methodology to keep our CSS code base scalable and maintainable. For a deeper introduction to ITCSS you might want to read more [here](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) or [here](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/). If you don't want to read more, simply stick to these rules to keep our file structure clean:

* Each component has its own stylesheet, which is located in the component folder. Do not target anything else than the actual component from this stylesheet. Angular component styles also have a few [special selectors](https://angular.io/guide/component-styles#special-selectors).
* Shared or global styles, mixins, settings etc. are located in `/src/sass/`. Each SCSS file is prefixed with the *layer* it belongs to, to understand the concept of layers and how to order these SCSS files, what follows is a copy of our `/src/sass/main.scss` file including the relevant comments to describe the layers:

```
// LAYER 1: SETTINGS
//
// =======================================================================
//
// This holds any global settings for your project. This layer should
// only house settings that need to be accessed from anywhere. Examples
// of global settings might be things like the base font size, colour
// palettes, config (for example, $environment: dev;) and so on.
//
// Does not output any CSS
  
@import "import.settings";
  
// LAYER 2: TOOLS
//
// =======================================================================
//
// The next layer houses your globally available tooling – namely mixins
// and functions. Any mixin or function that does not need accessing
// globally should belong in the partial to which it relates. The Tools
// layer comes after the Settings layer because a mixin may require one
// of the global settings as a default parameter. Examples of global tools
// might be gradient mixins, font-sizing mixins and so on.
//
// Does not output any CSS
  
@import "import.tools";
  
// LAYER 3: VENDOR
//
// =======================================================================
//
// This should be a suitable layer for your CSS framework of choice etc.
// It is actually likely to include both generic stuff like resets and
// element specific stuff.
  
@import "vendor.bootstrap";
@import "vendor.bootstrap.components";
  

// LAYER 4: ELEMENTS
//
// =======================================================================
//
// These are bare, unclassed HTML elements. What does an h1 look like without
// a class on it? What does an a look like without a class on it? The Elements
// layer binds onto bare HTML element (or 'type') selectors only. It is still
// a very low-specificity layer, but affects slightly less of the DOM, and is
// slightly more opinionated, hence its location in the Triangle.
//
// The Elements layer is typically the last one in which we'd find bare,
// element-based selectors, and is very rarely added to or changed after
// initial setup. Once we have defined element-level styles, all additions
// and deviations should be implemented using classes.
//
// .navbar {                  ->  .block {                    -> Block component
//   &__item {                ->    &__element {              -> Element that depends upon the block
//     &--active {}           ->      &--modifier {}          -> Modifier that changes the style of the block
//   }                        ->    }
// }                          ->  }
  
@import "elements.root";
@import "elements.links";
@import "elements.buttons";
@import "elements.typography";
@import "elements.lists";
  
// LAYER 5: OBJECTS
//
// =======================================================================
//
// This is the first layer in which we find class-based selectors. These are
// concerned with styling non-cosmetic design patterns, or 'objects'. Objects
// can range from something as simple as a .wrapper element, to layout systems,
// through to things like the OOCSS poster child – the Media Object. This layer
// affects less of the DOM than the last layer, has a higher specificity, and
// is slightly more explicit in that we are now targeting sections of the DOM
// with classes.
  
@import "objects.grid";
  
// LAYER 6: COMPONENTS
//
// =======================================================================
//
// The Components layer is where we begin to style recognisable pieces of UI.
// We're still binding onto classes here, so our specificity hasn't yet increased.
// However, this layer is more explicit than the last one in that we are now
// styling explicit, designed pieces of the DOM.
//
// We shouldn't find any selectors with a lower specificity than one class in this layer.
// This is where the majority of your work will happen after initial project set-up
// and our UI components are often composed of Objects and Components
  
// ==> Component styles are imported via component metadata
  
// LAYER 7: TRUMPS
//
// =======================================================================
//
// This layer beats – or 'trumps' – all other layers, and has the power to override
// anything at all that has gone before it. It is inelegant and heavy-handed, and
// contains utility and hide helper classes, hacks and overrides.
//
// A lot of the declarations in this layer will carry !important
  
@import "trumps.utils";

```
 
## Naming Conventions
* We prefer classes over IDs and follow the BEM approach (see comments in `main.scss`) for naming our classes.
* Every class is prefixed with `app-`, so for example your outer component container will be `.app-my-component`
 
## (S)CSS Nesting
* Do not forget that your SCSS is compiled to old school CSS and we want to keep our CSS selectors as short as possible. As a rule of thumb, only use nesting in SCSS if it makes sense in CSS and if you are nesting more than 3 levels deep, you should re-think your solution.
* That being said, we do use the SCSS `&` ampersand and nesting feature in combination with the BEM naming convention to keep our stylesheets predictable (without adding unwanted CSS output).

## Component Styles
To use variables, mixins etc. inside a component stylesheet, import the following file inside your component (it does not output any CSS):
```
@import "~sass/import.component";
```
 (You do not need to specify a path, because the `/src/sass/` and `/node_modules/bootstrap/scss` directories are included as search paths in `.angular-cli.json`.)
 
 
## Grid
Our grid is based on Bootstrap's grid. We use our own classes to build our grid markup:
 
```
<div class="app-grid__container--full-width">
  <div class="app-grid__row">
    <div class="app-grid__col app-example__first">first col</div>
    <div class="app-grid__col app-example__second">second col</div>
  </div>
</div>
```

As usual, one row contains 12 columns. We set these columns via SCSS mixins to keep the markup lean:

```
.app-example {
  &__first {
    @include make-col(8);
  }
  
  &__second {
    @include make-col(4);
  }
}
```


## Mobile-First / Breakpoints
We follow a mobile-first approach when styling our components:

```
.app-example {
  &__foo {
    color: blue; // xs
    
    @include media-breakpoint-up(sm) {
      color: red;
    }
    
    @include media-breakpoint-up(md) {
      color: green;
    }
    
    @include media-breakpoint-up(lg) {
      color: yellow;
    }
    
    @include media-breakpoint-up(xl) {
      color: lime;
    }
  }
}
```
These are our breakpoints:

* xs: 0,
* sm: 576px,
* md: 768px,
* lg: 1024px,
* xl: 1200px
