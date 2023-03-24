import ColorModeReducer from "./ColorModeReducer";
import ChangeActivePage from "./ChangeActivePage";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    ColorModeReducer,
    ChangeActivePage
})

export default rootReducer