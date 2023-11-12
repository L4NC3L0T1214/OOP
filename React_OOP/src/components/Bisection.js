import React, { Component, useEffect } from 'react'
import { useState } from 'react'
import ApexCharts from 'apexcharts'
const math = require('mathjs');

class BisectionSolver {
    constructor(XL, XR, ErrorApox, Funct) {
        this.XL = parseFloat(XL);
        this.XR = parseFloat(XR);
        this.ErrorApox = parseFloat(ErrorApox);
        this.Funct = Funct;
        this.xmarray = [];
        this.iarray = [];
    }

    solveBisection() {
        var xl = this.XL;
        var xr = this.XR;
        var i = 0;
        var ErrorApox_Answer = 10000000;

        function fx(input) {
            const exprfx = math.parse(this.Funct);
            return exprfx.evaluate({ x: input });
        }

        while (ErrorApox_Answer > this.ErrorApox && i !== 100) {
            var xm = (xl + xr) / 2;
            if (fx(xm) * fx(xr) < 0) {
                xl = xm;
            } else if (fx(xm) * fx(xr) > 0) {
                xr = xm;
            }
            ErrorApox_Answer = Math.abs((xm - xr) / xm) * 100;
            i++;
            this.xmarray.push(xm.toFixed(6));
            this.iarray.push(i);
        }
    }
}

const Bisection = () => {
    const [getFunct, setFunct] = useState('');
    const [getErrorApox, setErrorApox] = useState('');
    const [getXL, setXL] = useState('');
    const [getXR, setXR] = useState('');
    const [xmgraph, setXmGraph] = useState([]);
    const [igraph, setIGraph] = useState([]);
    const [finalAnswer, setFinalAnswer] = useState('');

    const options = {
        chart: {
            type: 'line',
            width: '750'
        },
        series: [{
            name: "XM_value",
            data: xmgraph
        }],
        xaxis: {
            categories: igraph
        },
        grid: {
            row: {
                colors: ['#e5e5e5', 'transparent'],
                opacity: 0.5
            },
            column: {
                colors: ['#f8f8f8', 'transparent'],
            },
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        title: {
            text: 'Bisection Graph',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false
        }
    };

    const getExam = (e) => {
        e.preventDefault();
        var value, textt;
        var d = document.getElementById("example");
        value = d.value;
        textt = d.options[d.selectedIndex].text;
        console.log(value);
        console.log(textt);
        if (value !== '0') {
            fetch(`http://localhost:3000/BisectionExample/${value}`)
                .then(res => res.json())
                .then(data => {
                    setXL(data.getXL);
                    setXR(data.getXR);
                    setErrorApox(data.getErrorApox);
                    setFunct(data.getFunct);
                })
                .catch(err => console.log(err));
        }
        getValue();
    };

    const getValue = (e) => {
        e.preventDefault();
        const solver = new BisectionSolver(getXL, getXR, getErrorApox, getFunct);
        solver.solveBisection();
        setXmGraph([...solver.xmarray]);
        setIGraph([...solver.iarray]);
        setFinalAnswer(`XM value is ${solver.xmarray[solver.xmarray.length - 1]} at Iteration #${solver.iarray.length}`);
    };

    useEffect(() => {
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }, [options]);

    return (
      <body>
      <div>
        <form onSubmit={getValue}>
          <div>
            <h1>&emsp;Bisection Method&emsp;</h1>
            <label htmlFor='XL'>&emsp;XL :&emsp;</label>
            <input
              id='XL'
              name='XL'
              placeholder='Starting XL'
              value={getXL}
              onChange={event => setXL(event.target.value)}
              size='8'
            />
            <label htmlFor='XR'>&emsp;XR :&emsp;</label>
            <input
              id='XR'
              name='XR'
              placeholder='Starting XR'
              value={getXR}
              onChange={event => setXR(event.target.value)}
              size='8'
            />
            <label htmlFor='ErrorApox'>&emsp;Error approximation :&emsp;</label>
            <input
              id='ErrorApox'
              name='ErrorApox'
              placeholder='ErrorApox'
              value={getErrorApox}
              onChange={event => setErrorApox(event.target.value)}
              size='5'
            />
          </div>
          <p></p>
          <div>
            <label htmlFor='Funct'>&emsp;Function :&emsp;</label>
            <input
              id='Funct'
              name='Funct'
              placeholder='Input function here!'
              value={getFunct}
              onChange={event => setFunct(event.target.value)}
              size='30'
            />
          </div>
          <p></p>
          <p>
            <div>
              &emsp;<button>Calculate</button>
            </div>
          </p>
        </form>
        <div>
          <label htmlFor='example'>&emsp;example :&emsp;</label>
          <select name="example" id="example" onChange={getExam}>
                    <option disabled selected value="0">Select โจทย์</option>
                    <option value="1">ตัวอย่าง 1</option>
                    <option value="2">ตัวอย่าง 2</option>
                    <option value="3">ตัวอย่าง 3</option>
                    <option value="4">ตัวอย่าง 4</option>
                    <option value="5">ตัวอย่าง 5</option>
                </select>
        </div>
        <h2><p id='finalans'></p></h2>
        <p id='chart'></p>
        <p id='finaltext'></p>
      </div>
    </body>
    );
};

export default Bisection;
