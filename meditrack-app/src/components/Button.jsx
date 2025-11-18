// src/components/Button.jsx
import React from "react";

function Button({ children, variant = "primary", ...rest }) {
  const className = ["btn", `btn-${variant}`, rest.className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;
