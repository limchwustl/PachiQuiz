import React from "react";
import '../style/App.css'
const Checkbox = ({ label, value, onChange, name}) => {
    return (
      <label className="checkbox">
        <input key={Math.random()} type="checkbox" checked={value} onChange={onChange} name={name}/>
        {label}
      </label>
    );
  };

export default Checkbox