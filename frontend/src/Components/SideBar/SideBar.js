import React from 'react';
import './SideBar.css';
import NavBar from '../NavBar/NavBar';

function SideBar() {
    const currentPath = window.location.pathname; // Get the current path

    return (
        <div>
            <div className='nav_con'>
                <NavBar />
            </div>
            <div className='side_bar'>           
                <div className='side_bar_nav_item_con'>
                    <p
                        className={`side_bar_nav_item ${currentPath === '/allPost' ? 'side_bar_nav_item--active' : ''}`}
                        onClick={() => (window.location.href = '/allPost')}
                    >
                        BoostPost
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
