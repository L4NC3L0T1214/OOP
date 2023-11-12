import React,{ Component } from 'react'
import { useState } from 'react'
const math = require('mathjs');

class Cramer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
    };
    this.matrix_A = [];
    this.matrix_b = [];
    this.result = [];
    this.detAi = [];
    this.value = null;
    this.textt = null;
  }

  getValue = (e) => {
    e.preventDefault();
    document.getElementById('matrix').innerHTML = '';
    const { size } = this.state;
    this.createMatrix(size);
  };

  getExam = (e) => {
    e.preventDefault();
    const d = document.getElementById('example');
    this.value = d.value;
    this.textt = d.options[d.selectedIndex].text;
    if (this.value !== '0') {
      fetch('http://localhost:3000/CramerExample')
        .then((res) => res.json())
        .then((data) => {
          this.setState({ size: data[this.value].getSize });
        })
        .catch((err) => console.log(err));
    }
    this.createMatrix(this.state.size);
  };

  createMatrix = (size) => {
    for (let row = 1; row <= size; row++) {
      for (let col = 0; col <= size; col++) {
        document.getElementById('matrix').innerHTML +=
          '<input type="text" id="matrix_index_row' + row + 'col' + (col + 1) + '" name="" placeholder="---" size=3>';
      }
      document.getElementById('matrix').innerHTML += '<br/>';
    }
    document.getElementById('cal_button').innerHTML = '';
    document.getElementById('cal_button').innerHTML += '<button onClick={this.calculate}>Calculate the matrix</button>';
  };

  calculate = () => {
    document.getElementById('outputarray').innerHTML = '';
    for (let row = 1; row <= this.state.size; row++) {
      for (let col = 0; col <= this.state.size; col++) {
        const getvalue = parseFloat(document.getElementById('matrix_index_row' + row + 'col' + (col + 1)).value);
        this.temparray.push(getvalue);
      }
      this.array.push(this.temparray);
      this.temparray = [];
    }
    for (let i = 0; i < this.state.size; i++) {
      document.getElementById('outputarray').innerHTML += '[ ';
      for (let j = 0; j < this.state.size; j++) {
        document.getElementById('outputarray').innerHTML +=
          '' + this.array[i][j] + 'a(' + (j + 1) + ') ';
      }
      document.getElementById('outputarray').innerHTML += ' = ' + this.array[i][this.state.size] + ' ] <br/>';
    }
    this.CramerruleCal();
    this.showoutput();

    this.array = [];
    this.answerarray = [];
    this.result = [];
    this.detresult = [];
    this.detAi = [];
    this.matrix_A = [];
    this.matrix_b = [];
  };

  CramerruleCal = () => {
    const { size } = this.state;
    const temparr = this.matrix_A.map((a) => a.slice());
  
    for (let i = 0; i < size; i++) {
      this.matrix_A = temparr.map((a) => a.slice());
      for (let j = 0; j < size; j++) {
        this.matrix_A[j][i] = this.matrix_b[j];
      }
      this.detAi[i] = math.det(this.matrix_A);
      this.detresult[i] = this.detAi[i] / this.detA;
    }
  };
  
  showoutput = () => {
    const ans = this.detresult.map((arr) => arr.toFixed(6));
    let output = '';
    for (let times = 0; times < this.state.size; times++) {
      output += `a(${times + 1}): ${this.detAi[times]}/${this.detA} = ${ans[times]}<br/>`;
    }
    document.getElementById('final').innerHTML = output;
  };
  

  render() {
    return (
      <body>
        <div>
          <form onSubmit={this.getValue}>
            <div>
              <h1>&emsp;Cramer's Rule&emsp;</h1>
              <label htmlFor='Size'>&emsp;Size :&emsp;</label>
              <input
                name='Size'
                placeholder='Ex: 4 for 4x4'
                value={this.state.size}
                onChange={(event) => this.setState({ size: event.target.value })}
                size='8'
              />
              <label htmlFor='example'>&emsp;example :&emsp;</label>
              <select name='example' id='example' onChange={this.getExam}>
                <option disabled selected value='0'>
                  Select โจทย์
                </option>
                <option value='1'>ตัวอย่าง 1</option>
              </select>
            </div>
            <p></p>
            <p>
              <div>
                &emsp;<button type='submit'>Submit</button>
              </div>
            </p>
            <p id='matrix'></p>
            <p id='cal_button'></p>
            <p id='outputarray'></p>
            <h3>
              <p id='final'></p>
            </h3>
          </form>
        </div>
      </body>
    );
  }
}

export default Cramer;
