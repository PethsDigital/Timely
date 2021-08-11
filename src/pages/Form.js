import {useState, useContext} from "react";
import SetPlayer from "../components/SetPlayer";
import {TimeContext} from "../contexts/TimeContextWrap";
import SetTime from "../components/SetTime";
import {PlayerContext} from "../contexts/PlayerContextWrap";
import {useHistory} from "react-router-dom";
import {twoDigits} from "./Play";
function Form() {
  const history = useHistory();
  const {time, timeDispatch} = useContext(TimeContext);
  const {player1, player2, playerDispatch1, playerDispatch2} =
    useContext(PlayerContext);
  const [showNext, setShowNext] = useState(1);
  const [err, seterr] = useState(false);
  const handleFormSubmit = e => {
    e.preventDefault();
    let seconds =
      parseInt(time.hours) * 3600 +
      parseInt(time.minutes) * 60 +
      parseInt(time.seconds);
    if (seconds > 0) {
      timeDispatch({type: "updateTimeLimit", value: seconds});
      seterr(false);
      localStorage.setItem("timeLimit", seconds);
      localStorage.setItem("player1TimeLeft", seconds);
      localStorage.setItem("player2TimeLeft", seconds);
      localStorage.setItem("player1Name", player1.name);
      localStorage.setItem("player2Name", player2.name);

      playerDispatch1({type: "updateActive", value: true});
      playerDispatch2({type: "updateActive", value: true});
      playerDispatch1({
        type: "updateTimeLeft",
        value: `${twoDigits(time.hours)} : ${twoDigits(
          time.minutes
        )} : ${twoDigits(time.seconds)}`,
      });
      playerDispatch2({
        type: "updateTimeLeft",
        value: `${twoDigits(time.hours)} : ${twoDigits(
          time.minutes
        )} : ${twoDigits(time.seconds)}`,
      });
      history.push("play");
    } else {
      seterr(true);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} action="">
      {showNext === 1 && <SetPlayer showTime={() => setShowNext(2)} />}
      {showNext === 2 && <SetTime err={err} />}
    </form>
  );
}

export default Form;
