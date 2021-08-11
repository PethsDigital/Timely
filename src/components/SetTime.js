import {useContext} from "react";
import {TimeContext} from "../contexts/TimeContextWrap";
import Input from "./Input";

const SetTime = () => {
  const {time, timeDispatch} = useContext(TimeContext);
  return (
    <div className="setTime">
      <h3>Fill in a time limit in the format 00:00:00</h3>
      <br />
      <div className="otp-input-wrap">
        <Input
          label="Hr"
          placeholder="00"
          type="number"
          name="hours"
          inputClass="otp-input"
          value={time.hours}
          inputHandler={e =>
            timeDispatch({
              type: "updateTimeInput",
              value: e.target.value,
              name: e.target.name,
            })
          }
          maxLength="2"
        />
        <h1>:</h1>
        <Input
          label="Min"
          placeholder="00"
          type="number"
          name="minutes"
          inputClass="otp-input"
          inputHandler={e =>
            timeDispatch({
              type: "updateTimeInput",
              value: e.target.value,
              name: e.target.name,
            })
          }
          value={time.minutes}
          maxLength="2"
        />
        <h1>:</h1>
        <Input
          label="Sec"
          placeholder="00"
          type="number"
          inputClass="otp-input"
          inputHandler={e =>
            timeDispatch({
              type: "updateTimeInput",
              value: e.target.value,
              name: e.target.name,
            })
          }
          value={time.seconds}
          name="seconds"
          maxLength="2"
        />
      </div>
      <button type="submit" className="btn">
        Start
      </button>
    </div>
  );
};

export default SetTime;
