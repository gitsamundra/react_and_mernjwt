import React from 'react';

const Message = (props) => {
  const getStyle = (props) => {
    let baseClass = 'alert';
    if(props.message)
      baseClass = baseClass + 'alert-danger';
    else 
      baseClass = baseClass + 'alert-primary';
    return baseClass + ' text-center';
  };

  return (
    <div className={getStyle(props)} role='alert'>
      {props.message}
    </div>
  )
}

export default Message;
