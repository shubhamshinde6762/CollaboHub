import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

const Calender = () => {
  return (
    <div className='w-full min-h-[80vh] transition-all duration-200 m-3 bg-[#fcf8ff] p-3 rounded-xl select-none'>
        <Calendar 
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        className='w-full font-lato font-bold transition-all duration-200'
        />
  </div>
  )
}

export default Calender