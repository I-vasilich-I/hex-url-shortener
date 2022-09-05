# URL-shortener

## How to run project

1. Clone repository with command 
```bash 
git clone https://github.com/I-vasilich-I/hex-url-shortener.git
```

2. Run command in terminal (console) for installing all required packages (Node.js is required: <https://nodejs.org/en/>)
```bash 
npm i
``` 

3. For running project you can use the following commands:

## Running application in docker container

```bash
npm run docker
```

## Running application on local development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[Deploy](https://hex-url-shortener.netlify.app/)

## Known issues(don't have time to fix it)

 - Deploy has issue with CORS, could be fixed with some proxy server
 - Flickering of home page before redirect on unauthorized load
 - Some troubles with first data load after authentication - after reload everything works fine

