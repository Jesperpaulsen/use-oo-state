import {TODOState} from "./types/TODOState";
import {ITodo} from "../../types/ITodo";

export const initialTodoState: TODOState = {
  todos: new Map<string, ITodo>(),
  todosArray: []
}