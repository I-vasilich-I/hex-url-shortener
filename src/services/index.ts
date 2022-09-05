import axios from 'axios';

axios.defaults.baseURL = 'http://79.143.31.216';

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    return { data: null, error: error?.response?.data || error }
  }

  console.log(error);
  return null
}

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

const shortenLink = async (link: string, token: string) => {
  try {
    const { data } = await axios.post('/squeeze', {}, {
      params: {
        link
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return { data, error: null }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { data: null, error: error?.response?.data || error }
    }

    console.log(error);
    return null;
  }
}

interface IOptions {
  current: number;
  pageSize: number;
  orderBy: string[];
}

const loadLinksData = async (token: string, options?: IOptions) => {
  const params = new URLSearchParams();
  
  if (options) {
    const { current, pageSize, orderBy } = options;
    const offset = (current - 1) * pageSize;
    params.append('offset', offset.toString());
    params.append('limit', pageSize.toString());
    orderBy.forEach(el => params.append('order', el));
  }

  try {
    const { data } = await axios.get('/statistics', {
      params,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return { data, error: null }
  } catch (error) {
    return handleError(error);
  }
}


export { signUpUser, signInUser, shortenLink, loadLinksData }