import {ITodo} from "../../../types/ITodo";

export interface TODOState {
  todos: Map<string, ITodo>
  todosArray: ITodo[]
}