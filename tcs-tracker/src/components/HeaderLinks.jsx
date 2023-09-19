import React from 'react';
import { Link } from 'react-router-dom'

const HeaderLinks = ({ links, urlPathName }) => {
    return (
        <ul className="headerLinks">
            {links.map((link) => (
                <li key={link.name}>
                    <Link
                        to={link.url}
                        className={urlPathName.startsWith(link.url) ? 'activePage' : ''}
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default HeaderLinks;
