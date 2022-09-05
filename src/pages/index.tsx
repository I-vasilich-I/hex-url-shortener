import type { NextPage } from 'next';
import Head from 'next/head';
import LinksTable from 'src/components/LinksTable/LinksTable';
import { Input, Button, Spin, message } from 'antd';
import { ChangeEvent, useState } from 'react';
import useAuthContext from 'src/hooks/useAuthContext';
import { shortenLink } from 'src/services';

const Home: NextPage = () => {
  const { token } = useAuthContext();
  const [linkLoading, setLinkLoading] = useState(false);
  const [link, setLink] = useState("");
  const [update, setUpdate] = useState(true);

  const handleShorten = async () => {
    setLinkLoading(true);
    const response = await shortenLink(link, token!)
    if (!response || response.error) {
      setLinkLoading(false);
      message.error('Something went wrong')
      return;
    }

    message.success('Link is shortened')
    setLink('');
    setUpdate(true);
    setLinkLoading(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Url-Shortener</title>
        <meta name="description" content="Url-Shortener" />
      </Head>
      <>
        <Input.Group compact style={{ marginBottom: 40 }}>
          <Spin spinning={linkLoading} wrapperClassName='spinner'>
            <Input style={{ width: 'calc(100% - 200px)' }} onChange={handleChange} value={link} placeholder="Enter some link" />
            <Button type="primary" onClick={handleShorten}>Shorten</Button>
          </Spin>
        </Input.Group>
        <LinksTable update={update} setUpdate={setUpdate} />
      </>
    </>
  );
};

export default Home;