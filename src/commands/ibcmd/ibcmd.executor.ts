import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executors/command.executor';
import { ICommandExec } from '../../core/executors/command.types';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { IbcmdInput } from './ibcmd.interface';
import { FileService } from '../../core/files/file.service';
import { PromptService } from '../../core/prompt/prompt.service';
import { IbcmdBuilder } from './ibcmd.builder';
import { StreamHandler } from '../../core/handlers/stream.handler';

export class IbcmdExecutor extends CommandExecutor<IbcmdInput> {
	private fileService: FileService = new FileService();
	private promptService: PromptService = new PromptService();

	constructor(logger: IStreamLogger) {
		super(logger);
	}

	protected async prompt(): Promise<IbcmdInput> {
		const mode = await this.promptService.input<IbcmdModeEnum>('Режим', 'input');
		const command = await this.promptService.input<IbcmdCommandEnum>('Команда', 'input');
		const additionalCommand = await this.promptService.input<IbcmdAdditionalCommandEnum>(
			'Дополнительная команда',
			'input',
		);
		const dataPath = await this.promptService.input<string>('Каталог выполнения', 'input');
		const dbms = await this.promptService.input<string>('Тип СУБД', 'input');
		const server = await this.promptService.input<string>('Сервер СУБД', 'input');
		const dbName = await this.promptService.input<string>('Имя Базы Данных', 'input');
		const dbUser = await this.promptService.input<string>('Пользователь СУБД', 'input');
		const dbPassword = await this.promptService.input<string>('Пароль СУБД', 'password');
		const outputPath = await this.promptService.input<string>('Путь к исходникам', 'input');
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
	}

	protected build({
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
	}: IbcmdInput): ICommandExec {
		const args = new IbcmdBuilder()
			.setMode(mode)
			.setCommand(command)
			.setAdditionalCommand(additionalCommand)
			.setDataPath(dataPath)
			.setOption(dbms, server, dbName, dbUser, dbPassword)
			.output(outputPath);
		return { command: 'ibcmd', args };
	}

	protected spawn({ command, args }: ICommandExec): ChildProcessWithoutNullStreams {
		return spawn(command, args);
	}

	protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
		const handler = new StreamHandler(logger);
		handler.processOutput(stream, 'admin\nadmin\ny\ny\n');
	}
}
