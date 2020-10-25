import React, {Component} from 'react';
import '../App.css'

class InputSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.default};
      }

    render() {
        return (
            <form>
                <label>Chose {this.props.type} property: </label>
                <select id={this.props.type} defaultValue={this.state.value} onChange={this.props.onSelect}>
                    {this.props.options.map((out) => {return <option key={out} value={out}>{out}</option>})}
                </select>
            </form>
        )  
    }
}

export default InputSelector