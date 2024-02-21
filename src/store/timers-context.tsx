import { type ReactNode, createContext, useContext } from "react";
import React from 'react'

export type Timer = {
    name: string,
    duration: number
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[]
}

const initialState: TimersState = {
    isRunning: false,
    timers: []
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void
    startTimers: () => void
    stopTimers: () => void
}

const TimersContext = createContext<TimersContextValue | null>(null)
export function useTimersContext() {
    const timersCtx = useContext(TimersContext)
    if (timersCtx === null) {
        throw new Error('TimersContext is null - that should not be the case!')
    }
    return timersCtx
}

type TimersContextProviderProps = {
    children: ReactNode
}

type StartTimersAction = {
    type: 'start'
}
type StopTimersAction = {
    type: 'stop'
}
type AddTimersAction = {
    type: 'add'
    payload: Timer
}

type ActionType = StartTimersAction | StopTimersAction | AddTimersAction

function timersReducer(state: TimersState, action: ActionType): TimersState {
    if (action.type === 'add') {
        return {
            ...state, timers: [
                ...state.timers,
                {
                    name: action.payload.name,
                    duration: action.payload.duration
                }
            ]
        }
    }
    if (action.type === 'start') {
        return {
            ...state, isRunning: true
        }
    }
    if (action.type === 'stop') {
        return {
            ...state, isRunning: false
        }
    }
    return state
}

export default function TimersContextProvider({ children }: TimersContextProviderProps) {
    const [timersState, dispatch] = React.useReducer(timersReducer, initialState)

    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer: (timerData) => {
            dispatch({ type: 'add', payload: timerData })
        },
        startTimers: () => {
            dispatch({ type: 'start' })
        },
        stopTimers: () => {
            dispatch({ type: 'stop' })
        }
    }
    return (
        <TimersContext.Provider value={ctx}>
            {children}
        </TimersContext.Provider>
    )
}