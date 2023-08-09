import axios from 'axios';
import { useHistory } from "react-router-dom";

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log("Error", error);

  if (error.response && 401 === error.response.status) {
    const checkout = localStorage.getItem('checkout');
    localStorage.clear();
    localStorage.setItem('checkout', checkout);
    //let history = useHistory();
    window.location = '/login';
    //history.push('/login');
  }
  else {
    return Promise.reject(error);
  }
});

export const BASE_URL = 'http://localhost:5000/';

export const API_URL = `${BASE_URL}api/v1/`;
export const ImageUrl = `${BASE_URL}`;

// Post Request

export function postData(url, data, isAuthReq = true) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    const key = localStorage.getItem('TOKEN');
    headers = { headers: { 'Authorization': 'Bearer ' + key } };
  }

  return axios.post(requestUrl, data, headers).catch((error) => Promise.reject
    (error.response.data));


}

// Get Request
export function getData(url, data = {}, isAuthReq = true) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    const key = localStorage.getItem('TOKEN');
    headers = { headers: { 'Authorization': 'Bearer ' + key } };
  }
  return axios.get(requestUrl, headers);
}

// Put Request
export function putData(url, data, isAuthReq = true) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    const key = localStorage.getItem('TOKEN');
    headers = { headers: { 'Authorization': 'Bearer ' + key } };
  }

  return axios.put(requestUrl, data, headers);
}

// Delete Request
export function deleteData(url, isAuthReq = true) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    const key = localStorage.getItem('TOKEN');
    headers = { headers: { 'Authorization': 'Bearer ' + key } };
  }

  return axios.delete(requestUrl, headers);
}

export function postNotification(body) {
  try {
    const data = postData(`${BASE_URL}`, body);
    return data;
  }
  catch (err) {
    return err;
  }
}
