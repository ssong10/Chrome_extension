import React, { useState, useEffect } from "react";
import { timeFormat } from './util'

export default function Clock() {
  const [time,setTime] = useState(timeFormat(new Date()))
  const [colon,setColon] = useState('')
  useEffect(()=>{
    setInterval(()=>{
      setTime(timeFormat(new Date()))
    },1000)
  },[])
  useEffect(()=>{
    setTimeout(()=> {
      setColon(colon ? '' : 'hide')
    },1000)
  },[colon])
  return (
    <div className={`clock ${colon}`}>
      <span id="hour">{time.hours}</span>
      <span className="colon">:</span>
      <span id="minute">{time.minutes}</span>
      <span className="colon">:</span>
      <span id="seconds">{time.seconds}</span>
    </div>
  )
}