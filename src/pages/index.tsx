import {
  Card,
  Button,
  Text,
  Checkbox,
  Loading,
  Table,
  Spacer,
  Switch,
  useTheme,
  Input,
  Tooltip,
  Collapse,
} from '@nextui-org/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MoonIcon from '../components/MoonIcon';
import SunIcon from '../components/SunIcon';
import { inferMutationInput, trpc } from '../utils/trpc';
import { useTheme as useNextTheme } from 'next-themes';
import ClipboardIcon from '../components/ClipboardIcon';
import {
  getRandomAmogusSlug,
  getZeroWidthSlug,
  getRandomAnimalSlug,
  getRandomEmojiSlug,
  getRandomFoodSlug,
  getRandomHandSlug,
  getRandomHeadSlug,
  getRandomHeartSlug,
} from '../utils/url-helper';
import GithubLogo from '../components/GithubLogo';
import DoubleChevronDownIcon from '../components/DoubleChevronDownIcon';
import getRandomShadySlug from 'shady-slug';
import { getRandomInt } from '../utils/math-helpers';

const DEFAULT_URL: inferMutationInput<'shortLink.create'> = {
  isPublic: false,
  url: '',
  slug: '',
};

const generators = [
  {
    buttonText: 'Amogus āļ',
    get: () => getRandomAmogusSlug(getRandomInt(4, 7)),
  },
  {
    buttonText: 'Animal đĸ',
    get: () => getRandomAnimalSlug(getRandomInt(4, 7)),
  },
  {
    buttonText: 'Food đ',
    get: () => getRandomFoodSlug(getRandomInt(4, 7)),
  },
  {
    buttonText: 'Hand đ',
    get: () => getRandomHandSlug(getRandomInt(4, 7)),
  },
  {
    buttonText: 'Head đ',
    get: () => getRandomHeadSlug(getRandomInt(4, 7)),
  },
  {
    buttonText: 'Heart đ',
    get: () => getRandomHeartSlug(getRandomInt(4, 7)),
  },
  {
    buttonText: 'Any Emoji',
    get: () => getRandomEmojiSlug(getRandomInt(4, 7)),
  },
  {
    buttonText: 'Shady đĻ',
    get: getRandomShadySlug,
  },
];

