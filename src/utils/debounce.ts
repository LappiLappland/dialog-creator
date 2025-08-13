export default function debounce<
    T extends (...args: unknown[]) => unknown,
>(
    fn: T,
    delay: number = 300,
) {
    let pending: ReturnType<typeof setTimeout> | undefined = undefined;

    return function (...args: Parameters<T>) {
        clearTimeout(pending);

        pending = setTimeout(() => {
            fn(...args);
            pending = undefined;
        }, delay);
    };
}
