export const timeFormatter = (ISOString: string | undefined) => {
    if (!ISOString) return "-";
    const [date] = ISOString.split("T");
    return date.replace(/-/g, ".");
};
