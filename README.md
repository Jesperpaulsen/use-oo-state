# use-oo-state
> While functional programming in React has many perks, managing a complex state can get messy. This package aims to solve the problems of complex states in React's functional components. Combining the many benefits of object-oriented programming with React's functional programming makes splitting up code and responsibility among classes easier. This makes it easier to create and maintain clean code.
> 

## Installation
`npm i use-oo-state`

## Use case
This package is useful in higher order components or contexts, where the state tends to get messy. This package will
make it easy to create fully typed classes to manipulate the state object.

## How to use
This package consists of three main concepts:

* StateManager
* SubStateHandler
* useOOState

### StateManager
StateManager is a generic class that will be extended per state you want to use OO State for. It takes two generic arguments: **state** and **props**.

#### How to create a new StateManager:
First we need to create an interface for the state and (optionally) for the props:

```
interface ExampleState {
  name: string
  nameErrorMessage: string
  email: string
}

interface ExampleProps {
  userId: string
}
```

then we create our new StateManager in a TS file:

```
export class ExampleStateManager extends StateManager<ExampleState, ExampleProps> {
  constructor(initialState: ExampleState, updateState: (state: ExampleState) => void, initialProps: ExampleProps) {
    super(initialState, updateState, initialProps);
  }
}
```

This class exposes the following lifecycle hooks that can be overriden:
* onBeforeStateUpdated: A hook called before the state updates with the following params: newState and currentState.
This method can be used to manipulate the state objects before it updates, and needs to return the manipulated state object.
* onStateUpdated: A hook called after the state updates with the following params: newState and oldState.
  This method can be used to call new methods based on a state update.
* onPropsUpdated: A hook called when the props updates with the following params: newProps and oldProps.   This method can be used to call new methods based on a prop update.

#### Example:
```
import { StateManager } from 'use-oo-state'

export class ExampleStateManager extends StateManager<ExampleState, ExampleProps> {
  constructor(initialState: ExampleState, updateState: (state: ExampleState) => void, initialProps: ExampleProps) {
    super(initialState, updateState, initialProps)
  }
  
  override onBeforeStateUpdated = (newState: Partial<ExampleState>, oldState: ExampleState) => {
    console.log('The class is about to update with the following state: ', newState)
    return newState
  }

  override onStateUpdated = (newState: Partial<ExampleState>, oldState: ExampleState) => {
    console.log('The state is updated with the following state: ', newState)
  }

  override onPropsUpdated = (newProps: Partial<ExampleProps>, oldProps: Partial<ExampleProps>) => {
    console.log(`The class received new props: ${newProps}`)
  }
}
```

### SubStateHandler
A SubStateHandler is used to handle code for the state manager. A state manager can have multiple substate handlers. It can have internal state that is not reactive, and
has access to the reactive state of the StateManager. In this example, we will use two handlers:

```
import { SubStateHandler } from 'use-oo-state'

export class ExampleNameHandler extends SubStateHandler<ExampleStateManager> { 
   constructor(stateManager: ExampleStateManager) {
     super(stateManager)
   }
   
   readonly updateName = (newName: string) => {
      if (!this.state.name) console.log('No name set') // The state of the StateManager is accessible on this.state
      this.setState({name: newName)} // To update the state of the StateManager use this.setState
   }
   
   readonly checkNameIsMatchingEmail = (email: string, name: string) => {
     return !email.toLowerCase().includes(names)
   }
}
```

```
import { SubStateHandler } from 'use-oo-state'

export class ExampleEmailHandler extends SubStateHandler<ExampleStateManager> { 
   constructor(stateManager: ExampleStateManager) {
     super(stateManager)
   }
   
   readonly updateEmail = (newEmail: string) => {
      this.setState({email: newEmail)} // To update the state of the StateManager use this.setState
   }
}
```

We then need to initialise the SubStateHandlers in the StateManager:

```
export class ExampleStateManager extends StateManager<ExampleState, ExampleProps> {
  readonly nameHandler: ExampleNameHandler
  readonly emailHandler: ExampleEmailHandler

  constructor(initialState: ExampleState, updateState: (state: ExampleState) => void, initialProps: ExampleProps) {
    super(initialState, updateState, initialProps)
    this.nameHandler = new ExampleNameHandler(this)
    this.emailHandler = new ExampleEmailHandler(this)
  }
  
  override onBeforeStateUpdated = (newState: Partial<ExampleState>, oldState: ExampleState) => {
    if (newState.email) {
       const name = newState.email ?? oldState.email
      if (!this.nameHandler.checkNameIsMatchingEmail(newState.email, name) {
        newState.nameErrorMessage = 'Name is not matching email'
      }
    }
    return newState
  }
  
  override onPropsUpdated = (newProps: Partial<ExampleProps>, oldProps: ExampleProps) => {
    if (newProps.userId !== oldProps.userId) {
        console.log('User have changed, should probably do some resetting here')
    }
  }
}
```

### useOOState
The useOOState is the connection between React and the Object Oriented State.
It is used as a normal hook:

```
const [state, exampleManager, props] = useOOState(ExampleStateManager, initialState, { userId: '1' })
```

Then it can be used in a component or a context:

In component:
```
interface ExampleComponentProps {
  userId: string
}

const initialState: ExampleState = {
  name: '',
  email: '',
  nameErrorMessage: ''
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ userId }) => {
  const [state, exampleManager, props] = useOOState(ExampleStateManager, initialState, { userId })
  
  return (
    <div>
        <div>
            Hello, {state.name}.
        </div>
        <input onChange={(e) => exampleManager.nameHandler.updateName(e.target.value) />
    </div>
  )
} 
```

In context:

```
const initialState: ExampleState = {
  name: '',
  email: '',
  nameErrorMessage: ''
}

interface IExampleContext {
  exampleState: ExampleState
  exampleManager?: ExampleManager
}

export const ExampleContext = createContext<IExampleContext>({ exampleState: initialState });

const ExampleProvider: React.FC = ({ children }) => {
   const [exampleState, exampleManager, props] = useOOState(ExampleStateManager, initialState, { userId: '1' })
 
  return <ExampleContext.Provider value={{ exampleState, exampleManager }}>{children}</UserContext.Provider>;
};

export default ExampleProvider;
```