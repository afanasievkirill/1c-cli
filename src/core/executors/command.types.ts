export interface ICommandExec {
  command: string;
  args: string[];
}

export interface ICommandExecWrite extends ICommandExec {
  write: string;
}
