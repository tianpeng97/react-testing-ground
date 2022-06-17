# GRID VS FLEX???

- flex 1D layouts - row or column
- grid for 2D layouts: row and column

# display: flex; container properties

- `justify-content` aligns items HORIZONTALLY with values:

  - `flex-start` left side of container
  - `flex-end` right side of container
  - `center` center of container
  - `space-between` equal spacing between items
  - `space-around` equal spacing around items

- `align-items` aligns items VERTICALLY with values:

  - `flex-start` top side of container
  - `flex-end` bottom side of container
  - `center` center of container
  - `baseline` baseline of container
  - `stretch` stretch items to fit container

- `align-content` set how multiple lines are spaced apart from each other:

  - `flex-start` lines packed top side of container
  - `flex-end` lines packed bottom side of container
  - `center` lines packed center of container
  - `space-between` lines display equal spacing between items
  - `space-around` lines display equal spacing around items
  - `stretch` lines are stretched to fit container

- `flex-direction` directions items are placed in container (NOTE: CHANGES `justify-content` and `align-items` direction too!!!) (NOTE: column ruler is left border and row is top border):

  - `row` items are same direction as text
  - `row-reverse` opposite of text direction (so start right border SO NOTE: `flex-start` starts right border, `flex-end` is left border)
  - `column` top to bottom items
  - `column-reverse` bottom to top items (actually starts bottom of container)

- `flex-wrap`:

  - `nowrap` every item fits into 1 line
  - `wrap` items wrap around additional lines
  - `wrap-reverse` wrap in reverse (just switches side to opposite based on direction)

- `flex-flow` combines `flex-direction` and `flex-wrap` (e.g. `flex-flow: row wrap`)

# items properties

- `order` integer values of order
- `align-self` same values as `align-items`
