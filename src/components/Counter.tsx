import { createSignal } from 'solid-js'
import { Button } from '~/components/ui/Button'

export default function Counter() {
    const [count, setCount] = createSignal(0)

    return (
        <Button onClick={() => setCount(count() + 1)}>Clicks: {count()}</Button>
    )
}
