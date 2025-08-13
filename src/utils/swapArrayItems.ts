export default function swapArrayItems(arr: unknown[], a: number, b: number) {
    if (arr.length <= a || arr.length <= b) {
        return;
    }

    const el = arr[b];
    arr[b] = arr[a];
    arr[a] = el;
}
