export function cloneClass<T extends object>(
    constructor: new (id: string) => T,
    src: T,
): T {
    const dup = new constructor('');
    Object.assign(dup, JSON.parse(JSON.stringify(src)));
    return dup;
}
