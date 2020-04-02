import axios from "axios";

export default token => {
  return axios.create({
    baseURL: "https://candidate.neversitup.com/todo",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg1NjAwYTE0MWM4YjMyZjVhOWM5ZjQiLCJpYXQiOjE1ODU4MTIwMjUsImV4cCI6MTU4NTgyMjgyNX0.S0BYBsbX3H-Xk4B0eIc_FA00QH0CfXSHo4TePO-9CKo";
// axios.defaults.baseURL = "https://candidate.neversitup.com/todo";
// axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

// export default axios;
