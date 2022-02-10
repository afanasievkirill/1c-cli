"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IbcmdBuilder = void 0;
class IbcmdBuilder {
    constructor() {
        this.options = new Map();
    }
    setMode(mode) {
        this.mode = mode;
        return this;
    }
    setCommand(command) {
        this.command = command;
        return this;
    }
    setAdditionalCommand(additionalCommand) {
        this.additionalCommand = additionalCommand;
        return this;
    }
    setDataPath(dataPath) {
        this.dataPath = `--data=${dataPath}`;
        return this;
    }
    setOption(dbms, server, dbName, dbUser, dbPassword) {
        this.options.set('--dbms', dbms);
        this.options.set('--db-server', server);
        this.options.set('--db-name', dbName);
        this.options.set('--db-user', dbUser);
        this.options.set('--db--pwd', dbPassword);
        return this;
    }
    output(outputPath) {
        if (!this.dataPath) {
            throw new Error('Не задана рабочая область!');
        }
        const args = [this.mode, this.command, this.additionalCommand, this.dataPath];
        this.options.forEach((value, key) => {
            args.push(key);
            args.push(value);
        });
        args.push(outputPath);
        return args;
    }
}
exports.IbcmdBuilder = IbcmdBuilder;
