
import { 
    BrowserRouter as Router, 
    Routes,
    Route
} from 'react-router-dom';
import { routes } from './Routes';
 
const Navigator = () => {

    return (
        <Router>
            <Routes>
                <Route>
                    {/* <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    <Route path="/" element={<Home />}/> */}
                    {
                        routes.map((route, index) => {
                            return (
                                <Route key={index+Math.random()} path={route.path} element={<route.component />}/>
                            )
                        })
                    }
                </Route>
            </Routes>
        </Router>
    )
}

export default Navigator;