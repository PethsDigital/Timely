import {createContext, useReducer} from "react";

export const PlayerContext = createContext();

const player1State = {
  name: localStorage.getItem("player1Name")
    ? localStorage.getItem("player1Name")
    : "Player 1",
  timeLeft: "00:00:00",
  active: true,
};
const player2State = {
  name: localStorage.getItem("player2Name")
    ? localStorage.getItem("player2Name")
    : "Player 2",
  timeLeft: "00:00:00",
  active: true,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "updateName":
      return {...state, name: action.value};
    case "updateActive":
      return {...state, active: action.value};
    case "updateTimeLeft":
      return {...state, timeLeft: action.value};
    default:
      return state;
  }
};

const Player = ({children}) => {
  const [player1, playerDispatch1] = useReducer(reducer, player1State);
  const [player2, playerDispatch2] = useReducer(reducer, player2State);

  return (
    <PlayerContext.Provider
      value={{player2, player1, playerDispatch1, playerDispatch2}}
    >
      {children && children}
    </PlayerContext.Provider>
  );
};

export default Player;
