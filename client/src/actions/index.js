// import { toggle_mode } from "./ColorMode"

export const toggleMode = () => {
    return (dispatch) => {
        dispatch({
            type: 'toggle_mode'
        })
    }
}

export const activePage = (active_page) => {
    return (dispatch) => {
        dispatch = ({
            type: 'active_page',
            payload: active_page
        })
    }
}