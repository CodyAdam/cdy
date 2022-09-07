import { Card, Button, Input, Text, Checkbox, Loading, Table, Spacer, Switch, useTheme } from '@nextui-org/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MoonIcon from '../components/MoonIcon';
import SunIcon from '../components/SunIcon';
import { inferMutationInput, trpc } from '../utils/trpc';
import { useTheme as useNextTheme } from 'next-themes';

const DEFAULT_URL: inferMutationInput<'shortLink.create'> = {
  isPublic: false,
  url: '',
  slug: '',
};

const Home: NextPage = () => {
  const query = trpc.useQuery(['shortLink.getAllPublic']);
  const mutation = trpc.useMutation('shortLink.create');
  const [createState, setCreateState] = useState(DEFAULT_URL);
  const [validity, setValidity] = useState<'VALID' | 'UNKNOWN' | 'INVALID'>('UNKNOWN');
  const mutationValid = trpc.useMutation(['shortLink.isValidSlug']);
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  function handleSubmit() {
    mutation.mutate(createState, {
      onSuccess() {
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
        <title>cdy.pw | URL shortener</title>
        <meta name='description' content='Create your own short URL' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-center min-h-screen overflow-y-auto sm:p-10 p-4 '>
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          size='xl'
          css={{ fill: '$accents9' }}
          className='absolute top-3 right-3'
          iconOn={<MoonIcon />}
          iconOff={<SunIcon />}
        />
        <div className='flex flex-col gap-10 max-w-full'>
          <div>
            <Link href='https://cdy.pw/me' passHref>
              <a target='_blank'>
                <Card isHoverable className='bg-transparent'>
                  <Text
                    h1
                    css={{
                      textGradient: '45deg, $red600 10%, $yellow600 50%, $pink900 90%',
                      textAlign: 'center',
                    }}
                    weight='bold'
                    className='cursor-pointer'
                  >
                    cdy.pw
                  </Text>
                  <Text
                    h6
                    color='$accents5'
                    css={{
                      textAlign: 'center',
                    }}
                  >
                    Cool and fast URL shortener by <span className='text-yellow-400'>Cody</span>
                  </Text>
                </Card>
              </a>
            </Link>
          </div>
          <Card className={`shrink ${isDark && 'bg-[rgb(15,15,16)]'}`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Card.Header>Create a new link</Card.Header>
              <Card.Divider />
              <Card.Body className='flex flex-col'>
                <Input
                  clearable
                  label='Long URL'
                  placeholder='https://example.com'
                  type='url'
                  value={createState.url}
                  onChange={(newValue) => {
                    setCreateState({ ...createState, url: newValue.target.value });
                  }}
                  required
                />
                <Spacer y={1} />
                <Input
                  required
                  clearable
                  label='Slug'
                  labelLeft='cdy.pw/'
                  value={createState.slug}
                  color={validity === 'VALID' ? 'success' : validity === 'INVALID' ? 'error' : undefined}
                  status={validity === 'VALID' ? 'success' : validity === 'INVALID' ? 'error' : undefined}
                  onChange={(newValue) => {
                    setCreateState({ ...createState, slug: newValue.target.value });
                  }}
                  contentRight={mutationValid.isLoading && <Loading size='xs' />}
                  helperText={(validity === 'INVALID' && 'This slug is already taken') || undefined}
                />
                <Spacer y={1} />
                <Checkbox
                  color='gradient'
                  onChange={(isPublic) => {
                    setCreateState({ ...createState, isPublic });
                  }}
                  size='sm'
                  isSelected={createState.isPublic}
                >
                  Public
                </Checkbox>
              </Card.Body>
              <Card.Divider />
              <Card.Footer className='justify-end gap-4 whitespace-pre-wrap'>
                {mutation.isError && <Text color='error'>An error occurred, open the console to see the detail</Text>}
                <Card isHoverable isPressable className='w-fit'>
                  <Button
                    type='submit'
                    auto
                    disabled={mutation.isLoading}
                  >
                    {!mutation.isLoading ? 'Create' : <Loading size='sm' />}
                  </Button>
                </Card>
              </Card.Footer>
            </form>
          </Card>
          {query.isSuccess && (
            <Table compact striped bordered className='max-w-full' aria-labelledby='public links table'>
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
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
