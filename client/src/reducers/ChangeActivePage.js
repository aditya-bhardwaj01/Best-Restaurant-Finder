const initialState = 'landingpage'

const ChangeActivePage = (state = initialState, action) => {
    switch(action.type){
        case 'active_page': return action.payload
        default: return state
    }
}

export default ChangeActivePage
