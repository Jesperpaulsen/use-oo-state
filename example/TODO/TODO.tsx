import React from 'react'
import {IUser} from "../types/IUser";
import {useOOState} from "../../src";
import {TODOStateManager} from "./handlers/TODOStateManager";
import {initialTodoState} from "./handlers/initialTodoState";

interface TODOProps {
  currentUser: IUser
  title: string
}

const TODO: React.FC<TODOProps> = ({ currentUser, title }) => {

  const [todoState, todoManager, props] = useOOState(TODOStateManager, initialTodoState, { currentUser })

  return <div>
    TODO
  </div>
}