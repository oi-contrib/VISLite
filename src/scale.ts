// 点（x,y）围绕中心（cx,cy）缩放times倍
export default function (cx: number, cy: number, times: number, x: number, y: number): [number, number] {
    return [
        times * (x - cx) + cx,
        times * (y - cy) + cy
    ]
}