
import React from 'react'
import { useState } from 'react'

//refactor code from class component to functional component

const GuessElim = () => {
    var Size;
    var array=[];
    var temparray = [];
    var answerarray = [];
    var result = [];
    var ratio;

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
          var getvalue = parseFloat(document.getElementById('matrix_index_row'+row +'col'+(col+1)).value)
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
      GuessElimCalc();
      showoutput();

      array = [];//clear array for next inc array input
      answerarray= []; //clear answer
    }

    function GuessElimCalc()
    {
      console.log("guesselim")
      //forward elimination
      for(var s=0;s<=Size;s++)
      {
        for(var r=s+1;r<Size;r++)
        {
          ratio = array[r][s]/array[s][s];
          //console.log(""+array[r][s]+" "+array[s][s]) checking which array will use for ratio
          console.log(ratio)
          for(var k=0;k<=Size;k++)
          {
            array[r][k] = array[r][k]-(ratio*array[s][k])
          }
        }
      }
      console.log(array);

      answerarray[Size] = array[Size-1][Size]/array[Size-1][Size-1]

      //backward subsitution //this part just pain in ass wtf
      for(var a=Size-1;a>=1;a--)
      {
        //console.log(Size)
        answerarray[a] = array[a-1][Size]
        //console.log(answerarray)
        for(var b=a+1;b<=Size;b++)
        {
          
          //console.log(" "+a+" "+b)
          let tempvar = ((array[a-1][b-1])*(answerarray[b]))
          console.log("tempvar"+tempvar)
          answerarray[a] = answerarray[a]-(tempvar)
          //console.log(answerarray)
          //console.log(" "+answerarray[a]+" "+(array[a][b])+" "+(answerarray[b]))
        }
        answerarray[a] = answerarray[a]/array[a-1][a-1]
      }
      console.log(answerarray)
    }

    function showoutput()
    {
      var ans = ""//another array to store round-up value
      answerarray.forEach(arr => result.push(arr.toFixed(6)))
      console.log(result)
      for(var times=0;times<Size;times++)
      {
        ans += "a("+(times+1)+") = "+result[times]+"<br/>"
      }
      document.getElementById('final').innerHTML = ans

      array.splice(0,array.length)
      answerarray.splice(0,answerarray.length)
      result.splice(0,result.length)
    }

    return(<body>
        <div>
          <form onSubmit={getValue}>
            <div>
                <h1>&emsp;Guess Elimination&emsp;</h1>
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
            <h3><p id = 'final'></p></h3>
          </form>
          </div>
          </body>
    )
}


export default GuessElim