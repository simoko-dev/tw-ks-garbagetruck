# tw-ks-garbagetruck

[![NPM version](https://img.shields.io/npm/v/@simoko/tw-ks-garbagetruck?color=a1b858&label=)](https://www.npmjs.com/package/@simoko/tw-ks-garbagetruck)


Installation
------------
    npm install @simoko/tw-ks-garbagetruck


Usage
-----
```js
import KSGarbageTruck from '@simoko/tw-ks-garbagetruck'

// 初始
const ksgt = new KSGarbageTruck()

// 更新清潔車資料, 可參考使用 setInterval 固定更新
await ksgt.fetchData()

console.log(ksgt.cache)
// 經 ksgt.fetchData() 獲取的資料
// 輸出格式：
// [{
//   car_licence: '車牌號',
//   caption: '目前位置',
//   dt: '更新時間',
//   x: 'lng 經度',
//   y: 'lat 緯度',
//   direct: '方向 ↖ ↗ ↘ ↙ ',
//   status: '0 | 90',
//   car_no: '"',
//   rcar_licence: '"',
//   cartype: 'N: 一般 | R: 一般+回收',
//   car_id: '車輛識別號',
//   dept_name: '行政區',
// }, ...
// ]

// 取得離指定座標最近的 50 筆資訊
// 可參考 navigator.geolocation.getCurrentPosition 授權取得使用者座標
// 或 https://developers.google.com/maps/documentation/geolocation/overview 無需授權取得使用者座標
const nes = ksgt.getNearestData(22.6877358, 120.2916524, 50)
```


## License

[MIT](./LICENSE) License © 2023 [Supra](https://github.com/supra126)
