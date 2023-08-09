import React from "react";
import "./style.less";
import { Collapse } from 'antd';
import { ImageUrl } from '../../../apis/request';
const { Panel } = Collapse
//const API_URL = "https://zo-apis.azurewebsites.net/";
//const API_URL = "file://D:/Git/zoreactbackend/";
const Template = ({
  item
}) => {

  return (

      <Panel header={item.title} key={item._id} id={item._id}>
        <div className="zo-template">
          {/* <h1 className="text-uppercase">{title}</h1> */}
          {<div dangerouslySetInnerHTML={{ __html: item.description }} />}
          {item.files ? item.files.map(url => (
                  <><a target="_blank" href={`${ImageUrl}${url}`} >
                    <div key={`${ImageUrl}${url}`} className="card-uploadedImage">
                      <img
                          src={`${ImageUrl}${url}`}
                      />
                    </div>
                  </a>
                    <a target="_blank" href={`${ImageUrl}${url}`} >
                      <div key={`${ImageUrl}${url}`} className="card-uploadedImage">
                        <img
                            src={`${ImageUrl}${url}`}
                        />
                      </div>
                    </a>
                  </>
              ))
              : ''}
          {item.types && item.types.length > 0 && (
              <div>
                <h3 className="text-center">Types of {item.title}</h3>
                <div className="d-flex justify-content-center">
                  <ul className={item.types.length > 5 ? "two-column" : ""}>
                    {item.types.map((_item) => (
                        <li key={_item._id}>
                          <a href={`/blogtype/${_item._id}`}>{_item.title}</a>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
          )}
          {item.about && (
              <>
                <h2>About</h2>
                <p>{item.about}</p>
                <h2>Regulations</h2>
                <p>{item.regulations}</p>
                <h2>Quick Tips</h2>
                <p>{item.quickTips}</p>
                <h2>Reports</h2>
                <p>{item.reports}</p>
                <h2>Forms</h2>
                <p>{item.forms}</p>
                <h2>Resources</h2>
                <p>{item.resource}</p>
              </>
          )}
        </div>
      </Panel>

  );
};

export default Template;
