import React from 'react'
import { useState } from 'react'

//refactor code from class component to functional component

const GuessSeidel = () => {
    var Size,ErrorApox;
    var array=[];
    var temparray = [];
    var XArray = [];
    var XoldArray= [];
    var XError = []
    var iteration = 0;

    const [getSize, setSize] = useState('')
    const [getError, setError] = useState('')

    var getValue = e => {//hale input event and pass value to function
        e.preventDefault();
        document.getElementById('matrix').innerHTML = ""//clear matrix each clicks
        Size = getSize
        ErrorApox  = getError;
        
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

      //set all Xarrayvalue to 0 as default
      for(var asd=0;asd<Size;asd++)
      {
        XoldArray[asd]=0;
      }
      console.log(XArray)
      SeidelCalc();
      showoutput();

      array = [];//clear array for next inc array input
      XArray= []; //clear answer
      XError = [];
      XoldArray=[];
      iteration=0;
    }

    const islessthanError = (err) =>err>ErrorApox
    //if less than 0.000001 return true

    function SeidelCalc()
    {
      console.log("JacobiCalc")
      console.log(array)
      //Jacobi function
      do{
      for(var i=0;i<Size;i++)
      {
        var ss = 0;
        for(var j=0;j<Size;j++)
        {
          //find sumof diff
          if(j!==i)
          {
            ss+=array[i][j]*XoldArray[j]
          }
          //console.log("ss = "+ss);
        }
        //replace answer for each iteration with oldanswer
        XArray[i] = ((array[i][Size])-ss)/array[i][i];
        XError[i] = Math.abs((XArray[i]-XoldArray[i])/XArray[0])*100;
        XoldArray[i] = XArray[i]
        /*console.log(XArray[i])
        console.log(XArray);
        console.log("i = "+i)*/
        /*console.log(array[i][Size])
        console.log("-ss = "+ss)
        console.log(array[i][i])*/
      }
      console.log("Xarray"+XArray)
      

      iteration++;
      /*console.log("XoldArray"+XoldArray)
      console.log("XError"+XError)*/
      }while(XError.every(islessthanError))
    }


    function showoutput()
    {
      var ans = ""
      var proof = "Proof => "
      var proof_result = 0;
      //console.log(XArray)
      ans+= "****STOPPED AT ITERATION #"+iteration+"****<br/>"
      for(var times=0;times<Size;times++)
      {
        ans += "a("+(times+1)+") = "+(XArray[times].toFixed(6))+"<br/>"
        proof += "  "+array[0][times]+"("+(XArray[times].toFixed(6))+") "
      }
      for(var times2=0;times2<Size;times2++)
      {     
        proof_result += (array[0][times2]*XArray[times2]);
      }
      proof += " = "+(proof_result.toFixed(6));
      document.getElementById('final').innerHTML = ans
      document.getElementById('proofresult').innerHTML = proof
      console.log(proof);
      //set all array to null  for get next inc value
      XArray.splice(0,XArray.length)
      XoldArray.splice(0,XoldArray.length)
      XError.splice(0,XError.length)

    }

    return(<body>
        <div>
          <form onSubmit={getValue}>
            <div>
                <h1>&emsp;Guess-Seidel Iteration&emsp;</h1>
              <label htmlFor='Size'>&emsp;Size :&emsp;</label>
              <input 
                name='Size'
                placeholder='Ex: 4 for 4x4' 
                value = {getSize}
                onChange={event => setSize(event.target.value)}
                size='8'
              />
              <label htmlFor='Error_Apoximate'>&emsp;Error_Apoximate :&emsp;</label>
              <input 
                name='Error_Apoximate'
                placeholder='Error' 
                value = {getError}
                onChange={event => setError(event.target.value)}
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
            <p id = 'proofresult'></p>
          </form>
          </div>
          </body>
    )
}


export default GuessSeidel