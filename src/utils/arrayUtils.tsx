export function range(size: number, start = 0): number[] {
    return Array.from({ length: size }, (_, index) => index + start);
}
