import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./items.less";
const TopicItems = ({ content }) => {
  return (
    <div className="container item-root">
      <div className="multiple-counts">
        {content.map((item, key) => (

          <div className="text-left text-uppercase" style={{ display: 'inline', margin: '0 50px' }} key={key}>
            <h2>
              <Link to={`/systems/${item.title.trim().toLowerCase()}`}>{item.title}</Link>
            </h2>
            {item.categories && item.categories.length > 0 && item.categories.map((menu, index) => {
              return (
                <NavLink to={`/systems/${item._id}/home`}>
                  <h5 key={index}>{menu.title}</h5>
                </NavLink>
              );
            })}
          </div>
        )
        )}
      </div>
    </div>
  );
};
export default TopicItems;
