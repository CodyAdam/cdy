/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  Loading,
  Spacer,
  Switch,
  Table,
  Text,
  Tooltip,
  useTheme
} from '@nextui-org/react';
import type { NextPage } from 'next';
import { useTheme as useNextTheme } from 'next-themes';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import DoubleChevronDownIcon from '../components/DoubleChevronDownIcon';
import GithubLogo from '../components/GithubLogo';
import MoonIcon from '../components/MoonIcon';
import SunIcon from '../components/SunIcon';

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);


  return (
    <>
      <Head>
        <title>cdy.pw</title>
        <meta name='description' content='Create your own short URL' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-col items-center justify-center min-h-screen overflow-y-auto  '>

        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          size='xl'
          css={{ fill: '$accents9' }}
          className='absolute top-3 right-3 z-10'
          iconOn={<MoonIcon />}
          iconOff={<SunIcon />}
        />
        <div className='flex flex-col gap-8 max-w-lg w-full'>
          <div className='min-h-screen flex flex-col gap-8 justify-center sm:p-10 p-4 relative'>
            <div className='flex items-center flex-col justify-center gap-2 '>
              <Text
                h1
                css={{
                  textGradient: '45deg, $red600 -10%, $yellow600 50%, $pink800 100%',
                  textAlign: 'center',
                  margin: '0',
                }}
                weight='bold'
                className='px-1 text-[5rem]'
              >
                cdy.pw
              </Text>
              <Card isHoverable className='bg-transparent w-fit border-none'>
                <Link href='https://github.com/CodyAdam' passHref>
                  <a target='_blank'>
                    <Text
                      h6
                      color='$accents5'
                      css={{
                        textAlign: 'center',
                        margin: '0',
                      }}
                      className='cursor-pointer px-1 flex items-center gap-1 text-sm'
                    >
                      Cool and fast URL shortener by <span className='text-yellow-400'>Cody</span>{' '}
                      <GithubLogo className='w-3 h-3 fill-yellow-400' />
                    </Text>
                  </a>
                </Link>
              </Card>
              <div className={`flex flex-col gap-4 mt-14 text-2xl max-w-lg p-8 transition-colors rounded-lg border ${isDark ? "bg-orange-400/10 border-orange-500/50" : "bg-orange-100 border-orange-500"}`}>
                <h2><strong>Exciting Update Ahead!</strong></h2>
                <div className={`flex flex-col gap-4 [&>p]:leading-snug ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                  <p>Dear Users,</p>
                  <p>We're thrilled to announce that <strong>cdy.pw</strong> is undergoing a major transformation! 🌟 This update brings significant changes and a lot of new exciting features!</p>
                  <p>
                    The domain <strong>cdy.pw</strong> will be <strong>permanently</strong> redirected to <strong>1u.to</strong> on <strong>January 1st, 2024</strong>.
                  </p>
                  <div className='flex gap-4 items-center justify-center py-6 px-2'>
                    <p>cdy.pw</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z"></path></svg>
                    <p><a href="https://1u.to"
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:underline hover:text-blue-500 font-bold">1u.to</a></p>
                  </div>
                  <p>Stay tuned for an upgraded journey with us!</p>
                  <p>Thank you for your continued support! 💛</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
