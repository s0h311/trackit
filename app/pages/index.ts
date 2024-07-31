import { Component } from "@lib/component";
import { Define } from "@lib/decorators";

@Define("app-home")
export default class HomePage extends Component {
  public render(): string {
    return '<p style="color:purple;">YO YO YO its nice</p>';
  }
}
