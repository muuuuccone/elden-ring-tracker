import {createContext, ReactNode, useMemo, useReducer} from "react";

type SaveDataStateType = {inventory: string[]}

const initialState: SaveDataStateType = {
    inventory: [],
}

const REDUCER_ACTIONS_TYPE = {
    LOAD: 'LOAD',
    SET_SLOT: 'SET_SLOT',
}

export type ReducerActionType = typeof REDUCER_ACTIONS_TYPE

export type ReducerAction = {
    type: string;
    payload?: string[] | null;
}

const reducer = (state: SaveDataStateType, action: ReducerAction): SaveDataStateType => {
    console.log('qui')
    switch (action.type) {
        case REDUCER_ACTIONS_TYPE.LOAD: {
            if (action.payload)
                return {...state, inventory: action.payload};
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
    inventory: [],
    REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
}

const SaveDataContext = createContext<UseSaveDataContextType>(initialSaveDataContextState);

type ChildrenProps = { children?: ReactNode | ReactNode[]; }

export const SaveDataContextProvider = ({children}: ChildrenProps) => {
    return (
        <SaveDataContext.Provider value={useSaveDataContext(initialState)}>
            {children}
        </SaveDataContext.Provider>
    )
}

export default SaveDataContext;