# Creatopy Code Challenge

To start the project locally:

1. `yarn install`
2. `yarn dev`

## Implemented features

The application has a basic landing page and a banner renderer page with SSR.

The banner renderer page knows how to render the following:

Banner Wrapper:

- Dimension
- Background (solid only)
- Border

For each banner layer type mentioned below it knows how to handle:

- Dimension
- Position
- Shadow
- Rotation
- Blur

Texts:

- Font Size
- Font Weight
- Font Family
- Color
- Text Alignment
- Line Height
- Letter Spacing
- Direction

Images:

- Background Position Offset
- Scale

Buttons:

- Background (solid only)
- Border
- Text

I chose these features to be able to recreate the [example banner](https://embed.creatopy.com/?hash=j2308jq) given in the challenge description (without animations of course).

## Most challenging aspect

The most challenging part was to make an estimation about what can I implement in a single day. Implementing a decent "MVP" that covers the basic requirements in such a way that it would be possible to continue building on top of it was not easy.

## What would I do differently if I had more time

I would start with considering how the addition of animations would change the structure of the code. I think that would require to refactor everything I did in this challenge. So in conclusion if I would start this challenge with more time the first thing I would do is to set up a scaleable pattern to implement animations in the banners.
