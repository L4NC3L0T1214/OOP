import React from "react";
import MLR from "ml-regression-multivariate-linear" ;

function RegressionMulti(){
    function getPointInput() {
        var numPoint = document.getElementById("numOfPoint").value ;
        var numData = document.getElementById("numOfData").value ;
        var indexPoint = "" ;
        var indexPointSTR = "" ;
        var inputPointSTR = "" ;
        var inputPredict = "" ;

        for(var i = 1; i <= numPoint; i++) {
            inputPredict += "X"+i+" : <input id='predictPoint"+i+"' type='number' style='width: 80px'> </input>"
            if(i != numPoint) {
                indexPoint = "X"+i ;
                indexPointSTR += "<label>"+indexPoint+"</label>" ;
            }
            else {
                indexPoint = "X"+i ;
                indexPointSTR += "<label>"+indexPoint+"</label>" ;
                indexPoint = "Y" ;
                indexPointSTR += "<label>"+indexPoint+"</label>" ;
            }     
        }

        for(i =  0; i<numData ; i++){
            for(var j = 0 ; j<=numPoint ; j++){
                if(i == 0 && j == 0) {
                    inputPointSTR +="<label>"+indexPointSTR+"</label><br><input id = 'Xpoint"+i+j+"' className = 'inputmat' type='number' style='width: 80px'></input>"
                }
                else if(j != numPoint)
                    inputPointSTR +=" <input id = 'Xpoint"+i+j+"' className = 'inputX' type='number' style='width: 80px'></input>"
                else
                    inputPointSTR +=" | <input id = 'Ypoint"+i+j+"' className = 'inputY' type='number' style='width: 80px'></input><br>"
            }
        }
        document.getElementById("point").innerHTML = inputPointSTR ;
        document.getElementById("predictPoint").innerHTML = inputPredict ;
    }

    function getValue() {
        var numPoint = document.getElementById("numOfPoint").value ;
        var numData = document.getElementById("numOfData").value ;
        var MatX = [];
        var MatY = [] ;
        var MatPredict = [] ;

        for(var i = 0 ; i<numData ; i++){
            MatX.push([]);
            MatY.push([]) ;
            for(var j = 0 ; j<=numPoint ; j++){
                if(j != numPoint) {
                    MatX[i].push(parseFloat(document.getElementById("Xpoint"+i+j).value)) ;
                }
                else {   
                    MatY[i].push(parseFloat((document.getElementById("Ypoint"+i+j).value))) ;
                }
            }
        }

        for(i = 1; i <= numPoint; i++) {
            MatPredict.push(parseFloat(document.getElementById("predictPoint"+i).value)) ;
        }

        const mlr = new MLR(MatX, MatY) ;
        var ans = mlr.predict(MatPredict) ;
        var answer = "Answer : "+ans[0].toFixed(4) ;

        document.getElementById("showAnser").innerHTML = answer ;
    }
    
    return (
        <div className="contain" style={{paddingTop:'50px',textAlign:'center'}}>
            <div><h1 style={{color:'#000'}}>Muliple Linear Regression</h1></div>
            <div style={{paddingTop:'50px'}}>
                <h4 style={{color:'#000',paddingRight:'10px'}}>Number of Point : 
                    <input id='numOfPoint' type='number' onChange={getPointInput}></input>
                </h4>
                 <br></br>
                <h4 style={{color:'#000',paddingRight:'10px'}}>Number of Data : 
                    <input id='numOfData' type='number' onChange={getPointInput}></input>
                </h4>
                <div>
                    <label id='point' style={{color:'#000',paddingTop:'50px'}}></label><br></br>
                    <div id='predictPoint' style={{width:'800px',color:'#000',paddingTop:'50px',paddingLeft:'400px',overflow:'auto'}}></div><br></br>
                    <button style={{color:'#fff'}} onClick={getValue}>Calculate</button>
                </div>
                <div id='showAnser' style={{color:'#000', paddingTop:'50px'}}>

                </div>
            </div>   
        </div>
    )
}


export default RegressionMulti