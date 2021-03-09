import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface State {
    isCounterLoading: boolean;
    counter: number | null;
}

const initialState: State = {
    isCounterLoading: false,
    counter: null,
}

export interface IAction {
    type: ActionType;
    payload: Record<string, any>;    
}

export enum ActionType {
    GetCounterPending = 'GET_COUNTER_PENDING',
    GetCounterSuccess = 'GET_COUNTER_SUCCESS',
    GetCounterFail = 'GET_COUNTER_FAIL',
    PutCounterPending = 'PUT_COUNTER_PENDING',
    PutCounterSuccess = 'PUT_COUNTER_SUCCESS',
    PutCounterFail = 'PUT_COUNTER_FAIL',
}

const reducer = (state = initialState, action: IAction): State => {
    switch (action.type) {
        case ActionType.GetCounterPending: {
            return {
                ...state,
                isCounterLoading: true,
            }
        }

        case ActionType.GetCounterSuccess: {
            const { counter } = action.payload
            return {
                ...state,
                counter,
                isCounterLoading: false,
            }
        }

        case ActionType.GetCounterFail: {
            return {
                ...state,
                isCounterLoading: false,
            }
        }

        case ActionType.PutCounterSuccess: {
            const { counter } = action.payload
            return {
                ...state,
                counter,
            }
        }

        default: {
            return state;
        }
    }
}

export function createReduxStore() {
    const logger = createLogger();
    const middleware = composeWithDevTools(applyMiddleware(thunk, logger));
    return createStore(reducer, middleware);
}