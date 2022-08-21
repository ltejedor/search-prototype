import React from "react";
import ReactHowler from 'react-howler'
import Player from "./Player";
import { MdOpenInNew } from "react-icons/md";
import { browserName, browserVersion } from "react-device-detect";

const Lecture = (props) => {

  const onTriggerMain = () => {
    props.parentCallback([props.lecture.display_question]);
    window.scrollTo(0, 0);
  }

  function onTriggerNeighbor(title) {
    props.parentCallback(title);
    window.scrollTo(0, 0);
  }

  function removeName(str) {
    const indexOfSpace = str.indexOf(' ');
    if (indexOfSpace === -1) {
      return '';
    }

    return str.substring(indexOfSpace + 1);
  }

  const listItems = props.lecture.content.map((content, index) =>
    <li key={index}><span className={`speaker ${content.split(":")[0]}`}>{content.replace(/ .*/,'')}</span> <span className="content">{removeName(content)}</span></li>
  );

  function convertTime(current_time) {
    let a = current_time.split(':');
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  }

  //console.log(`${browserName} ${browserVersion}`);
  //Safari
  //Chrome
  //Firefox

  //example 1 - How do I work with fear?, self knowing 3
  //Chrome: 1:34:53
  //Firefox 1:35:19

  //Dana, The Flowering Of Generosity firefox and chrome are synced ;_;

  let dateFormatted = new Date(props.lecture.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
  dateFormatted = String(dateFormatted);
  let timeFormatted = convertTime(String(props.lecture.start_time));
  let display_name = String(props.lecture.display_name);
  display_name = display_name.split("$")[0];
  let neighbors = props.lecture.neighbors;
  return (
    <div className = { `answer ${props.showGroup}-group-size` }>
      <div className="answer-container">
        <div onClick={onTriggerMain} className = "title-display">
          <h2>{ props.lecture.display_question }</h2>
          <p className="bold">Lecture: { display_name }</p>
          <p>{ dateFormatted }</p>
          <p>Question plays from { props.lecture.start_time } to { props.lecture.end_time }</p>
        </div>

        <Player startTime = {timeFormatted} recording={`https://dharmaseed.org${props.lecture.url}`} />
        <ul className={` ${props.showGroup} individual-view lecture-content`}>{listItems}</ul>
      </div>

      {(!props.showGroup) ?
        <div className="neighbors-container">
          <h3>Similar Questions</h3>
          <ul>
            {neighbors.map(d => (<li className="neighbor" onClick={() => onTriggerNeighbor([d])} key={d}>{d}</li>))}
          </ul>
        </div>
          :
        <span></span>
      }
    </div>
  );
};

export default Lecture;
