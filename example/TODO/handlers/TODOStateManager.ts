import {StateManager} from "../../../dist";
import {TODOState} from "./types/TODOState";
import {TODOProps} from "./types/TODOProps";

export class TODOStateManager extends StateManager<TODOState, TODOProps> {
  constructor(initialState: TODOState, updateState: (state: TODOState) => void, initialProps: TODOProps) {
    super(initialState, updateState, initialProps);
  }

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