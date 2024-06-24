# Simplified state manager for your projects

STM consist of two general functions : createStore and useStore.

These two functions will cover most simple tasks with setting/getting values to/from the store

# You can use this STM by following this flow:

1) const yourStoreName = createStore()
2) const [state, setState] = useStore(yourStoreName)