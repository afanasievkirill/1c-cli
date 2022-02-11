export interface IbcmdInput {
	mode: IbcmdModeEnum;
	command: IbcmdCommandEnum;
	additionalCommand: IbcmdAdditionalCommandEnum;
	dataPath: string;
	outputPath: string;
	dbms: string;
	server: string;
	dbName: string;
	dbUser: string;
	dbPassword: string;
}
