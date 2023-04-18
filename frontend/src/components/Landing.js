import React from 'react'
import MenuNav from '../components/MenuNav';
import Blobs from './Blobs';


const Landing = () => {
    return (
        <React.Fragment>
            <section className="content-container">
                <div className="textArea"> 
                    <MenuNav />    
                </div>
                <div>
                    <Blobs />
                </div>


            </section>
        </React.Fragment>
    )
}

export default Landing;