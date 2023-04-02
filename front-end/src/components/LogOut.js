import * as React from 'react';

const LogOut = () => {
  const [isOpen, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={handleClick}>Log Out Button</Button>

      {isOpen && <div>Content here</div>}
    </div>
  );
};

const LogOutButton = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

const Button = ({ type = 'button', onClick, children, ...rest }) => {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default LogOut;