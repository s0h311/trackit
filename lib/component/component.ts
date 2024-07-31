export class Component extends HTMLElement {
  private renderRoot: ShadowRoot | null = null;

  constructor() {
    super();
  }

  protected connectedCallback(): void {
    this.createRenderRoot();

    this.updateShadowHTML(this.render());
  }

  private createRenderRoot(): void {
    this.renderRoot ??= this.attachShadow({ mode: "open" });
  }

  protected render(): string {
    throw new Error("Every component must have a render function");
  }

  protected template(html: string): void {
    // TODO maybe sanatize here, maybe not
    this.updateShadowHTML(html);
  }

  private updateShadowHTML(html: string): void {
    if (this.renderRoot === null) {
      throw new Error("Panic, renderRoot is null");
    }

    this.renderRoot.innerHTML = html;
  }
}
