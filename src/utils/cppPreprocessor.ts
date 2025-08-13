enum PreprocessorMacroTypes {
    SIMPLE,
    FUNCTION,
}

// Simple cpp preprocessor implementation
// Only supports "define" statement with simple variables and function macros
export default function preprocessCpp(code: string) {
    const lines = code.split('\n');
    const macros = new Map<string, { type: PreprocessorMacroTypes; value: string; params?: string[] }>();
    const output = [];

    function processValue(value: string) {
        let processed = value;

        // Handle stringification (#)
        processed = processed.replace(/#\s*([a-zA-Z_]\w*)/g, '"$1"');

        // Handle concatenation (##)
        processed = processed.replace(/([a-zA-Z_]\w*)\s*##\s*([a-zA-Z_]\w*)/g, '$1$2');

        // Substitute simple macros
        for (const [name, macro] of macros) {
            if (macro.type === PreprocessorMacroTypes.SIMPLE) {
                const regex = new RegExp(`\\b${name}\\b`, 'g');
                processed = processed.replace(regex, macro.value);
            }
        }

        return processed;
    }

    for (const line of lines) {
        const trimmed = line.trim();

        // Handle #define statements
        if (trimmed.startsWith('#define')) {
            const defineMatch = trimmed.match(/^#define\s+([a-zA-Z_]\w*)(?:\(([^)]*)\))?\s+(.+)$/);

            if (defineMatch) {
                const [, name, paramsStr, value] = defineMatch;

                if (paramsStr === undefined) {
                    // Simple variable macro
                    macros.set(name, {
                        type: PreprocessorMacroTypes.SIMPLE,
                        value: value.trim(),
                    });
                }
                else {
                    // Function macro
                    const params = paramsStr.split(',').map(p => p.trim()).filter(p => p);
                    macros.set(name, {
                        type: PreprocessorMacroTypes.FUNCTION,
                        params,
                        value: value.trim(),
                    });
                }
            }
            continue; // Skip #define lines in output
        }

        // Process other lines for macro substitution
        let processedLine = line;

        // Handle function-like macro calls
        processedLine = processedLine.replace(/([a-zA-Z_]\w*)\(([^)]*)\)/g, (match, macroName, argsStr) => {
            const macro = macros.get(macroName);
            if (!macro || macro.type !== PreprocessorMacroTypes.FUNCTION || !macro.params) {
                return match;
            };

            const args = argsStr.split(',').map((arg: string) => arg.trim());
            if (args.length !== macro.params.length) return match;

            // Substitute parameters in macro value
            let macroValue = macro.value;
            macro.params.forEach((param, index) => {
                const paramRegex = new RegExp(`\\b${param}\\b`, 'g');
                macroValue = macroValue.replace(paramRegex, processValue(args[index]));
            });

            return processValue(macroValue);
        });

        // Handle simple macro substitution
        processedLine = processValue(processedLine);

        output.push(processedLine);
    }

    return output.join('\n');
}
