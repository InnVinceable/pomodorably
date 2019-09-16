import React from 'react';
import './styles.css';

class Option extends React.Component {
    onChange(e) {
        e.preventDefault();
        this.props.updateLength(this.props.timer, e)
    }

    convertToMinutes(seconds) {
        return Math.floor(seconds / 60);
    }

    render() {
        return (
            <label className="input-group">
                {this.props.children}
                <input className="input-group__input" type="number" min="1" step="1" placeholder="Insert minutes" onChange={this.onChange.bind(this)} value={this.convertToMinutes(this.props.value)} />
            </label>
        )
    }
}

export default Option;
