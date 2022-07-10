import React from "react";

const Movie = ({ movie }) => {
  let dateFormatted = new Date(movie.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
  dateFormatted = String(dateFormatted);
  return (
    <div className = "movie">
      <h2>{ movie.display_name }</h2>
      <h3>{ movie.question_num }</h3>
      <p>{ movie.human_start_time }</p>
      <p>Recorded { dateFormatted }</p>
      <p><audio controls><source src={`https://dharmaseed.org${movie.url}#t=0${movie.human_start_time}`} type="audio/mpeg" /></audio></p>
    </div>
  );
};

export default Movie;
