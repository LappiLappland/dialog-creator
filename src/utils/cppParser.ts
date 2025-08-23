export interface OFPPropertiesStorage {
    [property: string]: string | string[];
}

export interface OFPClass {
    className: string;
    classes: ParsedOFPClasses;
    parent?: OFPClass | null;
    properties: OFPPropertiesStorage;
}

export type ParsedOFPClasses = Map<string, OFPClass>;

// Simple cpp preprocessor implementation
// Only supports classes and properties parsing (like ofp config files)
// Every value is stored as a string or array of strings
export function parseCpp(code: string): ParsedOFPClasses {
    const result: ParsedOFPClasses = new Map();

    const isIdStart = (c: string) => /[A-Za-z_]/.test(c);
    const isIdPart = (c: string) => /[A-Za-z0-9_]/.test(c);

    let pos = 0;

    const skipWs = () => {
        while (pos < code.length && /\s/.test(code[pos])) pos++;
    };

    const peek = (offset = 0) => code[pos + offset] ?? '';
    const consume = () => code[pos++];

    const expect = (str: string) => {
        skipWs();
        const slice = code.slice(pos, pos + str.length);
        if (slice.toLowerCase() !== str.toLowerCase()) {
            throw new Error(`Expected "${str}" at ${pos}`);
        }
        pos += str.length;
    };

    const readIdentifier = (): string => {
        skipWs();
        let id = '';
        if (!isIdStart(peek())) {
            throw new Error(`Identifier expected at ${pos}. Got ${code[pos]}`);
        };
        while (pos < code.length && isIdPart(peek())) id += consume();
        return id;
    };

    const readValue = (): string | string[] => {
        skipWs();
        // Array literal
        if (peek() === '{') {
            const arr: string[] = [];
            consume(); // '{'
            skipWs();
            while (peek() !== '}') {
                let token = '';
                while (pos < code.length && !/[,}]/.test(peek())) {
                    if (peek() === '"') {
                        consume(); // opening "
                        while (pos < code.length) {
                            if (peek() === '"') {
                                consume();
                                if (peek() === '"') {
                                    token += '"';
                                    consume();
                                }
                                else {
                                    // closing quote
                                    break;
                                }
                            }
                            else {
                                token += consume();
                            }
                        }
                    }
                    else {
                        token += consume();
                    }
                }
                arr.push(token.trim());
                skipWs();
                if (peek() === ',') {
                    consume();
                    skipWs();
                }
            }
            consume(); // '}'
            return arr;
        }

        // String literal
        if (peek() === '"') {
            let val = '';
            consume(); // opening "
            while (pos < code.length) {
                if (peek() === '"') {
                    consume();
                    if (peek() === '"') {
                        val += '"';
                        consume();
                    }
                    else {
                        // closing quote
                        break;
                    }
                }
                else {
                    val += consume();
                }
            }
            return val;
        }

        // Bare token
        let val = '';
        while (pos < code.length && !/[\s;\r\n}]/.test(peek())) val += consume();
        return val.trim();
    };

    const parseClass = (outerChain: ParsedOFPClasses[]): [string, OFPClass] => {
        expect('class');

        const name = readIdentifier();
        const nameLowerCased = name.toLocaleLowerCase();

        // Parse parent name
        skipWs();
        let parentName: string | null = null;
        if (code.slice(pos, pos + 1).toLowerCase() === ':') {
            pos += 1;
            skipWs();
            parentName = readIdentifier().toLowerCase();
        }

        expect('{');

        const data: OFPClass = {
            classes: new Map(),
            parent: null,
            className: name,
            properties: {},
        };

        // Resolve parent from classes chain
        if (parentName) {
            for (let i = outerChain.length - 1; i >= 0; --i) {
                if (outerChain[i].has(parentName)) {
                    data.parent = outerChain[i].get(parentName);
                    break;
                }
            }
        }
        const newChain = [...outerChain, data.classes];

        // Class body
        while (pos < code.length) {
            skipWs();
            if (peek() === '}') {
                consume();
                skipWs();
                if (peek() === ';') {
                    consume();
                };
                break;
            }

            if (code.slice(pos, pos + 5).toLowerCase() === 'class') {
                const [childName, childData] = parseClass(newChain); // Inner scope
                data.classes.set(childName, childData);
                continue;
            }

            const prop = readIdentifier();
            skipWs();
            if (peek() === '[') {
                consume();
                while ('[]'.includes(peek())) {
                    consume();
                }
            }

            expect('=');
            data.properties[prop.toLowerCase()] = readValue();
            skipWs();
            if (peek() === ';') {
                consume();
            }
        }

        return [nameLowerCased, data];
    };

    // MAIN LOOP
    while (pos < code.length) {
        skipWs();
        if (code.slice(pos, pos + 5).toLowerCase() === 'class') {
            const [name, data] = parseClass([result]);
            result.set(name.toLowerCase(), data);
        }
        else { pos++; }
    }

    function linkParents(root: ParsedOFPClasses) {
        const dfs = (node: OFPClass) => {
            if (typeof node.parent === 'string') {
                node.parent = root.get(node.parent) ?? null;
            }
            node.classes.forEach(dfs);
        };
        root.forEach(dfs);
    }

    linkParents(result);

    return result;
}
