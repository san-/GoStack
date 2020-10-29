import React from 'react';

// import { Container } from './styles';

export default function Header({ title, children }) {
    return (
        <header>
            <h1>
                {title}
            </h1>
            <div>
                {children}
            </div>
        </header>
    );
}