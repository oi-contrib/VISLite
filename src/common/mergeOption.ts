export default function (option: any, defaultOption: any) {
    for (const key in option) {
        defaultOption[key] = option[key]
    }

    return defaultOption
}