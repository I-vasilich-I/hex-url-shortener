import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary';
import MainLayout from 'src/components/MainLayout/MainLayout';
import { LINKS } from 'src/constants';
import { AuthContextProvider } from 'src/contexts/authContext';
import useAuthContext from 'src/hooks/useAuthContext';
import GlobalStyle from 'src/styles/global.style';
import { theme } from 'src/styles/theme.style';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { token, setToken } = useAuthContext();
  const router = useRouter();
  const isProtectedPath = router.pathname === LINKS.HOME.href;

  useEffect(() => {
    const tokenInStorage = localStorage.getItem('hex_token');
    if (tokenInStorage) {
      setToken(tokenInStorage)
      router.push(LINKS.HOME.href)
      return;
    }

    if (!token && isProtectedPath) {
      router.replace(LINKS.SIGN_IN.href);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <MainLayout>
            <GlobalStyle />
            <Component {...pageProps} />
          </MainLayout>
        </AuthContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;