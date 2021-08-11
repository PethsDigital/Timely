import {useState} from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Input = ({
  type,
  label,
  id,
  name,
  placeholder,
  inputHandler,
  value,
  children,
  classy,
  isDisabled,
  inputClass,
  maxLength,
}) => {
  const [isTypePassword, setisTypePassword] = useState(true);
  return (
    <div className={classy ? "form-group pass" : "form-group"}>
      {label && <label htmlFor={id}>{label}</label>}
      {type === "password" ? (
        <div className="input-icon-wrap">
          <input
            className={inputClass}
            disabled={isDisabled}
            type={isTypePassword ? "password" : "text"}
            id={id}
            name={name}
            value={value}
            onChange={e => inputHandler(e)}
            placeholder={placeholder}
            required
          />
          <button
            disabled={isDisabled}
            onClick={() => setisTypePassword(prev => !prev)}
            type="button"
            className="icon"
          >
            {isTypePassword && <span>Yo</span>}
            {/* {isTypePassword===true?<FontAwesomeIcon icon={faEye}/>:<FontAwesomeIcon icon={faEyeSlash}/>} */}
          </button>
        </div>
      ) : (
        <input
          className={inputClass}
          disabled={isDisabled}
          type={type}
          name={name}
          value={value}
          maxLength={maxLength}
          onChange={e => inputHandler(e)}
          id={id}
          placeholder={placeholder}
          required
        />
      )}
      {children}
    </div>
  );
};

export default Input;
