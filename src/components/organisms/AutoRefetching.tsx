import React from 'react';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import axios from 'axios'

const AutoRefetching = () => {

    const cache = useQueryCache()
    const [intervalMs, setIntervalMs] = React.useState(1000)
    const [value, setValue] = React.useState('')

    const { status, data, error, isFetching } = useQuery(
        'todos',
        async () => {
            const { data } = await axios.get('/api/data')
            return data
        },
        {
            // Refetch the data every second
            refetchInterval: intervalMs,
        }
    )

    const [mutateAddTodo] = useMutation<any, any, string, any>(
        value => axios.get(`/api/data?add=${value}`),
        {
            onSuccess: () => cache.invalidateQueries('todos'),
        }
    )

    const [mutateClear] = useMutation(
        (value) => fetch(`/api/data?clear=1`), {
        onSuccess: () => cache.invalidateQueries('todos'),
    })

    if (status === 'loading') return <h1>Loading...</h1>
    if (status === 'error') return <span>Error:</span>

    if(error) {
        console.log("error: ", error);
        
    }
    return (

        <div>
            <h1>Auto Refetch with stale-time set to 1s)</h1>
            <p>
                This example is best experienced on your own machine, where you can open
                multiple tabs to the same localhost server and see your changes
                propagate between the two.
            </p>
            <label>
                Query Interval speed (ms):{' '}
                <input
                    value={intervalMs}
                    onChange={ev => setIntervalMs(Number(ev.target.value))}
                    type="number"
                    step="100"
                />{' '}
                <span
                    style={{
                        display: 'inline-block',
                        marginLeft: '.5rem',
                        width: 10,
                        height: 10,
                        background: isFetching ? 'green' : 'transparent',
                        transition: !isFetching ? 'all .3s ease' : 'none',
                        borderRadius: '100%',
                        transform: 'scale(2)',
                    }}
                />
            </label>
            <h2>Todo List</h2>
            <form
                onSubmit={async (ev) => {
                    ev.preventDefault()
                    try {
                        await mutateAddTodo(value)
                        setValue('')
                    } catch { }
                }}
            >
                <input
                    placeholder="enter something"
                    value={value}
                    onChange={ev => setValue(ev.target.value)}
                />
            </form>
            <ul>
                {data && data.map((item: string) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <div>
                <button onClick={() => mutateClear}>Clear All</button>
            </div>
        </div>

    )
}

export default AutoRefetching