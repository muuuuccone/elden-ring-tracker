export function sanitizeName(name: string) {

    if (name.includes('Note')) {
        return 'Note'
    }

    if (name.includes('Bell Bearing')) {
        return 'Bell Bearing'
    }

    if (name.includes('Crystal Tear')) {
        return name
    }

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
        .replaceAll("?", "")
    _name = _name.trim()

    return _name
}