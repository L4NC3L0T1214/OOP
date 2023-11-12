import React,{ Component } from 'react'
import { useState } from 'react'
import ApexCharts from 'apexcharts'
const math = require('mathjs');
var xarray = [];
var iarray = [];
//refactor code from class component to functional component

const NewtonRaphson = () => {
    var Funct,ErrorApox,X;

    const [getFunct, setFunct] = useState('')
    const [getErrorApox, setErrorApox] = useState('')
    const [getX, setX] = useState('')
    var xgraph = xarray;
    var igraph = iarray;

    var value,textt //api stuff

    var options = { //graph related
        chart: {
          type: 'line',
          width: '750'
        },
        series: [{
          name: "X value",
          data: xgraph
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
            text: 'Newton-Raphson Graph',
            align: 'cebter',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false
        }
      }
      
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render(); //render chart (every time that state change)

    var getexam = e => {
      e.preventDefault();
      //get index 
      var d = document.getElementById("example")
      value = d.value;
      textt = d.options[d.selectedIndex].text;
      console.log(value)
      console.log(textt)
      //set value from api and set to input form
      if(value!=0) //if option is select get data from api


      //json-server --watch db.json --port xxxxx
      //อย่าลืมเรียก terminal แล้วรัน Server ก่อน
      //ดึงข้อมูลจาก  json server
      {
          fetch('http://localhost:3001/NewtonRaphsonExample') //
          .then(res => {
            console.log(res)
          return res.json(); //check respond
          })
          .then(data => {
          console.log(data) //show db.json
          console.log(data[value]) // console.log for shit
          console.log(data[value].getX) // console.log for shit
          setX(data[value].getX)
          setErrorApox(data[value].getErrorApox)
          setFunct(data[value].getFunct)
        })
        .catch(err => console.log(err))
      }
      getValue();
    }


    var getValue = e => {//hale input event and pass value to function
        e.preventDefault();
        Funct = getFunct
        ErrorApox = getErrorApox;
        X = getX;
        
        console.log(X);
        console.log(ErrorApox);
        console.log(Funct);
        iarray.splice(0,iarray.length) //clear array everytime user click calculate
        xarray.splice(0,xarray.length)
        
        NewtonCalcFunction(X,ErrorApox,Funct)
    }

    function NewtonCalcFunction(X,ErrorApox,Funct)
    {
        var i = 0;
        var x = parseFloat(X);;
        var deltaX;
        var ErrorApox_Answer=10000000; //set as default
        var inputerrorapox = parseFloat(ErrorApox)
        let text = "";
        let finalanswer = "===>";

        function fx(input) //if this x = 3
        {
            const exprfx = math.parse(Funct) //turning this from string into math expression
            return exprfx.evaluate({x: input}); //replace any x in math expression with input(x)
        }
        function fxprime(input)
        {
            const exprfxprime  = math.derivative(math.parse(Funct), 'x')
            return exprfxprime.evaluate({x: input});
        }
        
        if(x!=null && Funct!=null && inputerrorapox!=null){//bisection function
            while(ErrorApox_Answer>inputerrorapox && i!==100)
            {
                deltaX = ((-fx(x))/(fxprime(x)));
                x = x+deltaX
                ErrorApox_Answer = Math.abs((deltaX)/x)*100;
                i++
            xarray.push(x.toFixed(6));
            iarray.push(i) //push to store in array (use for render graph)
            console.log("X = "+x)
            console.log("Errorapox = "+ErrorApox_Answer) 
            text = text+"At Iteration #"+i+" XM = "+x.toFixed(6)+" with Errorapox of "+ErrorApox_Answer.toFixed(6)+"<br>"    //for show every iteration with xm value and errorapox
        }
        finalanswer = finalanswer+"XM value is "+x.toFixed(6)+" at Iteration #"+i+"<br>";

        document.getElementById("finalans").innerHTML = finalanswer
        console.log(finalanswer)
        console.log(xarray)
        console.log(iarray)
        document.getElementById("finaltext").innerHTML = text
        document.getElementById("finalx").innerHTML = xarray //pass elementID
      }
    }

    return(<body>
        <div>
          <form onSubmit={getValue}>
            <div>
                <h1>&emsp;Newton-Raphson Method&emsp;</h1>
              <label htmlFor='X'>&emsp;X :&emsp;</label>
              <input 
                name='X'
                placeholder='Starting X' 
                value = {getX}
                onChange={event => setX(event.target.value)}
                size='8'
              />
              <label htmlFor='ErrorApox'>&emsp;Error approximation :&emsp;</label>
              <input
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
                name='Funct' 
                placeholder='Input function here!'
                value={getFunct}
                onChange={event => setFunct(event.target.value)}
                size='30'
              />
              <label htmlFor='example'>&emsp;example :&emsp;</label>
          <select name="example" id="example" onChange={getexam}>
                <option disabled selected value="0">Select โจทย์</option>
                <option value="1">ตัวอย่าง 1</option>
                <option value="2">ตัวอย่าง 2</option>
                <option value="3">ตัวอย่าง 3</option>
                <option value="4">ตัวอย่าง 4</option>
                <option value="5">ตัวอย่าง 5</option>
                </select>
            </div>
            <p></p>
            <p>
            <div>
            &emsp;<button>Calculate</button>
            </div>
            </p>
            <h2><p id = 'finalans'></p></h2>
            <p id = 'chart'></p>
            <p id = 'finaltext'></p>
          </form>
          </div>
          </body>
    )
}


export default NewtonRaphson