import './Main.css'
import './Header.css'
import React from 'react'
import Header from './Header'

export default props => <React.Fragment>
        <main className='content container-fluid'>
            <div >
             {props.children}
            </div>
        </main>
        <Header {...props}/>
</React.Fragment>