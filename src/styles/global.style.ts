import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 10px;
  }

  body {
    min-width: 320px;
  }

  main {
    padding: 1rem;
  }

  button {
    &:hover {
      cursor: pointer;
    }
  }

  @font-face {
    font-family: Poppins;
    src: url(/fonts/Poppins-Medium.ttf);
  }

  @font-face {
    font-family: Noto Sans Bold;
    src: url(/fonts/NotoSans-Bold.ttf);
  }

  @font-face {
    font-family: Noto Sans;
    src: url(/fonts/NotoSans-Regular.ttf);
  }

  .spinner {
    width: 100%;
  }

`;

export default GlobalStyle;
