import { Mutable } from '../types/Mutable'

export class StateManager<S, P> {
  readonly state: S
  readonly props: P
  private readonly updateState: (state: S) => void

  constructor(initialState: S, updateState: (state: S) => void, props: P) {
    if (!initialState || !updateState) {
      throw Error(`State handler wasn't provided initialState and updateState`)
    }
    this.state = initialState
    this.props = props
    this.updateState = updateState
  }

  private mutateState = (newState: S) => {
    const mutableHandler = this as Mutable<StateManager<S, P>>
    mutableHandler.state = newState
  }

  private mutateProps = (newProps: P) => {
    const mutableHandler = this as Mutable<StateManager<S, P>>
    mutableHandler.props = newProps
  }

  setState = (newState: Partial<S>) => {
    const oldState = { ...this.state }
    const modifiedNewState = this.onBeforeStateUpdated(newState, oldState)
    const tmpState = Object.assign(oldState, modifiedNewState)
    this.mutateState(tmpState)
    this.updateState(tmpState)
    this.onStateUpdated(tmpState, oldState)
  }

  updateProps = (props: P) => {
    const oldProps = this.props ? { ...this.props } : undefined
    const tmpProps =  Object.assign(oldProps, props)
    this.mutateProps(tmpProps)
    this.onPropsUpdated(tmpProps, oldProps)
  }

  onCreated = () => {}

  onPropsUpdated = (newProps: P, oldProps?: P) => {}

  onStateUpdated = (newState: S, oldState: S) => {}

  onBeforeStateUpdated = (
    stateUpdate: Partial<S>,
    currentState: S
  ): Partial<S> => {
    return stateUpdate
  }
}
