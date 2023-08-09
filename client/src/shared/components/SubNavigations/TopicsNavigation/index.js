
import React, { useEffect, useState } from "react";
import './nav.less';
import { GetBlogs } from "./service";
const TopicsNavigation = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function loadData() {
      const { data } = await GetBlogs();
      const blogs = data.slice(0, 7);
      setBlogs(blogs);
    }
    loadData();
  }, []);

  return (
    <nav id="nav-topic" className="navbar navbar-expand-lg content-nav d-flex justify-content-center">
      <ul className="navbar-nav main-nav inner-nav align-items-md-center">
        {blogs ? blogs.map((element, index) => (
          <li key={index} className="nav-item">

            <a className="nav-link" href={`/systems/${element.title.trim().toLowerCase()}`}>
              {element.title}
            </a>
          </li>
        )) : ''}
      </ul>
    </nav>
  );
}
export default TopicsNavigation;