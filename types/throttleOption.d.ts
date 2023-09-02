export type throttleOpportunityType = "begin" | "end" | "wide"

export default interface throttleOptionType {

    /**
     * 节流时长
     */
    time?: number

    /**
     * 是否持续节流
     */
    keep?: boolean

    /**
     * 执行时机
     *
     * begin（开始触发）、end（结束触发）、wide（第一次开始触发，其余结束触发）
     */
    opportunity?: throttleOpportunityType

}