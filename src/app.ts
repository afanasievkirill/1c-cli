import { PromptService } from './core/prompt/prompt.service';
import { IbcmdExecutor } from './commands/ibcmd/ibcmd.executor';
import { ConsoleLogger } from './out/console-logger/console-logger';

export class App {
	async run() {
		new IbcmdExecutor(ConsoleLogger.getInstance()).execute();
	}
}

const app = new App();
app.run();
