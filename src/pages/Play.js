import PlayerInfo from "../components/PlayerInfo";
import {useContext, useEffect, useState} from "react";
import {PlayerContext} from "../contexts/PlayerContextWrap";
import {TimeContext} from "../contexts/TimeContextWrap";
import {Link, useHistory} from "react-router-dom";

export const twoDigits = n => {
  return n <= 9 ? "0" + n : n;
};

const Play = () => {
  const {player2, player1, playerDispatch1, playerDispatch2} =
    useContext(PlayerContext);
  const {time} = useContext(TimeContext);
  const history = useHistory();

  useEffect(() => {
    if (
      localStorage.getItem("timeLimit") === 0 ||
      localStorage.getItem("timeLimit") === null
    ) {
      history.push("/");
      // console.log(time.timeLimit);
    }
  }, [history]);

  const [isPlayer1Active, setIsPlayer1Active] = useState(false);
  const [isPlayer2Active, setIsPlayer2Active] = useState(false);

  // player's timer setinterval id
  let player1TimeId;
  let player2TimeId;

  // load player's time
  const [player1TimeLeft, setPlayer1TimeLeft] = useState(
    localStorage.getItem("player1TimeLeft")
      ? localStorage.getItem("player1TimeLeft")
      : time.timeLimit
  );
  const [player2TimeLeft, setPlayer2TimeLeft] = useState(
    localStorage.getItem("player2TimeLeft")
      ? localStorage.getItem("player2TimeLeft")
      : time.timeLimit
  );

  // run timer when player is active
  useEffect(() => {
    if (isPlayer1Active && player1TimeLeft > 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      player1TimeId = setInterval(
        () => startCountDown(player1TimeId, "player1"),
        1000
      );
    }
    return () => {
      clearInterval(player1TimeId);
    };
  }, [isPlayer1Active]);

  useEffect(() => {
    if (isPlayer2Active && player2TimeLeft > 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      player2TimeId = setInterval(
        () => startCountDown(player2TimeId, "player2"),
        1000
      );
    }
    return () => {
      clearInterval(player2TimeId);
    };
  }, [isPlayer2Active]);

  // update ui with timer values
  useEffect(() => {
    convertSecToTime(player2TimeLeft, playerDispatch2);
    localStorage.setItem("player2TimeLeft", player2TimeLeft);
  }, [player2TimeLeft, playerDispatch2]);

  useEffect(() => {
    convertSecToTime(player1TimeLeft, playerDispatch1);
    localStorage.setItem("player1TimeLeft", player1TimeLeft);
  }, [player1TimeLeft, playerDispatch1]);

  // convert player's time in seconds to hr:min:sec
  const convertSecToTime = (sec, callback) => {
    // convert time in seconds to hr:min:sec
    var seconds = sec % 60;
    var secondsInMinutes = (sec - seconds) / 60;
    var minutes = secondsInMinutes % 60;
    var hours = (secondsInMinutes - minutes) / 60;

    // compile time in format hr:min:sec
    let timer =
      twoDigits(hours) + ":" + twoDigits(minutes) + ":" + twoDigits(seconds);

    // update state callback
    callback({type: "updateTimeLeft", value: timer});
  };

  const startCountDown = (timerId, player) => {
    if (player === "player1") {
      setPlayer1TimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsPlayer1Active(false);
          // if (player2TimeLeft > 0) setIsPlayer2Active(false);
        }
        return prev - 1;
      });
      convertSecToTime(player1TimeLeft, playerDispatch1);
    } else if (player === "player2") {
      setPlayer2TimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsPlayer2Active(false);
          // if (player1TimeLeft > 0) setIsPlayer1Active(false);
        }
        return prev - 1;
      });
    }
    playerDispatch2({type: "updateActive", value: isPlayer2Active});
    playerDispatch1({type: "updateActive", value: isPlayer1Active});
  };

  return (
    <div>
      <div className="btn-wrap ">
        <Link to="/" className="btn">
          Back
        </Link>
        <button
          onClick={() => {
            setIsPlayer2Active(false);
            setIsPlayer1Active(false);
            playerDispatch2({type: "updateActive", value: true});
            playerDispatch1({type: "updateActive", value: true});
          }}
          className="btn btn-grey"
        >
          Pause All
        </button>
      </div>
      <div className="split">
        <div className="left">
          <PlayerInfo
            player={player1}
            startCountDown={() => {
              setIsPlayer2Active(false);
              setIsPlayer1Active(true);
            }}
            pauseCountDown={() => {
              setIsPlayer1Active(false);
              setIsPlayer2Active(true);
            }}
          />
        </div>
        <div className="right">
          <PlayerInfo
            player={player2}
            startCountDown={() => {
              setIsPlayer1Active(false);
              setIsPlayer2Active(true);
            }}
            pauseCountDown={() => {
              setIsPlayer2Active(false);
              setIsPlayer1Active(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Play;
