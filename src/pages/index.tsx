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

      <main className='flex flex-col items-center justify-center min-h-screen p-4 bg-slate-700'>
        <h1 className='text-5xl md:text-[5rem] leading-normal font-extrabold text-zinc-900'>
          <span className='text-purple-300'>cdy</span>.pw
        </h1>
        <div className='pt-6 text-2xl text-blue-500 flex justify-center items-center w-full'>
          {query.data ? <p>{JSON.stringify(query.data)}</p> : <p>Loading..</p>}
        </div>
      </main>
    </>
  );
};

export default Home;
