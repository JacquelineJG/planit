import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  
    //state declared here
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });
    
    const setDay = day => setState({ ...state, day });

    useEffect(() => {
      Promise.all([
        axios.get('http://localhost:3002/api/users'),
        axios.get('http://localhost:3002/api/appointments'),
        axios.get('http://localhost:3002/api/interviewers')
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  
    }, []);
  
    const updateSpots = (day, days, appointments) => {
      let spots = 0; 
      const dayObj = days.find((d) => d.name === day); 
      for (const appointmentId of dayObj.appointments) {
        const appointment = appointments[appointmentId]
         if (!appointment.interview) {
          spots++
        }
      }
      dayObj.spots = spots  
      return days;
    }
  
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios.put(`/api/users/${id}`, {interview})
        .then (()=> {
          const days = updateSpots(state.day, state.days, appointments);
          setState({...state, appointments, days});
        });
    }
  
     
    function cancelInterview (id) {
      const appointments = state.appointments;
      const appointment = appointments[id];
      return axios.delete(`/api/appointments/${id}`)
        .then(()=> {
          appointment.interview = null; 
          const days = updateSpots(state.day, state.days, appointments);
          setState({...state, appointments, days});
        });
    }
  
    return { state, setDay, cancelInterview, bookInterview };
  }