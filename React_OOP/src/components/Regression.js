import React from 'react'
import { useState } from 'react'
import ApexCharts from 'apexcharts'
const math = require('mathjs');
//refactor code from class component to functional component
//THIS ONE ONLY FOR LINEAR AND POLYNOMIAL REGRESSION
const Regression = () => {
    var Size,Degree,Xi;
    var array=[];
    var array2=[];
    var temparray = [];
    var Xarray=[];
    var Yarray=[]
    var Y_Regressionarray = []


    var tempRegression = []; //regression calculate part
    var MatrixA = [];
    var MatrixA_Inv = [];
    var MatrixB = [];
    var answerarray = []


    const [getSize, setSize] = useState('')
    const [getDegree,setDegree] = useState('')
    const [getXi,setXi] = useState('')

    var textt,value;

    var options = { //graph related
      chart: {
        type: 'line',
        width: '750'
      },
      /*series: [{
        name: "Y (Input)",
        data: XYarray
      },
      {
        name: "Y with regression",
        data: Y_Regressionarray
      }
      ]*/
      series: [{
        name: 'Y position',
        type: 'line',
        data: array
      }, {
        name: 'Y position (in Regression function)',
        type: 'line',
        data: array2
      }]
      ,
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
          text: 'Regression Graph',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false
        },
        stroke: {
          dashArray: 8,
          curve: 'smooth'
        }
    }
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

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
          fetch('http://localhost:3001/RegressionExample') //
          .then(res => {
            console.log(res)
          return res.json(); //check respond
          })
          .then(data => {
          console.log(data) //show db.json
          console.log(data[value]) // console.log for shit
          setSize(data[value].getSize)
          setDegree(data[value].getDegree)
          setXi(data[value].getXi)
        })
        .catch(err => console.log(err))
      }
      getValue();
    }      
    
    var getValue = e => {//hale input event and pass value to function
        e.preventDefault();
        document.getElementById('matrix').innerHTML = ""//clear matrix each clicks
        Size = getSize
        Degree = getDegree
        Xi = getXi;
        
        console.log("Size = "+Size)
        console.log("Degree = "+Degree)
        console.log("Xi = "+Xi)
        createMatrix(Size)
        
        
        
    }

    function createMatrix(Size)
    {
      for(var row=1;row<=Size;row++)
      {
        for(var col=1;col<=2;col++)
        {
          document.getElementById('matrix').innerHTML += '<input type="text" id="matrix_index_row'+row +'col'+(col)+'" name="" placeholder="-" size=3>';
        }
        document.getElementById('matrix').innerHTML += '<br/>'
      }
      document.getElementById('cal_button').innerHTML = ""//create button
      document.getElementById('cal_button').innerHTML += '<button onclick="calculate()">Calculate the matrix</button>'
      document.getElementById('cal_button').onclick = function(){calculate()};//button call calculate function

      
    }

    function calculate()
    {
      //clear output array
      document.getElementById('outputarray').innerHTML = ""

      //get array input
      for(var row=1;row<=Size;row++)
      {
        for(var col=1;col<=2;col++)
        {
          var getvalue = parseFloat(document.getElementById('matrix_index_row'+row +'col'+(col)).value)
          temparray.push(getvalue) //get input from form then push to array
          console.log(temparray)
        }
        console.log(temparray)
        array.push(temparray) //push each row to main array
        temparray = []; // clear small array
      }
      console.log(array)
      //show array as output
      for(var i = 0;i<Size;i++)
      {
        document.getElementById('outputarray').innerHTML += "[ "
        for(var j = 0;j<1;j++)
        {
            document.getElementById('outputarray').innerHTML += ""+array[i][0]+"x "
            document.getElementById('outputarray').innerHTML += " = "+array[i][1]+"y] <br/>"
        }
      }

      //seperate X and Y
      for(var a=0;a<Size;a++)
      {
        Xarray.push(array[a][0]);
      }
      for(var b=0;b<Size;b++)
      {
        Yarray.push(array[b][1]);
      }
      console.log(Xarray)
      console.log(Yarray)


      //push x for plot graph since somehow it didnt work

      RegressionCalc();
      printout();


      


      array = [];//clear array for next inc array input
      
      tempRegression = [];
      MatrixA = [];
      MatrixB = [];
      Y_Regressionarray = []
      answerarray = [];
      
      Xarray =[];
      Yarray = [];

      array2 = []
    }

    function RegressionCalc()
    {
      console.log("RegressionCalc")
      
        //Regression cal
        //get matrix A
        for(var row=0;row<=Degree;row++)
        {
            for(var col=0;col<=Degree;col++)
            {
                let mul = row+col
                tempRegression.push(SumofSquareX(Xarray,mul)); //call function to mul the sum
            }
            MatrixA.push(tempRegression) //push to array matrix A
            tempRegression = []; //clear array for next inc row
        }
        console.log(MatrixA)
        //get matrix B
        for(var row2=0;row2<=Degree;row2++)
        {
            //console.log(row2)
            tempRegression.push(SumofSquareY(Xarray,Yarray,row2)); //call function to mul the sum
            MatrixB.push(tempRegression)  //push to array matrix B
            tempRegression = []; //clear array for next inc row
        }
        console.log(MatrixB)

        //find each a with using Matrix inverse
        MatrixA_Inv = math.inv(MatrixA)
        answerarray = math.multiply(MatrixA_Inv,MatrixB);
        console.log(MatrixA_Inv)
        console.log(answerarray)
    }

    function SumofSquareX(arr,mul) //function return X^...
    {
      let sumofsqrt = 0.0;
      for(var i = 0;i<Size;i++)
      {
        sumofsqrt += Math.pow(arr[i],mul);
      }
      return sumofsqrt
    }

    function SumofSquareY(arr,arr2,mul2) //function return X^...*Y
    {
      let sumofsqrt2 = 0.0;
      for(var i = 0;i<Size;i++)
      {
        sumofsqrt2 += Math.pow(arr[i],mul2)*arr2[i]
      }
      return sumofsqrt2
    }

    function printout()
    {
      
      document.getElementById('final').innerHTML = ""
      document.getElementById('proof').innerHTML = ""
      
        for(var i = 0;i<=Degree;i++)
        {
          document.getElementById('final').innerHTML += "a("+i+") = "+answerarray[i]+"<Br/>"
        }//print out answer
        console.log(Xi)

        //proof if insert xi
        if(Xi!=='')
        {
          let sumproof = 0;
          document.getElementById('proof').innerHTML = "g("+Xi+") ="
          for(var j = 0;j<=Degree;j++)
          {
            document.getElementById('proof').innerHTML += "+("+answerarray[j]+"*"+Math.pow(Xi,j)+")";
            sumproof += answerarray[j]*Math.pow(Xi,j);
          }
           document.getElementById('proof').innerHTML += " =" + sumproof;
        }
        
        //แทนค่า aทุกตัวในสมาการหหา X ที่ใส่ input plot graph
        for(var k = 0;k<Xarray.length;k++)
        {
          let regressionresult = 0;
          for(var l = 0;l<=Degree;l++)
          {
            regressionresult += answerarray[l]*Math.pow(Xarray[k],l);
          }
          Y_Regressionarray.push(regressionresult)
        }
        console.log(Xarray)
        console.log(Yarray)
        console.log(Y_Regressionarray)
        //เอาค่าใส่ array ไว้ plot graph
        for(var d = 0;d<Y_Regressionarray.length;d++)
          {
            let tempa = []
            tempa.push(Xarray[d])
            tempa.push(Y_Regressionarray[d])
            array2.push(tempa)
          }
          console.log(array2)

          
    }

    return(<body>
        <div>
          <form onSubmit={getValue}>
            <div>
                <h1>&emsp;Linear / Polynomial Regression&emsp;</h1>
              <label htmlFor='Size'>&emsp;Number of data :&emsp;</label>
              <input 
                name='Size'
                placeholder='Number of size.' 
                value = {getSize}
                onChange={event => setSize(event.target.value)}
                size='11'
              />
              <label htmlFor='Degree'>&emsp;Degree :&emsp;</label>
              <input 
                name='Degree'
                placeholder='Ex: 2 = a0+a1x+a2x^2' 
                value = {getDegree}
                onChange={event => setDegree(event.target.value)}
                size='18'
              />
            </div>
            <p></p>
            <label htmlFor='Xi'>&emsp;Xi :&emsp;</label>
              <input 
                name='Xi'
                placeholder='Ex: X that we want to know' 
                value = {getXi}
                onChange={event => setXi(event.target.value)}
                size='3'
              />
            <p></p>
            <label htmlFor='example'>&emsp;example :&emsp;</label>
          <select name="example" id="example" onChange={getexam}>
                <option disabled selected value="0">Select โจทย์</option>
                <option value="1">ตัวอย่าง 1</option>
                </select>
            <p>
            <div>
            &emsp;<button>Submit</button>
            </div>
            </p>
            <p id = 'matrix'></p>
            <p id = 'cal_button'></p>
            <p id = 'outputarray'></p>
            <h3><p id = 'final'></p></h3>
            <p id = 'proof'></p>
            <p id = 'chart'></p>
          </form>
          </div>
          </body>
    )
}


export default Regression