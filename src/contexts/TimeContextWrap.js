import {createContext, useReducer} from "react";

export const TimeContext = createContext();

const initialState = {
  hours: "",
  minutes: "",
  seconds: "",
  timeLimit:
    localStorage.getItem("timeLimit") > 0
      ? localStorage.getItem("timeLimit")
      : 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateTimeInput":
      if (action.value.length <= 2 && action.value >= 0 && action.value < 60)
        return {...state, [action.name]: action.value};
      else return state;
    case "updateTimeLimit":
      return {...state, timeLimit: action.value};
    default:
      return state;
  }
};

const TimeContextWrap = ({children}) => {
  const [time, timeDispatch] = useReducer(reducer, initialState);
  return (
    <TimeContext.Provider value={{time, timeDispatch}}>
      {children}
    </TimeContext.Provider>
  );
};

export default TimeContextWrap;
