# anatomy

```
@media screen (min-width:320px) and (max-width:768px)
```

- @media [media-type] ([media-feature])
- media-type:
  - all devices
  - screen devices with screens

# responsive designs with flexbox and grid

- breakpoint at 400px

```
.container {
    --w: 400px;
    --n: 4;
    --m: 2;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(100%/(var(--n) + 1) + 0.1%, (var(--w) - 100vw)*1000, 100%/(var(--m) + 1) + 0.1%), 1fr));
    gap: 10px;
}
```

- breakpoint at W1 and W2, where 0-400=>1 element, 400-800=>2 elements and 800+=> 5 elements

```
.container {
    --w1: 800px;
    --w2: 400px
    --n: 5;
    --m: 2;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(
        clamp(
            clamp(
                100%/(var(--n) + 1) + 0.1%,
                (var(--w1) - 100vw) * 1000,
                100%/(var(--m) + 1) + 0.1%
            ),
            (var(--w2) - 100vw) * 1000,
            100%
        ),
        1fr
    ));
    gap: 10px;
}
```
