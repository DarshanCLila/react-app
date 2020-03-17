import React from 'react';
import List from './components/list/list';
import AddUser from './components/add-user/AddUser';
import './app.css';
class App extends React.Component{
    render(){
        return(
            <div className="container">
                <AddUser />
                <List />
            </div>
        )
    }
}

export default App;