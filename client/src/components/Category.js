import React, { useState } from 'react';

export function Category(props) {
    const [checked, setChecked] = useState(false); // should be defined in parent classes
    let {categoryName, value, onClick, onChangeSelectedCategories, data } = props;

    const handleOnClick = e => {
        // onClick(props.id);
        setChecked(!checked);
        let categories = data;
        if (checked) {
            categories = categories.filter(cat => cat !== props.id);
        }
        else {
            categories.push(props.id);
        }
        onChangeSelectedCategories(categories);
    }

    return (
        <div className="custom-control custom-checkbox d-flex align-items-center mb-2" onClick={handleOnClick}>
            { <input type="checkbox" className="custom-control-input" checked={checked} />}
            <label className="custom-control-label" htmlFor="customCheck2">{categoryName}</label>
        </div>
    );
}



