import React, { FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { putCounterAction } from '../../actions';

interface ICounterWriterProps {
    setValue(value: number): void;
}

interface ICounterWriterState {
    newValue: number;
}

class _CounterWriter extends React.Component<ICounterWriterProps, ICounterWriterState> {
    state = {
        newValue: 0,
    }

    render() {
        const { newValue } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <input value={newValue} onChange={this.onChangeValue} type="number" />
                <button type="submit">SET COUNTER</button>
            </form>

        )
    }

    onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        this.setState({
            newValue: value,
        });
    }

    handleSubmit = (e: FormEvent) => {
        const { setValue } = this.props;
        const { newValue } = this.state;
        e.preventDefault();
        setValue(newValue);
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setValue: (value: number) => dispatch(putCounterAction(value))
    };
}

export const CounterWriter = connect(undefined, mapDispatchToProps)(_CounterWriter);