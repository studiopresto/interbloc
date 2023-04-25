export const getDateFromTimestamp = t => {
    const date = new Date(t);
    return date.toLocaleString();
}