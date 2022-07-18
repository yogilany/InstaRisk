import Axios from '../utils/http.config';

export class LoginService {
  static checkCredentials(loginData) {
    try {

      // WHAT IS THE DESTINATION???????????????????????
      return Axios.post(`/users/login`, { loginData })
        .then(response => {
          localStorage.setItem(`token`, response.data.result.result);

          return response.data.result.result;
        })
        .catch(err => console.log(err));
    }
    catch (err) {
      console.log(err.response);
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

}
