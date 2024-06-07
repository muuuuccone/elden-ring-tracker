export default function sanitizeURL(name: string) {
    if (name === "Gauntlets")
        return "Chain+Gauntlets";
    return name.replaceAll(" +1", "").replaceAll(" +2", "").replaceAll(" (1)", "").replaceAll(" (2)", "").replaceAll("[", "(").replaceAll("]", ")").replaceAll(" ", "+");
}