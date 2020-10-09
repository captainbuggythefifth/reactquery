import React from 'react';

interface IButton {
    label: string | React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({ label, onClick = () => { } }: IButton) => {
    return (
        <button onClick={onClick}>{label}</button>
    )
}

export default Button