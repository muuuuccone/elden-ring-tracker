import {createContext, ReactElement, useMemo, useReducer} from "react";

type SaveDataStateType = {inventory: string[]}

const initialState: SaveDataStateType = {
    inventory: [],
}

const REDUCER_ACTIONS_TYPE = {
    LOAD: 'LOAD',
    ADD: 'ADD',
    REMOVE: 'REMOVE',
}

export type ReducerActionType = typeof REDUCER_ACTIONS_TYPE

export type ReducerAction = {
    type: string;
    payload?: string[] | string | null;
}

const reducer = (state: SaveDataStateType, action: ReducerAction): SaveDataStateType => {
    switch (action.type) {
        case REDUCER_ACTIONS_TYPE.LOAD: {
            if (action.payload) {
                return {...state, inventory: action.payload as string[]};
            }
            return state;
        }
        case REDUCER_ACTIONS_TYPE.ADD: {
            if (action.payload) {
                const {inventory} = state;
                const newInventory = [...inventory, action.payload as string];
                return {...state, inventory: newInventory};
            }
            return state;
        }
        case REDUCER_ACTIONS_TYPE.REMOVE: {
            if (action.payload) {
                const {inventory} = state;
                const newInventory = inventory.filter(item => item !== action.payload);
                return {...state, inventory: newInventory};
            }
            return state;
        }
        default:
            throw new Error("Action not supported")
    }
}

const useSaveDataContext = (initialSaveDataState: SaveDataStateType) => {
    const [state, dispatch] = useReducer(reducer, initialSaveDataState);

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTIONS_TYPE
    }, [])

    const inventory = state.inventory;

    return {dispatch, inventory, REDUCER_ACTIONS};
}

type UseSaveDataContextType = ReturnType<typeof useSaveDataContext>

const initialSaveDataContextState: UseSaveDataContextType= {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
    inventory: [],
}

const SaveDataContext = createContext<UseSaveDataContextType>(initialSaveDataContextState);

type ChildrenProps = { children?: ReactElement | ReactElement[]; }

export const SaveDataContextProvider = ({children}: ChildrenProps) => {
    return (
        <SaveDataContext.Provider value={useSaveDataContext(initialState)}>
            {children}
        </SaveDataContext.Provider>
    )
}

export default SaveDataContext;