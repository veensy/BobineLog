import React  from 'react';

const Saisie = ({label, name, value, handleChange, isRequired})=>{
    return (
        <div className="form-group">
                <label className="control-label">{label}</label>
                <input
                    className="form-control"
                    type="text"
                    name={name}
                    onChange={handleChange}
                    value={value}
                    id={name}
                    required={isRequired}
                />
            </div>
    )
}
export default Saisie;
