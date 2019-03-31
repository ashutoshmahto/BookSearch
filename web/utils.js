import axios from "axios";

export const makeServerRequest = options => {
  return axios({
    method: "get",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    ...options
  });
};

export const formatData = data => {
  if (typeof data === "string") {
    return data;
  } else {
    const formattedObj = {};
    Object.keys(data).forEach(key => {
      if (key !== "$") {
        if (Array.isArray(data[key]) && data[key].length > 1) {
          formattedObj[key] = data[key].map(item => {
            return formatData(item);
          });
        } else {
          formattedObj[key] =
            typeof data[key] === "string"
              ? data[key]
              : formatData(data[key][0]);
        }
      }
    });

    if (Object.keys(formattedObj).length === 1 && formattedObj._) {
      return formattedObj._;
    }

    return { ...formattedObj };
  }
};
