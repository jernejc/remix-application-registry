
export default abstract class App {
  abstract event: {
    on(name: string, cb: (...args: any[]) => void): void
    off(name: string): void
  }

  constructor(public methods: string[]) { }

  call(method: string) {
    if (this.methods.includes(method)) {
      if (this[method]) {
        return this[method]()
      } else {
        throw new Error(`Method ${method} is exposed, but not implemented`)
      }
    } else {
      throw new Error(`Method ${method} is not exposed`)
    }
  }
}