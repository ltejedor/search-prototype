import React from "react";

const Movie = (props) => {
  const onTrigger = () => {
    props.parentCallback([props.movie.display_name, props.movie.question_num])
    console.log(props.showGroup)
  }

  let dateFormatted = new Date(props.movie.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
  dateFormatted = String(dateFormatted);
  return (
    <div className = "movie">
      <h2 onClick={onTrigger}>{ props.movie.display_name }</h2>
      <h3>{ props.movie.question_num }</h3>
      <p>{ props.movie.human_start_time }</p>
      <p>Recorded { dateFormatted }</p>
      <p><audio controls><source src={`https://dharmaseed.org${props.movie.url}#t=0${props.movie.human_start_time}`} type="audio/mpeg" preload="none" /></audio></p>
      <p className={` ${props.showGroup} group-view`}>{ props.movie.content.substring(0, 350) }...</p>
      <p className={` ${props.showGroup} individual-view`}>{ props.movie.content }</p>
    </div>
  );
};

export default Movie;
