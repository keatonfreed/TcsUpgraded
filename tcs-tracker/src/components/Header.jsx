import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import './Header.css'

import HeaderItem from './HeaderItem';
import HeaderLinks from './HeaderLinks';
import MenuIcon from './MenuIcon';

function Header({ darkMode, toggleMode }) {
    let urlLocation = useLocation()
    let urlPathName = urlLocation.pathname

    let headerLinks = [{ name: "Dashboard", url: "/dashboard" }, { name: "Students", url: "/students" }]

    // const screenSizeMain = useMediaQuery({ query: '(min-width: 606px)' })
    const screenSizeMobile = useMediaQuery({ query: '(max-width: 605px)' })

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="Header">
            <HeaderItem>
                <h1 id="logo">TCS Tracker</h1>
            </HeaderItem>

            {/* Show header items based on screen size */}
            {screenSizeMobile ? (
                <>
                    <HeaderItem>
                        <MenuIcon onClick={handleDropdownToggle} />
                    </HeaderItem>
                    {isDropdownOpen && (
                        <div className="dropdownMenu">
                            <HeaderItem>
                                <HeaderLinks links={headerLinks} urlPathName={urlPathName} />
                            </HeaderItem>
                            <HeaderItem>
                                <button className="themeButton" onClick={toggleMode}><img src="/themeIcon.svg" alt={darkMode ? 'light' : 'dark'} className=" svgTheme"></img></button>
                                <p id="profile">Keaton Freed</p>
                            </HeaderItem>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <HeaderItem>
                        <HeaderLinks links={headerLinks} urlPathName={urlPathName} />
                    </HeaderItem>
                    <HeaderItem>
                        <button className="themeButton" onClick={toggleMode}><img src="/themeIcon.svg" alt={darkMode ? 'light' : 'dark'} className="svgTheme"></img></button>
                        <p id="profile">Keaton Freed</p>
                    </HeaderItem>
                </>
            )}
        </header>
    )
}

export default Header