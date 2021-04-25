# Grid Drawer

The grid list plugin for JavaScript, because the effect just like drawer so name as "Grid Drawer".

![Grid Drawer demo gif](https://waveciou.github.io/grid-drawer/img/demo.gif "Grid Drawer demo gif")

## Demo

[https://waveciou.github.io/grid-drawer](https://waveciou.github.io/grid-drawer/)

## Usage

### 1. Include CSS & JS Files

The animation effects is used by [velocity.js](https://github.com/julianshapiro/velocity), so you must be import this animation library before use plugin.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <link rel="stylesheet" href="./css/grid-drawer.css" />
  </head>
  <body>
    ...
    <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/2.0.6/velocity.min.js"></script>
    <script src="./js/grid-drawer.js"></script>
  </body>
</html>
```

### 2. Add Grid Drawer HTML Layout

In your HTML file, join your inside and outside contents.

```html
<div id="gridDrawer">
  <div class="gd__item">
    <div class="gd__outside">headline of block 01</div>
    <div class="gd__inside">contents of block 01...</div>
  </div>
  <div class="gd__item">
    <div class="gd__outside">headline of block 02</div>
    <div class="gd__inside">contents of block 02...</div>
  </div>
  ....
</div>
```

### 3. Initialize

The grid system is execute with one group of five items, and include responsive web design.

```js
// default
const gridDrawer = new GridDrawer('#gridDrawer');

// with configuration
const gridDrawer = new GridDrawer('#gridDrawer', {
  classNameItems: '.gd__item',
  classNameOutside: '.gd__outside',
  classNameInside: '.gd__inside',
  animateEasing: 'easeInOutQuint',
  animateTime: 600
});
```

### 4. Create Elements From Data

You can create the array of elements in configuration. It will be first to render HTML elements.

```html
<div id="gridDrawer"></div>
```

You must be setting HTML element of inside and outside in data list.

```js
  const gridDrawer = new GridDrawer('#gridDrawer', {
    classNameItems: '.gd__item',
    classNameOutside: '.gd__outside',
    classNameInside: '.gd__inside',
    animateEasing: 'easeInOutQuint',
    animateTime: 600,
    data: [
      {
        outside: `<p>Block 01</p>`,
        inside: `<p>Contents of block 01</p>`
      },
      {
        outside: '<p>Block 02</p>',
        inside: '<p>Contents of block 02</p>'
      },
      ...
    ]
  });
```

## Parameters

| Parameter        | Type     | Default          | Description |
| --------------   | -------- | ---------------- | ------------ |
| classNameItems   | string   | '.gd__item'      | class name of block item |
| classNameOutside | string   | '.gd__outside'   | class name of outside div |
| classNameInside  | string   | '.gd__inside'    | class name of inside div |
| animateEasing    | string   | 'easeInOutQuint' | the animation easing name, you can get [here](http://velocityjs.org/#easing) to read more information |
| animateTime      | number   | 600              | the animation duration |
| data             | array    | undefined        | HTML elements list |

## Methods

| Method      | Description |
| ----------- | ----------- |
| destroy(deleteInstance) | Destroy instance and detach all events listeners. <br> **deleteInstance** -  Boolean, set it to `false` to not to delete instance, by default it is `true`. |
## Instance
- [東北角國家風景區 - 美食單元](https://www.necoast-nsa.gov.tw/Food-Intro.aspx?a=126&l=1)
- [台灣好湯網 - 泉質單元](https://taiwanhotspring.net/Quality-Intro.aspx?a=51&l=1)
- [720°VR走進故宮 - 空間導讀單元](https://tech2.npm.edu.tw/720vr/chProject.html)

## License

[MIT](https://github.com/waveciou/grid-drawer/blob/master/LICENSE.md)