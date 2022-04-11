import { StateManager } from './handlers/StateManager'
import { useEffect, useState } from 'react'

const useOOState = <M extends StateManager<M['state'], M['props']>>(
  Manager: new (
    state: M['state'],
    updateState: (state: M['state']) => void,
    props: M['props'],
  ) => M,
  initialState: M['state'],
  props: M['props'],
): [M['state'], Omit<M, 'state'>, M['props']] => {
  
  const [state, setState] = useState<M['state']>(initialState)

  const [manager] = useState<Omit<M, 'state'>>(() => new Manager(initialState, setState, props))

  useEffect(() => {
    manager.updateProps(props)
  }, [manager, props])

  return [state, manager, props]
}

export default useOOState
