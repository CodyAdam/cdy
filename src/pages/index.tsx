import { Card, Button, Input, Text, Checkbox, Loading } from '@nextui-org/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { inferMutationInput, trpc } from '../utils/trpc';

const DEFAULT_URL: inferMutationInput<'shortLink.create'> = {
  isPublic: false,
  url: '',
  slug: '',
};

const Home: NextPage = () => {
  const query = trpc.useQuery(['shortLink.getAllPublic']);
  const mutation = trpc.useMutation('shortLink.create');
  const [createState, setCreateState] = useState(DEFAULT_URL);

  function handleSubmit() {
    mutation.mutate(createState, {
      onSuccess() {
        setCreateState(DEFAULT_URL);
        query.refetch();
      },
    });
  }

  return (
    <>
      <Head>
        <title>cdy.pw | URL shortener</title>
        <meta name='description' content='Create your own short URL' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-center min-h-screen overflow-y-auto p-4'>
        <div className='max-w-[25rem] flex flex-col gap-10'>
          <Card className='bg-[rgb(15,15,16)]'>
            <Card.Header>Create a new link</Card.Header>
            <Card.Divider />
            <Card.Body className='flex flex-col gap-3'>
              <Input
                clearable
                label='Long URL'
                placeholder='https://example.com'
                type='url'
                value={createState.url}
                onChange={(newValue) => {
                  setCreateState({ ...createState, url: newValue.target.value });
                }}
              />
              <Input
                clearable
                label='Slug'
                labelLeft='cdy.pw/'
                value={createState.slug}
                onChange={(newValue) => {
                  setCreateState({ ...createState, slug: newValue.target.value });
                }}
              />
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
            <Card.Footer className='justify-end'>
              <Button onClick={handleSubmit} color='gradient' disabled={mutation.isLoading}>
                {!mutation.isLoading ? 'Create' : <Loading size='sm' />}
              </Button>
            </Card.Footer>
          </Card>
          {query.isSuccess && (
            <Card className='bg-[rgb(15,15,16)]'>
              <Card.Header>Public links</Card.Header>
              <Card.Divider />
              <Card.Body>
                {query.data.map((link) => (
                  <Button key={link.slug} color='secondary' className='flex items-center justify-between gap-2'>
                    <Text>/{link.slug}</Text>
                    <Text h3 >&rarr;</Text>
                    <Text className='overflow-hidden text-ellipsis whitespace-nowrap'>{link.url}</Text>
                  </Button>
                ))}
              </Card.Body>
            </Card>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
