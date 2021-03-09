import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import { getCounterAction } from '../../actions';

interface ICounterReaderProps {
    getValue(): void;
    isLoading: boolean;
    value: number | null;
}

class _CounterReader extends React.Component<ICounterReaderProps> {
    componentDidMount() {
        const { getValue } = this.props;
        getValue();
    }

    render() {
        const { value, isLoading } = this.props;
        if (isLoading) {
            return (
                <div>Fetching data from server...</div>
            );
        }

        if (value === null) {
            return (
                <div>Error getting data</div>
            )
        }

        return (
            <div>
                Current value is {value}
            </div>
        )
    }
}

const mapStateToProps = (state: State) => {
    return {
        value: state.counter,
        isLoading: state.isCounterLoading,
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        // getValueSync: () => dispatch(getCounterActionSync()),
        getValue: () => dispatch(getCounterAction()),
    }
}

export const CounterReader = connect(mapStateToProps, mapDispatchToProps)(_CounterReader);