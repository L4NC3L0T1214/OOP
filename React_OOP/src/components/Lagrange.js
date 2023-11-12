import React from 'react'
import { useState } from 'react'

//refactor code from class component to functional component

const Langrange = () => {
    var Size
    var Xi;
    var array=[];
    var temparray = [];
    var Lterm = [];
    var sum = 0.0;

    const [getSize, setSize] = useState('')
    const [getXi, setXi] = useState('')

    var getValue = e => {//hale input event and pass value to function
        e.preventDefault();
        document.getElementById('matrix').innerHTML = ""//clear matrix each clicks
        Size = getSize
        Xi = getXi
        
        console.log("Size = "+Size)
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
        console.log("------")
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

      LangrangeCalc();
      printEachLterm();

      array = [];//clear array for next inc array input
      Xi = 0;
      Lterm = [];
    }

    function LangrangeCalc()
    {
      console.log("LangrangeCalc")
      console.log(array)

        //langrange cal
        for(var a=0;a<Size;a++)
        {
            let term = array[a][1];
            for(var b=0;b<Size;b++)
            {
                if(b!==a)
                {
                    term = term*(Xi - array[b][0])/(array[a][0]-array[b][0])
                }
            }
            // Add current term to result
            sum = sum + term;
            Lterm.push(term)
        }
      console.log("sum = "+sum)
      document.getElementById('final').innerHTML = "f("+Xi+") = "+sum.toFixed(6);
      sum = 0;

    }

    function printEachLterm()
    {
        let proofsum = 0;
        document.getElementById('printLterm').innerHTML = "Each L(i)F(x) term <br/>"
        for(var i = 0;i<Size;i++) //print out each term
        {
            document.getElementById('printLterm').innerHTML += "L"+i+"f("+i+")"+" = "+Lterm[i]+"<br/>";
        }
        for(var j = 0;j<Size;j++) //proof
        {
            document.getElementById('printLterm').innerHTML += "+ ("+Lterm[j]+") ";
        }
        for(var k = 0;k<Size;k++) //proof-sum
        {
            proofsum += Lterm[k];
        }
        document.getElementById('printLterm').innerHTML += "= "+proofsum;
    }


    return(<body>
        <div>
          <form onSubmit={getValue}>
            <div>
                <h1>&emsp;Langrange Interpolation&emsp;</h1>
              <label htmlFor='Size'>&emsp;Number of data :&emsp;</label>
              <input 
                name='Size'
                value = {getSize}
                onChange={event => setSize(event.target.value)}
                size='11'
              />
              <label htmlFor='Xi'>&emsp;Xi :&emsp;</label>
              <input 
                name='Xi'
                value = {getXi}
                onChange={event => setXi(event.target.value)}
                size='11'
              />
            </div>
            

            <p></p>
            <p>
            <div>
            &emsp;<button>Submit</button>
            </div>
            </p>
            <p id = 'matrix'></p>
            <p id = 'cal_button'></p>
            <p id = 'outputarray'></p>
            <h3><p id = 'final'></p></h3>
            <p id = 'printLterm'></p>
          </form>
          </div>
          </body>
    )
}

export default Langrange