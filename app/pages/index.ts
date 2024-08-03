import { Component } from '@lib/component'
import { Define } from '@lib/decorators'
import { effect } from '@lib/signals'
import { Signal } from 'signal-polyfill'

@Define('app-home')
export default class HomePage extends Component {
  public count = new Signal.State(1)

  protected override onConnected(): void {
    effect(() => {
      const currentCount = this.count.get()
      const countElement = this.shadowRoot?.getElementById('count')

      if (countElement) {
        countElement.innerHTML = String(currentCount)
      }
    })
  }

  public increaseCount(): void {
    this.count.set(this.count.get() + 1)
  }

  protected override render(): string {
    return `
      <div>
        <p id="count">0</p>
        <button id="countIncreaseButton" onclick="this.ownerDocument.activeElement.increaseCount()">COUNT++</button>
      </div>
    `
  }
}
