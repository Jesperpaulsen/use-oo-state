import { StateManager } from './StateManager'

export class SubStateHandler<
  H extends StateManager<H['state'], H['props']>
> {
  readonly manager: H
  readonly state!: H['state']
  readonly props!: H['props']

  constructor(contextHandler: H) {
    this.manager = contextHandler
    Object.defineProperty(this, 'state', {
      get: () => this.getState(),
    })
    Object.defineProperty(this, 'props', {
      get: () => this.getProps(),
    })
  }

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
