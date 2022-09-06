import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import * as UI from '@nextui-org/react';

const Home: NextPage = () => {
  const query = trpc.useQuery(['shortLink.getAllPublic']);

  return (
    <>
      <Head>
        <title>cdy.pw | URL shortener</title>
        <meta name='description' content='Create your own short URL' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-800'>
        {/* <h1 className='text-5xl md:text-[5rem] leading-normal font-extrabold text-zinc-900'>
          <span className='text-purple-300'>cdy</span>.pw
        </h1> */}
        <div className='max-w-2xl min-w-[35rem]'>
          <UI.Card>
            <UI.Card.Header>Create a new link</UI.Card.Header>
            <UI.Card.Body>
              <UI.Input /> 
            </UI.Card.Body>
            <UI.Card.Footer>
              <UI.Button>Submit</UI.Button>
            </UI.Card.Footer>
          </UI.Card>
        </div>
      </main>
    </>
  );
};

export default Home;
