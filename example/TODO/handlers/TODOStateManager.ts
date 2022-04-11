import {StateManager} from "../../../src";
import {TODOState} from "./types/TODOState";
import {TODOProps} from "./types/TODOProps";

export class TODOStateManager extends StateManager<TODOState, TODOProps> {
  override onBeforeStateUpdated = (newState: Partial<TODOState>) => {
    if (newState.todos) {
      newState.todosArray = [...newState.todos.values()]
    }
    return newState
  }

  override onPropsUpdated = (newProps: Partial<TODOProps>) => {
    console.log(`The class received new props: ${newProps}`)
  }
}