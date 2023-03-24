// import { toggle_mode } from "../actions/ColorMode"
const initialState = 1

const ColorModeReducer = (state = initialState, action) => {
    switch(action.type){
        case 'toggle_mode': return state === 1 ? 0:1
        default: return state
    }
}

export default ColorModeReducer;