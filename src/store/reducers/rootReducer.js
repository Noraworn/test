import { combineReducers } from 'redux'
import nationalityReducer from './nationalityReducer'
import phoneReducer from './phoneReducer'
import titleReducer from './titleReducer'

const rootReducer = combineReducers({
    nation: nationalityReducer,
    phone: phoneReducer,
    title: titleReducer,
    gender: titleReducer
})

export default rootReducer