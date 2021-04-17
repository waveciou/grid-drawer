# Grid Drawer

[Demo](https://waveciou.github.io/grid-drawer/)

自製的伸縮動畫的格子選單 Plugin，因為效果長得很像抽屜，所以取名叫做 「Grid Drawer」。

![Grid Drawer Demo](https://waveciou.github.io/grid-drawer/img/demo.gif "Grid Drawer Demo")

## Usage

### 1. CSS & JS Files

Grid Drawer 的動畫效果是使用 [velocity.js](https://github.com/julianshapiro/velocity) 製作的，必須要先載入此動畫函式庫才可以使用。

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

依照此 HTML 結構添加每個區塊對應的標題與內容項目。

```html
<div id="gridDrawer">
  <div class="gd__item">
    <div class="gd__outside">
      區塊1的標題...
    </div>
    <div class="gd__inside">
      區塊1的內容...
    </div>
  </div>
  <div class="gd__item">
    <div class="gd__outside">
      區塊2的標題...
    </div>
    <div class="gd__inside">
      區塊2的內容...
    </div>
  </div>
  ....
</div>
```

### 3. Initialize

Grid Drawer 會以每 5 個區塊為群組來處理，並包含 RWD 自適應效果。

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

## Parameters

| Parameter        | Type     | Default          | Description |
| --------------   | -------- | ---------------- | ------------ |
| classNameItems   | string   | '.gd__item'      | 區塊項目的 Class Name |
| classNameOutside | string   | '.gd__outside'   | 區塊標題的 Class Name |
| classNameInside  | string   | '.gd__inside'    | 區塊內容的 Class Name |
| animateEasing    | string   | 'easeInOutQuint' | 動畫的 Easing Name，可以至[這裡](http://velocityjs.org/#easing)，查看更多相關資訊。 |
| animateTime      | number   | 600              | 動畫的持續時間 |

## Instance
- [東北角國家風景區 - 美食單元](https://www.necoast-nsa.gov.tw/Food-Intro.aspx?a=126&l=1)
- [台灣好湯網 - 泉質單元](https://taiwanhotspring.net/Quality-Intro.aspx?a=51&l=1)
- [720°VR走進故宮 - 空間導讀單元](https://tech2.npm.edu.tw/720vr/chProject.html)

## License

[MIT](https://github.com/waveciou/grid-drawer/blob/master/LICENSE.md)