import React, {ReactNode} from "react";
import { Form } from 'react-bootstrap';
import './Field.css';

type fieldProps = {
    label?: string | undefined,
    required?: boolean | undefined,
    placeholder?: string | undefined,
    type?: 'email' | 'text' | 'password' | undefined,
    onChange?: 
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined
}


const Field = ({ 
    label='', 
    required=true, 
    placeholder='', 
    type='text',
    onChange = () => null
}: fieldProps) => {
    return (
        <div className="field-container mb-4">
            <Form.Label className="ms-1 field-label">{label}</Form.Label>
            <Form.Control 
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
            />
        </div>
    );
}

export default Field;