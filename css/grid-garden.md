# WHY over flexbox?

- position items in 2d with grid-row-start and grid-column-start
- can ORDER layouts (from left->right, top->bot) lower order goes first

# display: grid;

- grid-template-columns: 20% 20% 20% 20% 20%; OR repeat(5, 20%)
- can use fr => 1fr + 3fr = 4fr to 1/4 and 3/4
- if you use px,%,ems with fr, first it will prio px,ems,% then use remaining space for fr
- grid-template-rows: " size repartition for rows
- grid-column-start: 3 is 1st cell of third column
- grid-column-end:4 where end is exclusive, spans item from start to end
- you can swap to end to start, but the left-most cell is inclusive and right-most is exclusive
- CAREFUL WITH NEGATIVE VALUES, -1 specifies last cell, but the exclusive rule doesnt apply to it, so have to use -2 (for example)
- so left->right:[,[;inc,ex;start;end
- right->left:],];exlusive, inc
- negative left->right:],] reverse of non-negative
- if split, so left->right:+,-, then [,]
- can also signify how many cells to span in end: span 2;
- can span the other way, so if end determined, span from there to start
- define grid-column for both seperated with (start)/(end)
- dont use span with negative values.....
- same idea with grid-row
- SIMPLEST: grid-area: grid-row-start/grid-column-start/grid-row-end/...
