export default function sanitizeURL(name: string) {
    if (name === "Gauntlets")
        return "Chain+Gauntlets";
    if (name === "Perfumer Tricia")
        return "Perfumer+Tricia+Ashes";
    if (name === "Zamor Ice Storm")
        return "Zamor+Ice+Storm+(Spell)";
    return name.replaceAll(" +1", "").replaceAll(" +2", "").replaceAll(" (1)", "").replaceAll(" (2)", "").replaceAll("[", "(").replaceAll("]", ")").replaceAll(" ", "+");
}