import { Outlet, Navigate } from 'react-router-dom'

const Routes = () => {
    let auth = {'token':false}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default Routes