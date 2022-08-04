import React from "react";
import ReactHowler from 'react-howler'
import Player from "./Player";
import { MdOpenInNew } from "react-icons/md";

const Movie = (props) => {
  const onTrigger = () => {
    props.parentCallback([props.movie.display_name, props.movie.question_num])
    console.log(props.showGroup)
  }

  function convertTime(current_time) {
    let a = current_time.split(':');
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  }

  let dateFormatted = new Date(props.movie.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
  dateFormatted = String(dateFormatted);
  let timeFormatted = convertTime(String(props.movie.human_start_time));
  return (
    <div className = { `answer ${props.showGroup}-group-size` }>
      <div onClick={onTrigger} className = "title-display">
        <div className="open-icon"><MdOpenInNew/></div>
        <h2>{ props.movie.display_name }</h2>
        <h3>{ props.movie.question_num }</h3>
        <p>{ props.movie.human_start_time }</p>
        <p>Recorded { dateFormatted }</p>
      </div>
      <Player startTime = {timeFormatted} recording={`https://dharmaseed.org${props.movie.url}`} />

      {/*<p><audio controls><source src={`https://dharmaseed.org${props.movie.url}#t=0${props.movie.human_start_time}`} type="audio/mpeg" preload="none" /></audio></p>*/}
      {/*<p className={` ${props.showGroup} group-view`}>{ props.movie.content.substring(0, 350) }...</p>*/}
      <p className={` ${props.showGroup} individual-view white`}>{ props.movie.content }</p>
    </div>
  );
};

export default Movie;
