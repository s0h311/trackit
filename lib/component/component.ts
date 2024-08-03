export class Component extends HTMLElement {
  private renderRoot: ShadowRoot | null = null

  constructor() {
    super()
  }

  protected connectedCallback(): void {
    this.createRenderRoot()

    this.updateShadowHTML(this.render())

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
}