const Home: NextPage = () => {
  const query = trpc.useQuery(['shortLink.getAllPublic']);
  const mutation = trpc.useMutation('shortLink.create');
  const [createState, setCreateState] = useState(DEFAULT_URL);
  const [validity, setValidity] = useState<'VALID' | 'UNKNOWN' | 'INVALID'>('UNKNOWN');
  const mutationValid = trpc.useMutation(['shortLink.isValidSlug']);
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const [createdSlugs, setCreatedSlugs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [invisibleSlug, setInvisibleSlug] = useState(false);

  function handleSubmit() {
    const state = createState;
    if (invisibleSlug) state.slug = getZeroWidthSlug(4);
    mutation.mutate(state, {
      onSuccess() {
        setCreatedSlugs((prev) => [createState.slug, ...prev]);
        setCreateState(DEFAULT_URL);
        query.refetch();
      },
    });
  }

  useEffect(() => {
    if (createState.slug.length === 0) {
      setValidity('UNKNOWN');
      return;
    }
    mutationValid.mutate(
      { slug: createState.slug },
      {
        onSuccess(data) {
          setValidity(data ? 'VALID' : 'INVALID');
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createState.slug]);

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
              <Tooltip
                content={copied ? 'copied!' : 'copy'}
                className='w-fit cursor-pointer select-none'
                color={'invert'}
                onClick={() => {
                  navigator.clipboard.writeText(`https://cdy.pw`);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
              >
                <Text
                  h1
                  css={{
                    textGradient: '45deg, $red600 -10%, $yellow600 50%, $pink800 100%',
                    textAlign: 'center',
                    margin: '0',
                  }}
                  weight='bold'
                  className='cursor-pointer px-1'
                >
                  cdy.pw
                </Text>
              </Tooltip>
              <Card isHoverable className='bg-transparent w-fit'>
                <Link href='https://github.com/CodyAdam' passHref>
                  <a target='_blank'>
                    <Text
                      h6
                      color='$accents5'
                      css={{
                        textAlign: 'center',
                        margin: '0',
                      }}
                      className='cursor-pointer px-1 flex items-center gap-1'
                    >
                      Cool and fast URL shortener by <span className='text-yellow-400'>Cody</span>{' '}
                      <GithubLogo className='w-3 h-3 fill-yellow-400' />
                    </Text>
                  </a>
                </Link>
              </Card>
            </div>
            <Card className={`w-full border-2`} css={{ backgroundColor: '$background' }} variant='bordered'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Card.Body className='flex flex-col'>
                  <Input
                    clearable
                    label='URL to shorten'
                    placeholder='https://example.com'
                    type='url'
                    value={createState.url}
                    onChange={(newValue) => {
                      setCreateState({ ...createState, url: newValue.target.value });
                    }}
                    required
                  />
                  <Spacer y={1} />
                  <Checkbox
                    color='gradient'
                    onChange={(invisible) => setInvisibleSlug(invisible)}
                    size='sm'
                    isSelected={invisibleSlug}
                  >
                    Invisible URL <span className='text-xs pl-2 font-semibold text-yellow-400'>(NEW!)</span>
                  </Checkbox>
                  <Spacer y={0.7} />
                  {!invisibleSlug && (
                    <>
                      <Input
                        required
                        clearable
                        label='Slug'
                        labelLeft='cdy.pw/'
                        value={createState.slug}
                        color={
                          validity === 'VALID'
                            ? 'success'
                            : validity === 'INVALID' && createState.slug.length > 0
                            ? 'error'
                            : undefined
                        }
                        status={
                          validity === 'VALID'
                            ? 'success'
                            : validity === 'INVALID' && createState.slug.length > 0
                            ? 'error'
                            : undefined
                        }
                        onChange={(e) => {
                          setCreateState({ ...createState, slug: e.target.value });
                        }}
                        contentRight={mutationValid.isLoading && <Loading size='xs' />}
                        helperText={(validity === 'INVALID' && 'This slug is already taken') || undefined}
                      />
                      <Spacer y={1} />
                      <Collapse divider={false} bordered title={<p className=''>No inspiration?</p>}>
                        <p className='text-center opacity-50'>Let me generate the slug for you!</p>
                        <Spacer y={0.4} />
                        <div className='flex gap-3 flex-wrap [&>*]:grow'>
                          {generators.map((generator, index) => (
                            <Button
                              key={index}
                              auto
                              onClick={() => {
                                setCreateState({ ...createState, slug: generator.get() });
                              }}
                            >
                              {generator.buttonText}
                            </Button>
                          ))}
                        </div>
                      </Collapse>
                      <Spacer y={1} />
                    </>
                  )}
                  <Checkbox
                    label='Public'
                    color='gradient'
                    onChange={(isPublic) => {
                      setCreateState({ ...createState, isPublic });
                    }}
                    size='sm'
                    isSelected={createState.isPublic}
                  />
                </Card.Body>
                <Card.Divider height={1} />
                <Card.Footer className='justify-end gap-4 whitespace-pre-wrap'>
                  {mutation.isError && (
                    <Text color='error'>An error occurred, open the console to see the details</Text>
                  )}
                  <Card isHoverable isPressable className='w-fit'>
                    <Button type='submit' color='gradient' auto disabled={mutation.isLoading}>
                      {!mutation.isLoading ? 'Create' : <Loading size='sm' />}
                    </Button>
                  </Card>
                </Card.Footer>
              </form>
            </Card>
            {createdSlugs.map((slug) => (
              <Tooltip content={copied ? 'copied!' : 'copy'} key={slug} className='w-full' color={'invert'}>
                <Button
                  color='gradient'
                  onClick={() => {
                    navigator.clipboard.writeText(`https://cdy.pw/${slug}`);
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 1000);
                  }}
                  className='w-full'
                  css={{ fill: '$accents9' }}
                >
                  <p className=''>
                    cdy.pw/<strong>{slug}</strong>
                  </p>
                  <Spacer x={0.6} />
                  <ClipboardIcon className='w-3' />
                </Button>
              </Tooltip>
            ))}
            <Spacer y={1} />
            <a href='#public' className='absolute bottom-5 left-0 right-0 flex items-center justify-center'>
              <DoubleChevronDownIcon className={`h-5 ${isDark ? 'fill-zinc-800' : 'fill-zinc-400'}`} />
            </a>
          </div>
          <div id='public' className='min-h-screen flex flex-col gap-8 justify-center sm:p-10 p-4'>
            {query.isSuccess ? (
              <Table compact striped bordered aria-labelledby='public links table'>
                <Table.Header>
                  <Table.Column>Slug</Table.Column>
                  <Table.Column>Public URL</Table.Column>
                </Table.Header>
                <Table.Body>
                  {query.data.map((link) => (
                    <Table.Row key={link.slug}>
                      <Table.Cell>
                        <Link href={`https://cdy.pw/${link.slug}`} passHref>
                          <a target='_blank'>{'/' + link.slug}</a>
                        </Link>
                      </Table.Cell>
                      <Table.Cell
                        css={{ color: '$accents7', maxWidth: '20rem', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {link.url}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <Loading size='xl' />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
