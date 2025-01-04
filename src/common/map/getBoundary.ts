import { mllData } from "./tool"

export default function (...geos: any[]) {
    let minLongitude: any = null, maxLongitude: any = null, minLatitude: any = null, maxLatitude: any = null

    for (const geoJson of geos) {
        const [_minLongitude, _maxLongitude, _minLatitude, _maxLatitude] = mllData(geoJson)

        if (minLongitude == void 0 || _minLongitude < minLongitude) minLongitude = _minLongitude
        if (maxLongitude == void 0 || _maxLongitude > maxLongitude) maxLongitude = _maxLongitude
        if (minLatitude == void 0 || _minLatitude < minLatitude) minLatitude = _minLatitude
        if (maxLatitude == void 0 || _maxLatitude > maxLatitude) maxLatitude = _maxLatitude
    }

    return [minLongitude, maxLongitude, minLatitude, maxLatitude]
}