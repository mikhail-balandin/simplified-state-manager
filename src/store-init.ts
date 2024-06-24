import { SetStateAction, act, useSyncExternalStore } from "react";

interface Store<T>{
    getValue(): T,
    setValue(value: T): void,
    subscribe(cb: () => void): () => void
}

const createStore = <T>(defaultValue: T): Store<T> => {
    let value = defaultValue;

    let listeners = new Set<() => void>();

    return {
        getValue: () => {
            return value
        },
        setValue: (newValue: T) => {
            value = newValue
            listeners.forEach(listener => {
                listener()
            })
        },
        subscribe: (cb: () => void) => {
            listeners.add(cb)
            return () => {
                listeners.delete(cb)
            }
        }
    }
}

const isActionFunction = <T>(action: SetStateAction<T>): action is (last:T) => T => {
    return typeof action === 'function'
}

function useStore<T>(store: Store<T>){
    const value = useSyncExternalStore(store.subscribe, store.getValue)

    const setValue = (action: SetStateAction<T>) => {
        if (isActionFunction(action)){
            store.setValue(action(store.getValue()))
        } else {
            setValue(action)
        }
    };

    return [value, setValue]
}
