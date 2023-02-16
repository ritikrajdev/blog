import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className='body-padding'>
      {/* Nav Heading */}
      <div>
        <h1>The Aritifact</h1>
        <p>
          <em>Culture & Art blog</em>
        </p>
      </div>

      {/* Nav Links */}
      <ul>
        <li>
          <a href='#'>Blog</a>
        </li>
        <li>
          <a href='#'>About</a>
        </li>
        <li>
          <a href='#'>Contact</a>
        </li>
      </ul>
    </nav>
  );
}
