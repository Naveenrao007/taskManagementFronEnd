export default function Elipsis(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
    }
    return text;
}

