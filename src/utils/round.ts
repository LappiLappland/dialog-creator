export default function roundToPrecision(num: number, precision: number = 0) {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
}
