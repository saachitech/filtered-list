const API_END_POINT = process.env.REACT_APP_API_END_POINT;

const getAPIRoute = route => `${API_END_POINT}/${route}`;

export const get = (route, params) => fetch(getAPIRoute(route), { queryStringParameters: params })

export const post = (route, params) => fetch(getAPIRoute(route), { method: 'POST', body: params, headers: { accept: 'application/json' } });

export const del = (route, params) => fetch(getAPIRoute(route), { method: 'DELETE', body: params, headers: { accept: 'application/json' } });

export const patch = (route, params) => fetch(getAPIRoute(route), { method: 'PUT', body: params, headers: { accept: 'application/json' } });

export const responseResult = response => response.json().then(json => ({
  total: parseInt(response.headers.get('X-Total-Count'), 10),
  data: json
}))

export const cleanPayload = payload => {
  let data = {};
  Object.keys(payload).map(key => {
    let entry = payload[key];
    if (entry === false) { data[key] = entry; }
    else if (entry && entry !== "") { data[key] = entry; }
  })
  return data;
}