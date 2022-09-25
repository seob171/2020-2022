export const arrayChunk = (arr: any, n: number) => {
    if (!Array.isArray(arr)) return [];
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
};
