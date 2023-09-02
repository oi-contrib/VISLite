export default function (option: any, defaultOption: any) {
    for (let key in option) {
        defaultOption[key] = option[key]
    }

    return defaultOption
}