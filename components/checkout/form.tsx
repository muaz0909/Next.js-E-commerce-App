'use client'
import Grid from 'components/grid';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CheckoutForm: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        newsLetter: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/goodbye');
    };

    return (
        <div className='mx-3 mt-3 px-3' style={formStyles}>
            <label style={mainLableStyle}>Checkout</label>
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyles}>
                    <label style={labelStyles}>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyles}
                        required
                    />
                </div>
                <div style={formGroupStyles}>
                    <input
                        type="checkbox"
                        name="newsLetter"
                        id='newsletter'
                        value={formData.newsLetter}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor='newsletter' style={checkboxLable}>Bring the latest to my inbox</label>
                </div>
                <p style={subLableStyle}>Shipping Address</p>
                <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                    <div style={formGroupStyles}>
                        <label style={labelStyles}>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            style={inputStyles}
                            required
                        />
                    </div>
                    <div style={formGroupStyles}>
                        <label style={labelStyles}>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={inputStyles}
                            required
                        />
                    </div>
                </Grid>
                <div style={formGroupStyles}>
                    <label style={labelStyles}>Street Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        style={inputStyles}
                        required
                    />
                </div>
                <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                    <div style={formGroupStyles}>
                        <label style={labelStyles}>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            style={inputStyles}
                            required
                        />
                    </div>
                    <div style={formGroupStyles}>
                        <label style={labelStyles}>Postal Code:</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            style={inputStyles}
                            required
                        />
                    </div>
                </Grid>
                <button type="submit" style={submitButtonStyles}>
                    Place Order
                </button>
            </form>
        </div>
    );
};

// Basic inline styles
const formStyles: React.CSSProperties = {
    maxWidth: '100%',
    margin: '10 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const formGroupStyles: React.CSSProperties = {
    marginBottom: '15px',
};

const labelStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
};

const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const submitButtonStyles: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#007bff',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
};

const mainLableStyle: React.CSSProperties = {
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: '2rem'
}

const subLableStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '1rem'
}

const checkboxLable: React.CSSProperties = {
    fontWeight: '500',
    marginLeft: '0.5rem'
}

export default CheckoutForm;
