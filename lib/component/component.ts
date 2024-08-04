export class Component extends HTMLElement {
  private renderRoot: ShadowRoot | null = null

  constructor() {
    super()
  }

  protected connectedCallback(): void {
    this.createRenderRoot()

    this.updateShadowHTML(this.render())
    this.attachEventHandlers()

    this.onConnected()
  }

  /**
   * @description this function gets triggered write after the shadow dom is attached
   */
  protected onConnected(): void {}

  private createRenderRoot(): void {
    this.renderRoot ??= this.attachShadow({ mode: 'open' })
  }

  /**
   * @description this function renders the template and is therefore required
   */
  protected render(): string {
    throw new Error('Every component must have a render function')
  }

  private updateShadowHTML(html: string): void {
    // TODO maybe sanatize here, maybe not
    if (this.renderRoot === null) {
      throw new Error('Panic, renderRoot is null')
    }

    this.renderRoot.innerHTML = html
  }

  private attachEventHandlers(): void {
    const proto = Object.getPrototypeOf(this)
    const propertyNames = Object.getOwnPropertyNames(proto)

    const handlers: Function[] = []

    for (const property of propertyNames) {
      if (
        ![
          'constructor',
          'onConnected',
          'render',
          'attachEventHandlers',
        ].includes(property)
      ) {
        handlers.push(proto[property] as unknown as Function)
      }
    }

    const clickableElementsTags = ['button', 'div', 'a', 'span']

    const rootChildren = [...this.shadowRoot!.children]

    const allButtons: Element[] = []

    rootChildren.forEach((child) => {
      if (clickableElementsTags.includes(child.localName)) {
        allButtons.push(child)
      }

      clickableElementsTags.forEach((tag) => {
        allButtons.push(...child.getElementsByTagName(tag))
      })
    })

    allButtons.forEach((button) => {
      handlers.forEach((handler) => {
        Object.getPrototypeOf(button)[handler.name] = handler
      })
    })
  }
}
