import { IAction, ActionType } from './store';
import { Dispatch } from 'redux';
import axios from 'axios';

interface IGetCounterResponse {
    counter: number;
}

// this is a sync action creator, which doesn't need redux-thunk
// we can use this when we don't have to do async stuff such as http calls
export const getCounterActionSync = () => {
    return {
        type: 'GET_COUNTER_SYNC',
        payload: {
            counter: 5
        }
    }
}

// this is an async action creator, which needs redux-thunk
// because we don't return an object, we return a function instead
// when dispatch receives this function, it calls the function and passes ITSELF (dispatch) to the function
export const getCounterAction = () => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.GetCounterPending,
            payload: {},
        });

        try {
            const { data } = await axios.get<IGetCounterResponse>('http://localhost:4000/counter');
            const { counter } = data;
            dispatch({
                type: ActionType.GetCounterSuccess,
                payload: {
                    counter,
                }
            });
        } catch (e) {
            dispatch({
                type: ActionType.GetCounterFail,
                payload: {}
            });
        }
    };
}

export const putCounterAction = (value: number) => {
    return async (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: ActionType.PutCounterPending,
            payload: {},
        });

        try {
            await axios.put('http://localhost:4000/counter', {value});
            dispatch({
                type: ActionType.PutCounterSuccess,
                payload: {
                    counter: value,
                }
            });
        } catch (e) {
            dispatch({
                type: ActionType.PutCounterFail,
                payload: {}
            });
        }
    };
}