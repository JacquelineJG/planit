
import React, { useState, setState } from "react";
import { render} from 'react-dom';
import axios from 'axios'; 
import TimeRangeSlider from 'react-time-range-slider';

   
export default function AddToPlan (props) {

  const [isFavorite, setIsFavorite] = useState(false); 

  const [state, setState] = useState({
      value : {
        start: "00:00",
        end: "23:59"
      }
  });


  const changeStartHandler = (time) => {
    console.log("Start Handler Called", time);
  }

  const timeChangeHandler = (time) => {
    console.log(time)
    setState({...state, value: time});
  }

  const changeCompleteHandler = (time) => {
    console.log("Complete Handler Called", time);
  }


  // const toggleFavourites = function () {
  //    //call api with axios to save favorite 
  //    //.then 
  //   setIsFavorite(!isFavorite)
  // }
   
  // const favoriteClass = isFavorite? "far fa-heart" : "fas fa-heart"
 
  
 
  let photoURLDetail = ''
  if (props.photos){
    photoURLDetail = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.photos[0].photo_reference}&key=AIzaSyARFnA9kzyqcgZmiBHLbc5COInWZlmtcac`
  } 
  
  return (
    <div>
      <h1>{props.name}</h1>
      <form id= "add-app">
        <label>Date </label>
        <label>Time</label>
        <div>
            <TimeRangeSlider
                disabled={false}
                format={24}
                maxValue={"23:59"}
                minValue={"00:00"}
                name={"time_range"}
                onChangeStart={time => changeStartHandler(time)}
                onChangeComplete={time => changeCompleteHandler(time)}
                onChange={time => timeChangeHandler(time)}
                step={15}
                value={state.value}/>
        </div>
       
        
      </form>
    </div>

  )
}