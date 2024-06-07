import {createContext, ReactNode, useMemo, useReducer} from "react";

type SaveDataStateType = {slot: number}

const initialState: SaveDataStateType = {
    slot: 0,
}

const REDUCER_ACTIONS_TYPE = {
    SET_SLOT: 'SET_SLOT',
}

export type ReducerActionType = typeof REDUCER_ACTIONS_TYPE

export type ReducerAction = {
    type: string;
    payload?: number | null;
}

const reducer = (state: SaveDataStateType, action: ReducerAction): SaveDataStateType => {
    console.log(action)
    switch (action.type) {
        case REDUCER_ACTIONS_TYPE.SET_SLOT: {
            if (action.payload)
                return {...state, slot: action.payload}
        }
        default:
            return state;
    }
}

const useSaveDataContext = (initialSaveDataState: SaveDataStateType) => {
    const [state, dispatch] = useReducer(reducer, initialSaveDataState);

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTIONS_TYPE
    }, [])

    const slot = state.slot;

    return {dispatch, slot, REDUCER_ACTIONS};
}

type UseSaveDataContextType = ReturnType<typeof useSaveDataContext>

const initialSaveDataContextState: UseSaveDataContextType= {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
    slot: 0,
}

const SaveDataContext = createContext(initialSaveDataContextState);

type ChildrenProps = { children?: ReactNode | ReactNode[]; }

export const SaveDataContextProvider = ({children}: ChildrenProps) => {
    return (
        <SaveDataContext.Provider value={useSaveDataContext(initialState)}>
            {children}
        </SaveDataContext.Provider>
    )
}

export default SaveDataContext;