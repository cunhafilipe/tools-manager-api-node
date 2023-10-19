export type ListToolsUseCaseResponse = {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export interface IListToolsUseCase {
  execute(): Promise<ListToolsUseCaseResponse[]>;
}