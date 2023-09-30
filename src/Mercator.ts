import type MapType from '../types/Map'

/* 墨卡托投影 */
class Mercator implements MapType {
    readonly name: string = 'Mercator'

    use: (λ: number, φ: number) => [number, number, number]
    constructor(scale: number = 7, center: number[] = [107, 36]) {

        let perimeter = 100 * scale * Math.PI // 半周长

        let help = perimeter / 180

        let cx = help * center[0]  // 中心横坐标
        let cy = -1 * help * center[1] // 中心纵坐标

        this.use = (λ: number, φ: number) => {
            return [
                (help * λ - cx) * 0.8,
                -1 * help * φ - cy,
                0
            ]
        }
    }

}

export default Mercator