import React, {Component} from 'react';
import './App.css';
import Chart from './components/chart';
import InputSelector from './components/input-selctor';
import Header from './components/header';
import FilterPanel from './components/filter-panel';
import data from './data/data';

class App extends Component {
  state = {
    expNames: Object.keys(data),
    outputs: Object.keys(data[Object.keys(data)[0]].outputs),
    selected1: Object.keys(data[Object.keys(data)[0]].outputs)[0],
    selected2: Object.keys(data[Object.keys(data)[0]].outputs)[1],
    filteredData: Object.keys(data),
    filterRanges: ""
  }

  calcRanges() {
    let ranges = {}
    this.state.outputs.forEach(out => {
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
        ranges[out] = {"min": min, "max": max};
    }); 
    return ranges
  }

  handleSelector = (e) => {
    this.setState(() => {
      if (e.target.id === "x") {
        return {selected1: e.target.value}
      } else {
        return {selected2: e.target.value}
      }
    });
  }

  handleRange = (e) => {
    this.setState((state) => {
      let filterRanges;
      if (state.filterRanges === "") {
        filterRanges = this.calcRanges();
      } else {
        filterRanges = state.filterRanges;
      }
      
      state.outputs.forEach((out) => {
        if (out === e.target.id.slice(0,-3)) {
          if (e.target.id.slice(-3) === "Max") {
            filterRanges[out].max = e.target.value
          } else {
            filterRanges[out].min = e.target.value
          }
        }
      });
      return{filterRanges}
    }, this.filterData);
  }

  filterData() {
    this.setState((state) => {
      const filteredData = Object.keys(data).filter((exp) => {
        for (const out in data[exp].outputs) {
          console.log("comparison", exp + " "+ out + " " + String(data[exp].outputs[out])+" "+ String(state.filterRanges[out].min) +"-"+ String(state.filterRanges[out].max));
          if (data[exp].outputs[out] < state.filterRanges[out].min) {
            return false;
          }
          if (data[exp].outputs[out] > state.filterRanges[out].max) {
            return false;
          }
        }
        return true;
      })
      console.log("filtered data", filteredData);
      return{filteredData}
    });
    
  }

  render() {
    const ranges = this.state.filterRanges || this.calcRanges();
    return (
      <div className="App">
        <header className="App-header">
          <Header className="title-header"/>
          <div className="data-container">
            <FilterPanel outputs={this.state.outputs} ranges={ranges} onRangeChange={this.handleRange} />
            <div>
              <Chart prop1={this.state.selected1} prop2 = {this.state.selected2} data={this.state.filteredData} />
              <InputSelector type="x" default={this.state.selected1} onSelect={this.handleSelector} options={this.state.outputs.filter((out) => out !== this.state.selected2)} />
              <InputSelector type="y" defatul={this.state.selected2} onSelect={this.handleSelector} options={this.state.outputs.filter((out) => out !== this.state.selected1)}/> 
            </div>
          </div>
          
        </header>

      </div>
    )
  }
}

export default App;