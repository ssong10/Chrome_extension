import React, { useState, useEffect } from "react";
import { timeFormat } from './util'

export default function Clock() {
  const [time,setTime] = useState(timeFormat(new Date()))
  useEffect(()=>{
    setInterval(()=>{
      setTime(timeFormat(new Date()))
    },1000)
  },[])
  return (
    <div className="clock">
      <span id="hour">{time.hours}</span>
      <span className="colon">:</span>
      <span id="minute">{time.minutes}</span>
      <span className="colon">:</span>
      <span id="seconds">{time.seconds}</span>
    </div>
  )
}