import type { arcCapType } from '../../../types/painterConfig'

export default function (type?: string) {

    const special = {
        // 文字大小
        "fontSize": 16,

        // 字体
        "fontFamily": "sans-serif",

        // 字重
        "fontWeight": 400,

        // 字类型
        "fontStyle": "normal",

        // 圆弧开始端闭合方式（"butt"直线闭合、"round"圆帽闭合）
        "arcStartCap": <arcCapType>'butt',

        // 圆弧结束端闭合方式，和上一个类似
        "arcEndCap": <arcCapType>'butt',

        // 矩形圆角半径
        "rectRadius": []
    }

    const init = {
        // 填充色或图案
        "fillStyle": 'black',

        // 轮廓色或图案
        "strokeStyle": 'black',

        // 线条宽度(单位px，下同)
        "lineWidth": 1,

        // 线的端点类型，（"butt"平直边缘、"round"半圆和"square"矩形）
        "lineCap": "butt",

        // 线的拐角连接方式，（"miter"连接处边缘延长相接、"bevel"对角线斜角和"round"圆）
        "lineJoin": "miter",

        // 设置线条虚线，应该是一个数组[number,...]
        "lineDash": [],

        // 文字水平对齐方式（"left"左对齐、"center"居中和"right"右对齐）
        "textAlign": 'left',

        // 文字垂直对齐方式（"middle"垂直居中、"top"上对齐和"bottom"下对齐）
        "textBaseline": 'middle',

        // 阴影的模糊系数，默认0，也就是无阴影
        "shadowBlur": 0,

        // 阴影的颜色
        "shadowColor": "black"
    }

    if (type == 'special') return special
    else if (type == 'init') return init
    else return {
        ...special, ...init
    }
}