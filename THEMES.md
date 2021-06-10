# Themes

## What is this?

This is an overview of how Utilities For Me supports multiple dynamic themes.

## Why make this?

Utilities For Me supports multiple themes via Tailwind and CSS variables. The mechanism is a bit complicated, and a bit counter to normal tailwind design principles (even though accomplishing it is easier than most frameworks make it) so I figured I would take a moment to layout the general flow for future Matt so here we go.

## Design System

**Format:**

The general structure:

`[entity]-color-[fill/complement]-[state]`

Here the optional `entity` field (as denoted by `[]`) can be replaced by with something called `text` for text colors. The semi-optional `complement` is used only for background colors and is intended to enrich an otherwise monotone feel. The optional `state` qualifier is intended to denote entity state and shouldn't be used where entity is not provided. An example of fully leveraging this might look like:

`primary-fill`

OR

`text-primary-hover`

**Colors:**

*Base:*

- Primary / Primary Complement:
    - CSS Variable Name(s): [`primary-fill`, `primary-complement`]
    - The `primary-fill` theme color is intended for use in the base site. This color will be what all other components sit on top of and use as their backdrop.  
    - The `primary-complement` theme color is intended for use in the base site. This color will be used to enliven your primary color without being too much of a draw. Think horizontal rules or input highlights.

- Secondary / Secondary Complement 
    - CSS Variable Name(s): [`secondary-fill`, `secondary-complement`]
    - The `secondary-fill` theme color is intended for use in the base site. This color will be what secondary elements in the main body (`<header>`/`<footer>`) get their color from.
    - The `secondary-complement` theme color is intended for use in the base site. This color will be used to enliven your secondary color without being too much of a draw. Think horizontal rules or input highlights.

*Base Text*

- Text Primary:
    - CSS Variable Name(s): [`text-primary`, `text-primary-hover`, `text-primary-disabled`, `text-primary-complement`]
    - The `text-primary` text color is intended for use in the base site. This color will be the main text color your user sees so it should appear clearly on your `primary-fill` and possibly your `secondary-fill` depending on how different the two are in your use case (not all pallettes have primary and secondary color that shift the text color too dramatically). The variations here (`hover` and `disabled`) are obvious, **but I will address them here and nowhere else so no one can say they were left unexplained**. The `hover` modifier is the text color you'd like your primary text color to change to in the event it is hovered over by a mouse and `disabled` is the color you'd like it changed to in the event that it is disabled and unusable.
    - The `text-primary-complement` like the `primary-complement` intended to enrich text on a primary base. It is decorative and at this time will not be getting state based modifications to keep the pallette smaller.

- Text Secondary:
    - CSS Variable Name(s): [`text-secondary`, `text-secondary-hover`, `text-secondary-disabled`, `text-primary-complement`]
    - The `text-secondary` text color is intended for use in the base site. This color will be the secondary text color your user sees so it should appear clearly on your `secondary-fill` and possibly your `primary-fill`.

### Primary Pallette Example

- `primary-fill`: White `#FFFFFF`
- `primary-complement`: Ghost White `#F8F8FF`
- `secondary-fill`: Grey `#808080`
- `secondary-secondary`: LightGrey `#D3D3D3`
- `text-primary`
- `text-primary-hover`
- `text-primary-disabled`
- `text-primary-complement`
- `text-secondary`
- `text-secondary-hover`
- `text-secondary-disabled`