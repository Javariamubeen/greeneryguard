import React from 'react';


const ProductsNav = (props) => {
  return (
    <aside className="products-sidebar">
      <div className="block">
        <h3>Zo app</h3>
        <ul className="block-list">
          <li>
            <span>Phone app</span>
            <ul className="check-list">
              <li>
                <span>Ios</span>
              </li>
              <li>
                <span>Android</span>
              </li>
            </ul>
          </li>
          <li>
            <span>desktop App</span>
          </li>
        </ul>
      </div>
      <div className="block">
        <h3>ZO File FOLDER SYSTEM</h3>
        <ul className="block-list">
          <li>
            <span>COMPLETE FILE SYSTEM</span>

          </li>
          <li>
            <span>SECTIONS</span>
            <ul className="check-list">
              <li>
                <span>fINANCE</span>
                
              </li>
              <li> 
                <span>INSURANCE</span>
               
              </li>
              <li>
                <span>TAXES</span>
                
              </li>
              <li>
                <span>RECORDS</span>
                
              </li>
              <li>
                <span>ACADEMICS</span>
                
              </li>
              <li>
                <span>LIFESTYLE</span>
                
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="block">
        <h3>ZO bINDERS</h3>
        <ul className="block-list">
          <li>
            <span>COMPLETE BINDER SET</span>

          </li>
          <li>
            <span>SECTIONS</span>
            <ul className="check-list">
              <li>
                <span>FINANCE</span>
                
              </li>
              <li>
                <span>INSURANCE</span>
                
              </li>
              <li>
                <span>TAXES</span>
                
              </li>
              <li>
                <span>RECORDS</span>
               
              </li>
              <li>
                <span>ACADEMICS</span>
                
              </li>
              <li>
                <span>LIFESTYLE</span>
                
              </li>
              <li>
                <span>HOME MAINTENANCE</span>
          
              </li>
              <li>
                <span>WELLNESS</span>
               
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default ProductsNav;