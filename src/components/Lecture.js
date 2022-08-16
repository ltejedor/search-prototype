import React from "react";
import ReactHowler from 'react-howler'
import Player from "./Player";
import { MdOpenInNew } from "react-icons/md";

const Lecture = (props) => {

  const onTrigger = () => {
    props.parentCallback([props.lecture.display_question])
    console.log(props.showGroup)
  }

  function removeName(str) {
    const indexOfSpace = str.indexOf(' ');
    if (indexOfSpace === -1) {
      return '';
    }

    return str.substring(indexOfSpace + 1);
  }

  const listItems = props.lecture.content.map((content, index) =>
    <li key={index}><span className="speaker">{content.replace(/ .*/,'')}</span> <span className="content">{removeName(content)}</span></li>
  );

  function convertTime(current_time) {
    let a = current_time.split(':');
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  }

  let dateFormatted = new Date(props.lecture.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
  dateFormatted = String(dateFormatted);
  let timeFormatted = convertTime(String(props.lecture.start_time));
  let display_name = String(props.lecture.display_name);
  display_name = display_name.split("$")[0];

  return (
    <div className = { `answer ${props.showGroup}-group-size` }>
      <div onClick={onTrigger} className = "title-display">
        <div className="open-icon"><MdOpenInNew/></div>
        <h2>{ props.lecture.display_question }</h2>
        <p>From { display_name }</p>
        <p>Recorded { dateFormatted }</p>
        <p>Question starts at { props.lecture.start_time }</p>
      </div>
      <Player startTime = {timeFormatted} recording={`https://dharmaseed.org${props.lecture.url}`} />

      {/*<p><audio controls><source src={`https://dharmaseed.org${props.lecture.url}#t=0${props.lecture.human_start_time}`} type="audio/mpeg" preload="none" /></audio></p>*/}
      {/*<p className={` ${props.showGroup} group-view`}>{ props.lecture.content.substring(0, 350) }...</p>*/}

      <ul className={` ${props.showGroup} individual-view lecture-content`}>{listItems}</ul>

    </div>
  );
};

export default Lecture;
