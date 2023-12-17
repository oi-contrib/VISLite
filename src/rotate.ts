// 点（x,y）围绕中心（cx,cy）旋转deg度
export default function (cx: number, cy: number, deg: number, x: number, y: number): [number, number] {
    const cos = Math.cos(deg), sin = Math.sin(deg)
    return [
        (x - cx) * cos - (y - cy) * sin + cx,
        (x - cx) * sin + (y - cy) * cos + cy
    ]
}