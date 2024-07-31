import { ComponentTag } from "./types";

export const Define =
  (componentTag: ComponentTag): Function =>
  (
    target: CustomElementConstructor,
    _propertyKey: string,
    _descriptor: PropertyDescriptor
  ) => {
    customElements.define(componentTag, target);
  };
