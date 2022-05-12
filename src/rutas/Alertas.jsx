import React from "react";

const Alertas = ({ msg }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {msg}
    </div>
  );
};

export default Alertas;
