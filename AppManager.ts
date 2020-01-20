
export default interface AppManager {
  activate(name: string): void
  isActivated(name: string): boolean
  log(message: string): void
}