import {createContext, ReactElement, useMemo, useReducer} from "react";

type FilterStateType = {hideAcquired: boolean}

const initialState: FilterStateType = {
    hideAcquired: false,
}

const REDUCER_ACTIONS_TYPE = {
    TOGGLE_ACQUIRED: 'TOGGLE_ACQUIRED',
}

export type ReducerAction = {
    type: string;
    payload?: boolean;
}

const reducer = (state: FilterStateType, action: ReducerAction): FilterStateType => {
    switch (action.type) {
        case REDUCER_ACTIONS_TYPE.TOGGLE_ACQUIRED: {
            return {...state, hideAcquired: !state.hideAcquired};
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

    return {dispatch, hideAcquired, REDUCER_ACTIONS};
}

type UseFilterContextType = ReturnType<typeof useFilterContext>

const initialFilterContexStatet:UseFilterContextType  = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
    hideAcquired: false,
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

