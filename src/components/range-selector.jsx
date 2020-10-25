import React, {Component} from 'react';
import '../App.css'
import data from '../data/data';

class RangeSelector extends Component {

    render() {
        const out = this.props.output
        let min = ""
        let max = ""
        for (const exp in data) {
            let val = data[exp].outputs[out]
            if (min === "" || val < min) {
                min = val;
            }
            if (max === "" || val > max) {
                max = val;
            }
        }
        let range = {"min": min, "max": max};

        return (
            <div className="range-container">
                <h3>{this.props.output}</h3>
                
                <div className="range-inputs">
                    <label for="min">Min</label>
                    <input className="range min" type="number" id={this.props.output+"Min"} name="min"
                            min={Math.floor(range.min)} max={Math.ceil(range.max)} defaultValue={Math.floor(range.min)} onChange={this.props.onRangeChange} step="0.1"/>
                    <input className="range max" type="number" id={this.props.output+"Max"} name="max"
                            min={Math.floor(range.min)} max={Math.ceil(range.max)} defaultValue={Math.ceil(range.max)} onChange={this.props.onRangeChange} step="0.1"/>
                    <label for="max">Max</label>
                </div>
            
            </div>
        )
    }
}

export default RangeSelector;
        