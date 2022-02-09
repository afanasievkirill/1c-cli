export class IbcmdBuilder {
	private mode: IbcmdModeEnum;
	private command: IbcmdCommandEnum;
	private additionalCommand: IbcmdAdditionalCommandEnum;
	private dataPath: string;
	private outputPath: string;
	private options: Map<string, string> = new Map();

	constructor() {
	}

	setMode(mode: IbcmdModeEnum): this {
		this.mode = mode;
		return this;
	}

	setCommand(command: IbcmdCommandEnum): this {
		this.command = command;
		return this;
	}

	setAdditionalCommand(additionalCommand: IbcmdAdditionalCommandEnum): this {
		this.additionalCommand = additionalCommand;
		return this;
	}

	setDataPath(dataPath: string): this {
		this.dataPath = `--data=${dataPath}`
		return this;
	}

	setOption(
		dbms: string,
		server: string,
		dbName: string,
		dbUser: string,
		dbPassword: string
	): this {
		this.options.set('--dbms', dbms);
		this.options.set('--db-server', server);
		this.options.set('--db-name', dbName);
		this.options.set('--db-user', dbUser);
		this.options.set('--db--pwd', dbPassword);
		return this;
	}

	output(outputPath: string): string[] {
		if (!this.dataPath) {
			throw new Error('Не задана рабочая область!');
		};
		const args: string[] = [
			this.mode,
			this.command,
			this.additionalCommand,
			this.dataPath,
		];
		this.options.forEach((value, key) => {
			args.push(key);
			args.push(value);
		});
		args.push(outputPath)
		return args;
	}

}