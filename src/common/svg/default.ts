import type { arcCapType, textAlignType, textBaselineType, lineCapType, lineJoinType } from "../../../types/painterConfig"

export default function () {
    return {
        // 颜色
        fillStyle: "#000",
        strokeStyle: "#000",

        // 文字对齐方式
        textAlign: <textAlignType>"left",
        textBaseline: <textBaselineType>"middle",

        // 文字
        "fontSize": 16,
        "fontFamily": "sans-serif",

        // arc二端闭合方式['butt':直线闭合,'round':圆帽闭合]
        "arcStartCap": <arcCapType>"butt",
        "arcEndCap": <arcCapType>"butt",

        // 线条
        lineDash: [],
        lineWidth: 1,
        lineCap: <lineCapType>"butt",
        lineJoin: <lineJoinType>"miter",

        // 矩形圆角半径
        "rectRadius": []
    }
}