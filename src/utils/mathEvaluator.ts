type Prec = Record<string, number>;
type Assoc = Record<string, 'left' | 'right'>;

const enum TokenTypes {
    TOKEN_PLUS = '+',
    TOKEN_MINUS = '-',
    TOKEN_STAR = '*',
    TOKEN_SLASH = '/',
}

const OPS = [TokenTypes.TOKEN_PLUS, TokenTypes.TOKEN_MINUS, TokenTypes.TOKEN_STAR, TokenTypes.TOKEN_SLASH] as const;
const PREC: Prec = { [TokenTypes.TOKEN_PLUS]: 1, [TokenTypes.TOKEN_MINUS]: 1, [TokenTypes.TOKEN_STAR]: 2, [TokenTypes.TOKEN_SLASH]: 2 };
const ASSOC: Assoc = { [TokenTypes.TOKEN_PLUS]: 'left', [TokenTypes.TOKEN_MINUS]: 'left', [TokenTypes.TOKEN_STAR]: 'left', [TokenTypes.TOKEN_SLASH]: 'left' };
// const UNARY

export function evaluateMath(expr: string): number {
    const tokens = tokenize(expr);
    const rpn = toRPN(tokens);
    return evalRPN(rpn);
}

// TOKENIZER
function tokenize(expr: string): string[] {
    const tokens: string[] = [];
    let i = 0;

    while (i < expr.length) {
        const ch = expr[i];

        if (ch === ' ') {
            i++;
            continue;
        }

        if (ch === '(' || ch === ')') {
            tokens.push(ch);
            i++;
            continue;
        }

        if (OPS.some(v => v === ch)) {
            const prev = tokens[tokens.length - 1];
            const isUnary = !prev || prev === '(' || OPS.some(v => v === prev);
            tokens.push(isUnary ? (ch === '+' ? '_pos' : '_neg') : ch);
            i++;
            continue;
        }

        // Hexadecimal literal 0x...
        if (ch === '0' && expr[i + 1]?.toLowerCase() === 'x') {
            let hex = '0x';
            i += 2;
            while (i < expr.length && /[0-9a-fA-F]/.test(expr[i])) {
                hex += expr[i++];
            }
            if (hex === '0x') throw new SyntaxError('Malformed hex literal');
            tokens.push(String(parseInt(hex, 16)));
            continue;
        }

        // Decimal float literal
        if (/\d|\./.test(ch)) {
            let num = '';
            while (i < expr.length && /[\d.]/.test(expr[i])) {
                num += expr[i++];
            }
            if (num.split('.').length > 2) throw new SyntaxError('Invalid number');
            tokens.push(num);
            continue;
        }

        throw new SyntaxError(`Unexpected character: ${ch}`);
    }
    return tokens;
}

// Infix -> RPN (Shunting-Yard)
function toRPN(tokens: string[]): string[] {
    const out: string[] = [];
    const stack: string[] = [];

    for (const tok of tokens) {
        if (!isNaN(Number(tok))) {
            out.push(tok);
            continue;
        }

        if (tok === '_pos' || tok === '_neg') {
            stack.push(tok);
            continue;
        }

        if (OPS.some(v => v === tok)) {
            while (
                stack.length
                && stack[stack.length - 1] !== '('
                && ((ASSOC[tok] === 'left' && PREC[tok] <= PREC[stack[stack.length - 1]])
                    || (ASSOC[tok] === 'right' && PREC[tok] < PREC[stack[stack.length - 1]]))
            ) {
                out.push(stack.pop()!);
            }
            stack.push(tok);
            continue;
        }

        if (tok === '(') {
            stack.push(tok);
            continue;
        }

        if (tok === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                out.push(stack.pop()!);
            }
            if (!stack.length) throw new SyntaxError('Mismatched parentheses');
            stack.pop(); // drop '('
            continue;
        }

        throw new SyntaxError(`Unknown token: ${tok}`);
    }

    while (stack.length) {
        const op = stack.pop()!;
        if (op === '(' || op === ')') throw new SyntaxError('Mismatched parentheses');
        out.push(op);
    }
    return out;
}

// RPN evaluator
function evalRPN(rpn: string[]): number {
    const st: number[] = [];

    for (const tok of rpn) {
        if (!isNaN(Number(tok))) {
            st.push(parseFloat(tok));
            continue;
        }

        switch (tok) {
            case '_pos': {
                const a = st.pop()!;
                st.push(a);
                break;
            }
            case '_neg': {
                const a = st.pop()!;
                st.push(-a);
                break;
            }
            case '+': {
                const b = st.pop()!;
                const a = st.pop()!;
                st.push(a + b);
                break;
            }
            case '-': {
                const b = st.pop()!;
                const a = st.pop()!;
                st.push(a - b);
                break;
            }
            case '*': {
                const b = st.pop()!;
                const a = st.pop()!;
                st.push(a * b);
                break;
            }
            case '/': {
                const b = st.pop()!;
                const a = st.pop()!;
                if (b === 0) throw new Error('Division by zero');
                st.push(a / b);
                break;
            }
        }
    }

    if (st.length !== 1) throw new SyntaxError('Invalid expression');
    return st[0];
}
