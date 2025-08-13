import type Command from '../types/Command';

export default class CommandDispatcher {
    private static undoStack: Command[];
    private static redoStack: Command[];

    static {
        this.undoStack = [];
        this.redoStack = [];
    }

    static run(cmd: Command) {
        cmd.execute();
        this.add(cmd);
    }

    static add(cmd: Command) {
        this.undoStack.push(cmd);
        this.redoStack.length = 0;
    }

    static undo() {
        const cmd = this.undoStack.pop();
        if (cmd) {
            cmd.undo();
            this.redoStack.push(cmd);
        }
    }

    static redo() {
        const cmd = this.redoStack.pop();
        if (cmd) {
            cmd.execute();
            this.undoStack.push(cmd);
            if (this.undoStack.length > 50) {
                this.undoStack.shift();
            }
        }
    }

    static clearHistory() {
        this.redoStack.length = 0;
        this.undoStack.length = 0;
    }
}
