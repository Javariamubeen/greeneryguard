import React, { useState } from 'react';

export function Seller(props) {
    const [checked, setChecked] = useState(false);// should be defined in parent classes
    let {seller, sellerProductCount, value, onClick } = props;

    const handleOnClick = e => {
        onClick(value);
        setChecked(!checked);
    }

    return (
        <div className="custom-control custom-checkbox d-flex align-items-center mb-2" onClick={handleOnClick}>
            {checked
                ? <input type="checkbox" className="custom-control-input" checked />
                : <input type="checkbox" className="custom-control-input" />}
            <label className="custom-control-label" htmlFor="customCheck2">{seller} <span className="text-muted">({sellerProductCount})</span></label>
        </div>
    );
}
