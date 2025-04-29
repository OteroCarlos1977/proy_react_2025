import React from "react";


function Button({ texto, style, onClick, Icono, tooltip }) {
    return (
        <button 
            style={style} 
            onClick={onClick} 
            title={tooltip}
        >
            {Icono && <Icono style={{ marginRight: "8px" }} />}
            {texto}
        </button>
    );
}

export default Button;

