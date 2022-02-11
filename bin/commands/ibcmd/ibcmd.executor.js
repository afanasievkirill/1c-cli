"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IbcmdExecutor = void 0;
const child_process_1 = require("child_process");
const command_executor_1 = require("../../core/executors/command.executor");
const file_service_1 = require("../../core/files/file.service");
const prompt_service_1 = require("../../core/prompt/prompt.service");
const ibcmd_builder_1 = require("./ibcmd.builder");
const stream_handler_1 = require("../../core/handlers/stream.handler");
class IbcmdExecutor extends command_executor_1.CommandExecutor {
    constructor(logger) {
        super(logger);
        this.fileService = new file_service_1.FileService();
        this.promptService = new prompt_service_1.PromptService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const mode = yield this.promptService.input('Режим', 'input');
            const command = yield this.promptService.input('Команда', 'input');
            const additionalCommand = yield this.promptService.input('Дополнительная команда', 'input');
            const dataPath = yield this.promptService.input('Каталог выполнения', 'input');
            const dbms = yield this.promptService.input('Тип СУБД', 'input');
            const server = yield this.promptService.input('Сервер СУБД', 'input');
            const dbName = yield this.promptService.input('Имя Базы Данных', 'input');
            const dbUser = yield this.promptService.input('Пользователь СУБД', 'input');
            const dbPassword = yield this.promptService.input('Пароль СУБД', 'password');
            const outputPath = yield this.promptService.input('Путь к исходникам', 'input');
            return {
                mode,
                command,
                additionalCommand,
                dataPath,
                outputPath,
                dbms,
                server,
                dbName,
                dbUser,
                dbPassword,
            };
        });
    }
    build({ mode, command, additionalCommand, dataPath, outputPath, dbms, server, dbName, dbUser, dbPassword, }) {
        const args = new ibcmd_builder_1.IbcmdBuilder()
            .setMode(mode)
            .setCommand(command)
            .setAdditionalCommand(additionalCommand)
            .setDataPath(dataPath)
            .setOption(dbms, server, dbName, dbUser, dbPassword)
            .output(outputPath);
        return { command: 'ibcmd', args };
    }
    spawn({ command, args }) {
        return (0, child_process_1.spawn)(command, args);
    }
    processStream(stream, logger) {
        const handler = new stream_handler_1.StreamHandler(logger);
        handler.processOutput(stream, 'admin\nadmin\ny\ny\n');
    }
}
exports.IbcmdExecutor = IbcmdExecutor;
