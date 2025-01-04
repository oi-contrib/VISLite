import type MapConfigType from '../../types/MapConfig'
import type MapCoordinateType from '../../types/MapCoordinate'
import type MapType from '../../types/Map'

import { initOption, mergeOption } from '../common/option'
import getBoundary from '../common/map/getBoundary'
import Mercator from '../Mercator'
import Eoap from '../Eoap'

class MapCoordinate implements MapCoordinateType {
    readonly name: string = 'MapCoordinate'

    private __config: MapConfigType
    private __map: MapType
    private __boundary: Array<number>

    constructor(config: MapConfigType = {}) {
        this.__config = initOption(config, {
            api: "Mercator",
            width: 400,
            height: 300,
            left: 0,
            top: 0
        })
    }

    private $$updateMap() {
        const [minLongitude, maxLongitude, minLatitude, maxLatitude] = this.__boundary

        if (this.__config.api == "Eoap") {

            const xScale = (this.__config.width as number) * 0.836 / (maxLongitude - minLongitude)
            const yScale = (this.__config.height as number) * 0.557 / (maxLatitude - minLatitude)

            this.__map = new Eoap(xScale < yScale ? xScale : yScale, [
                (minLongitude + maxLongitude) * 0.5 * 0.9778,
                (minLatitude + maxLatitude) * 0.5 * 1.025
            ])

        } else if (this.__config.api == "Mercator") {

            const xScale = (this.__config.width as number) * 0.72 / (maxLongitude - minLongitude)
            const yScale = (this.__config.height as number) * 0.575 / (maxLatitude - minLatitude)

            this.__map = new Mercator(xScale < yScale ? xScale : yScale, [
                (minLongitude + maxLongitude) * 0.5,
                (minLatitude + maxLatitude) * 0.5
            ])

        } else {
            throw new Error("Unexpected API types:" + this.__config.api)
        }
    }

    setConfig(config: MapConfigType) {
        mergeOption(this.__config, config)
        this.$$updateMap()
        return this
    }

    setGeos(...geos: any[]) {
        this.__boundary = getBoundary(...geos)
        this.$$updateMap()
        return this
    }

    use(λ: number, φ: number): [number, number] {
        if (this.__map) {
            const dxyz = this.__map.use(λ, φ)
            return [
                (this.__config.left as number) + (this.__config.width as number) * 0.5 + dxyz[0],
                (this.__config.top as number) + (this.__config.height as number) * 0.5 + dxyz[1],
            ]
        } else {
            throw new Error("Geographic data not set")
        }
    }

}

export default MapCoordinate