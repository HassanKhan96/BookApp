import React, { ReactNode } from "react";
import './Button.css';


type buttonProps = {
    children?: ReactNode | undefined,
    className?: string | undefined,
    type?: 'submit' | 'button' | 'reset',
    onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined
}

const Button = ({ 
    className = '', 
    children,
    type = 'submit',
    onClick = () => null, 
}: buttonProps): JSX.Element => {
    return (
        <div className="btn-container">
            <button
                onClick={onClick}
                className={`btn-class ${className}`}
                type='submit'
            >
                {children}
            </button>
        </div>
    )
}

export default Button;