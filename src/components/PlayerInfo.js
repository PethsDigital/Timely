const PlayerInfo = ({player, startCountDown, pauseCountDown, btnText}) => {
  return (
    <div className={`playerInfo ${player.active ? "active" : "disabled"}`}>
      <div className="top">
        <img
          src={`https://ui-avatars.com/api/?name=${player.name
            .split(" ")
            .join("+")}&background=222&color=fff`}
          alt={"avatar"}
        />
        <h3>{player.name}</h3>
      </div>
      <h4>Time Remaining:</h4>
      <h1 className="time">{player.timeLeft}</h1>
      <div className="btn-wrap">
        <button
          style={{background: `${btnText === "Play" ? "#222" : "#f44336"}`}}
          onClick={startCountDown}
          className="btn"
        >
          {btnText}
        </button>
        {/* <button onClick={pauseCountDown} className="btn btn-danger">
          Pause
        </button> */}
      </div>
    </div>
  );
};

export default PlayerInfo;
