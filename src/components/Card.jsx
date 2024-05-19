//!before implementing the value of edit modal, we will store the list in localstorage and manipulate the contents of the list.
import PropTypes from "prop-types";

function Card({ item, color, handleDeleteToDoItem, handleChangeEditItem }) {
  //? here we will use the todolist context to control the opening of the edit model and also the functionality of deleting a todolist component.
  //! let's implement the functionality of deleting the cardItems.
  console.log(item);

  return (
    <div className="cardItem" style={{ borderTop: `4px solid ${color}` }}>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      <div>
        <button
          className="far fa-edit m-3"
          style={{ color: `${color}` }}
          onClick={() => handleChangeEditItem(item)}
        ></button>
        <button
          className="fas fa-trash-alt"
          style={{ color: `${color}` }}
          onClick={() => handleDeleteToDoItem(item.id)}
        ></button>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.object,
  color: PropTypes.string,
  handleDeleteToDoItem: PropTypes.func,
  handleChangeEditItem: PropTypes.func,
};

export default Card;
