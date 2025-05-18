interface categoryAxios {
    type: "category"
    data: Array<string>
}

interface valueAxios {
    type: "value"
    data: Array<number>
}

export interface BarResultType {

    /**
     * 坐标系
     */
    coordinate: {

        /**
         * 坐标系左下角横坐标
         */
        x: number

        /**
         * 坐标系左下角纵坐标
         */
        y: number

        /**
         * 坐标系的宽
         */
        width: number

        /**
         * 坐标系的高
         */
        height: number

        /**
         * x坐标轴
         */
        xAxis: categoryAxios | valueAxios

        /**
         * y坐标轴
         */
        yAxis: categoryAxios | valueAxios
    }

    /**
     * 直方矩形
     */
    node: Array<{

        /**
         * 分类名称
         * 如果是一维的，就不存在此项
         */
        name?: string

        /**
         * 当前分类的一个个直方矩形
         */
        bar: Array<{

            /**
             * 矩形原始的值
             */
            value: number

            /**
             * 矩形左下角横坐标
             */
            x: number

            /**
             * 矩形左下角纵坐标
             */
            y: number

            /**
             * 矩形宽
             */
            width: number

            /**
             * 矩形高
             */
            height: number
        }>
    }>

}