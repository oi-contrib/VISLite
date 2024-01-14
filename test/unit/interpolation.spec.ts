import Hermite from "../../src/interpolation/Hermite"

describe('插值', function () {

    it('Hermite', function () {

        let hermite = new Hermite(1)
        hermite.setP(0, 1, 2, 15, 1, 17)

        expect(hermite.use(0)).toEqual(1)
        expect(hermite.use(1)).toEqual(4)
        expect(hermite.use(0.5)).toEqual(1.875)

    })

})