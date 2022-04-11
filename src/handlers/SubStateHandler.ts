import { StateManager } from './StateManager'

export class SubStateHandler<
  H extends StateManager<H['state'], H['props']>
> {
  readonly manager: H
  protected readonly state!: H['state']
  protected readonly props!: H['props']

  constructor(stateManager: H) {
    this.manager = stateManager
    Object.defineProperty(this, 'state', {
      get: () => this.getState(),
    })
    Object.defineProperty(this, 'props', {
      get: () => this.getProps(),
    })
    this.onCreated()
  }

  readonly onCreated = () => {}

  readonly setState = (newState: Partial<H['state']>) => {
    return this.manager.setState(newState)
  }

  private readonly getState = () => {
    return this.manager.state
  }

  private readonly getProps = () => {
    return this.manager.props
  }
}
