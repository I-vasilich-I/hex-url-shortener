import axios from 'axios';

axios.defaults.baseURL = 'http://79.143.31.216';

const signInUser = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  try {
    const { data } = await axios.post('/login', params)

    return { data, error: null }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return { data: null, error: error?.response?.data || error }
    }

    console.log(error);
    return null
  }
}

const signUpUser = async (username: string, password: string) => {
  try {
    const { data } = await axios.post('/register',{}, {
      params: {
        username,
        password
      }
    })

    return { data, error: null }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return { data: null, error: error?.response?.data || error }
    }

    console.log(error);
    return null;
  }
}



export { signUpUser, signInUser }