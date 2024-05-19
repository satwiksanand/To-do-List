function Button({ children, classNameProp, handleClick }) {
  return (
    <button className={classNameProp} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
