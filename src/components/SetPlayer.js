import Input from "./Input";
import {PlayerContext} from "../contexts/PlayerContextWrap";
import {useContext} from "react";

const SetPlayer = ({showTime}) => {
  const {player2, player1, playerDispatch1, playerDispatch2} =
    useContext(PlayerContext);

  return (
    <div>
      <h3>
        Hi there! Welcome to timely, kindly fill in your details to get started
      </h3>
      <br />
      <br />
      <div className="split">
        <div className="left">
          <div className="top">
            <img
              src={`https://ui-avatars.com/api/?name=${player1.name
                .split(" ")
                .join("+")}&background=222&color=fff`}
              alt={"avatar"}
            />
            <h3>{player1.name}</h3>
          </div>
          <Input
            placeholder="Enter Name"
            value={player1.name}
            id="player1Name"
            name="name"
            type="text"
            inputHandler={e =>
              playerDispatch1({type: "updateName", value: e.target.value})
            }
          />
        </div>

        <div className="right">
          <div className="top">
            <img
              src={`https://ui-avatars.com/api/?name=${player2.name
                .split(" ")
                .join("+")}&background=222&color=fff`}
              alt={"avatar"}
            />
            <h3>{player2.name}</h3>
          </div>
          <Input
            placeholder="Enter Name"
            value={player2.name}
            name="name"
            id="player2Name"
            type="text"
            inputHandler={e =>
              playerDispatch2({type: "updateName", value: e.target.value})
            }
          />
        </div>
      </div>
      <button type="button" onClick={showTime} className="btn">
        Next
      </button>
    </div>
  );
};

export default SetPlayer;
