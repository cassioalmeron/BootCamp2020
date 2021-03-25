export default interface IStoragemProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
