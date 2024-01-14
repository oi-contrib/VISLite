import ruler from "../../src/ruler"

describe('刻度尺', function () {

    it('ruler', function () {
        expect(ruler(4, 98, 5)).toEqual([0, 20, 40, 60, 80, 100])
    })

})