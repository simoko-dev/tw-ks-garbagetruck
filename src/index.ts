import Distance from '@simoko/geo-distance'
import fetch from 'node-fetch'

/**
 * 垃圾車資料
 * @property car_licence 車牌號 ex: KEL-3610
 * @property caption 目前位置 ex: 三民西及左營區隊停車場
 * @property dt 更新時間 YYYY-MM-DD HH:mm:ss
 * @property x lng 經度 ex: 120.278997
 * @property y lat 緯度 ex: 22.642973
 * @property direct 方向 ↖ ↗ ↙ ↘
 * @property status 0 | 90 用途不詳
 * @property car_no 用途不詳
 * @property rcar_licence 總是空字串
 * @property cartype N 一般 | R 一般+回收
 * @property car_id 車輛編號 ex: 4080734162
 * @property dept_name 行政區 ex: 新興區
 */
export interface IData {
  car_licence: string
  caption: string
  dt: string
  x: string
  y: string
  direct: string
  status: string
  car_no: string
  rcar_licence: string
  cartype: string
  car_id: string
  dept_name: string
}

class KSGarbageTruck {
  cache: { lastUpdate: number | null; data: IData[] } = { lastUpdate: null, data: [] }

  constructor() { }

  /**
   * 向官方取資料
   */
  async fetchData() {
    const response = await fetch('https://kepbgps.kcg.gov.tw/WebService/WsSkyeyes.asmx/NewgetCarsinfo', {
      method: 'POST',
      headers: { 'content-length': '0', 'content-type': 'application/json; charset=UTF-8', 'referer': 'https://kepbgps.kcg.gov.tw/' },
      redirect: 'follow',
    })
    const rawData = (await response.json()) as { d: string }

    if (rawData && rawData.d)
      this.cache = { lastUpdate: (new Date()).getTime(), data: <IData[]>JSON.parse(rawData.d).DATA }

    return this.cache
  }

  /**
   * 根據目前位置取得最靠近的垃圾車資訊
   * @param lat 緯度
   * @param lng 經度
   * @param count 回傳數量
   */
  getNearestData(lat: number, lng: number, count = 10) {
    const distance = new Distance()
    const coords = this.cache.data.map(data => ({ name: data.car_licence, lat: parseFloat(data.y), lng: parseFloat(data.x) }))
    const nearSort = distance.nearSort({ lat, lng }, coords)
    return nearSort.slice(0, count).map((data): IData => this.cache.data.find(item => item.car_licence === data.name)!)
  }
}

export default KSGarbageTruck
