export function mllData(geoJson: any) {
    let minLongitude: any = null, maxLongitude: any = null, minLatitude: any = null, maxLatitude: any = null

    const forPolygon = function (coordinates: any) {
        for (let j = 0; j < coordinates.length; j++) {
            for (let k = 0; k < coordinates[j].length; k++) {
                const longitude = coordinates[j][k][0], latitude = coordinates[j][k][1]

                if (minLongitude == void 0 || minLongitude > longitude) minLongitude = longitude
                if (maxLongitude == void 0 || maxLongitude < longitude) maxLongitude = longitude

                if (minLatitude == void 0 || minLatitude > latitude) minLatitude = latitude
                if (maxLatitude == void 0 || maxLatitude < latitude) maxLatitude = latitude
            }
        }
    };

    const features = geoJson.features
    for (let i = 0; i < features.length; i++) {
        if (features[i].geometry.type == "Polygon") {
            forPolygon(features[i].geometry.coordinates)
        } else if (features[i].geometry.type == "MultiPolygon") {
            for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
                forPolygon(features[i].geometry.coordinates[j])
            }
        }
    }

    return [minLongitude, maxLongitude, minLatitude, maxLatitude]
}