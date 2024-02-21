import Container from './UI/Container.tsx';
import { type Timer as TimerProps } from '../store/timers-context.tsx'
import React from 'react'


export default function Timer({ name, duration }: TimerProps) {
    const interval = React.useRef<number | null>(null)
    const [remainingTime, setRemainingTime] = React.useState(duration * 1000)
    if (remainingTime <= 0 && interval.current) {
        clearInterval(interval.current)
    }

    React.useEffect(() => {
        const timer = setInterval(function () {
            setRemainingTime(prevTime => prevTime - 50)
        }, 50)
        interval.current = timer
        return () => { clearInterval(timer) }
    }, [])
    const formattedRemaingTime = (remainingTime / 1000).toFixed(2)
    return (
        <Container as="article">
            <h2>{name}</h2>
            <p><progress max={duration * 1000} value={remainingTime} /></p>
            <p>{formattedRemaingTime}</p>
        </Container>
    );
}
