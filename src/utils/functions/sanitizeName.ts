export function sanitizeName(name: string) {

    let _name = name
    _name = _name
        .replaceAll(" +1", "")
        .replaceAll(" +2", "")
        .replaceAll(" (1)", "")
        .replaceAll(" (2)", "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(":", "")
        .replaceAll(/[0-9]/g, "")
    _name = _name.trim()

    if (_name.includes('Note')) {
        _name = 'Note'
    }

    console.log(_name)

    return _name
}