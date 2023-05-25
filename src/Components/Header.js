import React, { useEffect } from 'react';
import './Header.css';

export const Header = () => {
  useEffect(() => {
    const menu = document.querySelector('#menu-icon');
    const navlist = document.querySelector('.navlist');

    const handleMenuClick = () => {
      menu.classList.toggle('bx-x');
      navlist.classList.toggle('open');
    };

    menu.addEventListener('click', handleMenuClick);

    return () => {
      menu.removeEventListener('click', handleMenuClick);
    };
  }, []);

  return (
    <div className="header">
      <a href="/" className="logo">
        QR Scan
      </a>
      <ul className="navlist">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="https://www.tebestudio.com">About</a>
        </li>
        <li>
          <a href="https://www.tebestudio.com">Contact</a>
        </li>
      </ul>
      <img src="\icons8-menu-50.png" className="bx bx-menu" id="menu-icon" alt="Menu Icon" />
    </div>
  );
};
