// 点（x,y）沿着向量（ax,ay）方向移动距离d
export default function (ax: number, ay: number, d: number, x: number, y: number): [number, number] {
    const sqrt = Math.sqrt(ax * ax + ay * ay)
    return [
        ax * d / sqrt + x,
        ay * d / sqrt + y
    ]
}