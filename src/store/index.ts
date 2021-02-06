import { combineReducers, createStore } from "redux";
import reducerPosts from "./ducks/Posts/reducer";
import reducerUser from "./ducks/User/reducer";

const createRootReducer = () => combineReducers({
    user: reducerUser,
    posts: reducerPosts,
})

const store = createStore(createRootReducer())

export { store }