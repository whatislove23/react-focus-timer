import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../database/initDb";

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return action.newTodo;
    case "REMOVE_TODO":
      let res = state.filter((todoItem) => todoItem.id !== action.id);
      updateDoc(doc(db, "users", action.uid), {
        todos: res,
      });
      return res;
    case "UPDATE_TODO":
      return state.map((item, isActive) => {
        if (item.id === action.id) {
          item.isActive = action.isActive;
          return item;
        }
        if (item.isActive === "Complited") return item;
        if (item.isActive === "Active") {
          item.isActive = "Waiting";
          return item;
        }
        return item;
      });
    default:
      return state;
  }
};
export default todos;
