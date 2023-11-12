
import React from 'react'
import { useState } from 'react'


//refactor code from class component to functional component

const LUDecomposition = () => {
    var Size;
    var array=[];
    var temparray = [];


    const [getSize, setSize] = useState('')

    var getValue = e => {//hale input event and pass value to function
        e.preventDefault();
        document.getElementById('matrix').innerHTML = ""//clear matrix each clicks
        Size = getSize
        
        console.log(Size)
        
        createMatrix(Size)
    }

    function createMatrix(Size)
    {
      for(var row=1;row<=Size;row++)
      {
        for(var col=0;col<=Size;col++)
        {
          document.getElementById('matrix').innerHTML += '<input type="text" id="matrix_index_row'+row +'col'+(col+1)+'" name="" placeholder="---" size=3>';
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
        for(var col=0;col<=Size;col++)
        {
          var getvalue = parseInt(document.getElementById('matrix_index_row'+row +'col'+(col+1)).value)
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
        for(var j = 0;j<Size;j++)
        {
            document.getElementById('outputarray').innerHTML += ""+array[i][j]+"a("+(j+1)+") "
        }
        document.getElementById('outputarray').innerHTML += " = " +array[i][Size]+" ] <br/>"
      }

      array = [];//clear array for next inc array input
    }


    return(<body>
        <div>
          <form onSubmit={getValue}>
            <div>
                <h1>&emsp;LU Decomposition&emsp;</h1>
              <label htmlFor='Size'>&emsp;Size :&emsp;</label>
              <input 
                name='Size'
                placeholder='Ex: 4 for 4x4' 
                value = {getSize}
                onChange={event => setSize(event.target.value)}
                size='8'
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
            <p id = 'final'></p>
          </form>
          </div>
          </body>
    )
}


export default LUDecomposition