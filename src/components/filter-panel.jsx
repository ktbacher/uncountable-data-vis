import React, {Component} from 'react';
import '../App.css';
import RangeSelector from './range-selector';

class FilterPanel extends Component{
    render() {
        return(
            <div className="container">
                <h2>Filter Panel</h2>
                {this.props.outputs.map((out) => {return <RangeSelector key={out} output={out} min={this.props.ranges[out].min} max={this.props.ranges[out].max} onRangeChange={this.props.onRangeChange} />})}
            </div>
        )
    }
   
}

export default FilterPanel;