import CanvasType from "./Canvas"

export default interface UiCanvasType {
    fetch(): Promise<CanvasType>
}