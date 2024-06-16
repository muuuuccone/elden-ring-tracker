import {createContext, ReactElement, useMemo, useReducer} from "react";

type FilterStateType = {
    hideAcquired: boolean,
    howToDrop: 'all' | 'foe' | 'chest' | 'scarab' | 'boss' | 'merchant' | 'quest' | 'invader'
}

const initialState: FilterStateType = {
    hideAcquired: false,
    howToDrop: 'all'
}

const REDUCER_ACTIONS_TYPE = {
    TOGGLE_ACQUIRED: 'TOGGLE_ACQUIRED',
    SET_HOW_TO_DROP: 'SET_HOW_TO_DROP'
}

export type ReducerAction = {
    type: string;
    payload?: boolean | string;
}

const reducer = (state: FilterStateType, action: ReducerAction): FilterStateType => {
    switch (action.type) {
        case REDUCER_ACTIONS_TYPE.TOGGLE_ACQUIRED: {
            return {...state, hideAcquired: !state.hideAcquired};
        }
        case REDUCER_ACTIONS_TYPE.SET_HOW_TO_DROP: {
            if (action.payload === 'all' || action.payload === 'foe' || action.payload === 'chest' || action.payload === 'scarab' || action.payload === 'boss' || action.payload === 'merchant' || action.payload === 'quest' || action.payload === 'invader')
                return {...state, howToDrop: action.payload};
            return state;
        }
        default:
            throw new Error("Action not supported")
    }
}

const useFilterContext = (initialFilterState: FilterStateType) => {
    const [state, dispatch] = useReducer(reducer, initialFilterState);

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTIONS_TYPE
    }, [])

    const hideAcquired = state.hideAcquired;
    const howToDrop = state.howToDrop;

    return {dispatch, hideAcquired, howToDrop, REDUCER_ACTIONS};
}

type UseFilterContextType = ReturnType<typeof useFilterContext>

const initialFilterContexStatet: UseFilterContextType = {
    dispatch: () => {
    },
    REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
    hideAcquired: false,
    howToDrop: 'all'
};

const FilterContext = createContext(initialFilterContexStatet);

type ChildrenProps = { children?: ReactElement | ReactElement[]; }

export const FilterContextProvider = ({children}: ChildrenProps) => {
    return (
        <FilterContext.Provider value={useFilterContext(initialState)}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext;

