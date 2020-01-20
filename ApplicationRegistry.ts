
import App from './App';
import AppManager from './AppManager';

export default class ApplicationRegistry {
  plugins: Record<string, App>

  constructor(private manager: AppManager) { 
    this.plugins = {} // there's probably a better solution here, but needed a default value otherwise line 12 failed on first register
  }

  register(name: string, app: App) {
    this.plugins[name] = app
    this.manager.activate(name)
  }

  call(name: string, method: string) {
    try {
      if (this.manager.isActivated(name)) {
        return this.plugins[name].call(method)
      }
    } catch (err) {
      this.manager.log(err)
    }
  }

  on(name: string, event: string, cb: (...args: any[]) => void) {
    if (this.manager.isActivated(name)) {
      return this.plugins[name].event.on(event, cb)
    }
  }

  off(name: string, event: string) {
    if (this.manager.isActivated(name)) {
      return this.plugins[name].event.off(event)
    }
  }
}