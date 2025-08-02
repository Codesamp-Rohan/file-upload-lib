import React from 'react';
import mainImg from './assets/bg.jpg'

const FixedImage: React.FC = () => {
    return (
        <img
            src={mainImg}
            alt="Fixed Image"
            className="fixed-image"
        />
    );
};

export default FixedImage;