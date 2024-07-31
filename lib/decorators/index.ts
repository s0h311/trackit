export const Define =
  (componentName: string): Function =>
  (
    target: CustomElementConstructor,
    _propertyKey: string,
    _descriptor: PropertyDescriptor
  ) => {
    customElements.define(componentName, target);
  };
