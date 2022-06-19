# absolute lengths

- `px`: not screen pixels (angular measurement)
- `in`: inches mapped directly to pixels
- `cm`: mapped to pixels

# font-relative lengths

- `em`: length changes based on `font-size` (not `font-family`), at base 1 em == 12 pt, em elements multiply themselves if nested
- `rem`: always relative to ROOT element (:root {})

# viewport percentage lengths

- vw: viewport-width where 1vw == 1% of width of viewport where viewport == browser window size == window object
- vh: viewport-height
- vmin,vmax: min/max of vw or vh

# odd ball

- %: length based on parent element
