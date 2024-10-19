import buildHttpClient from '../api/buildHttpClient';

const index = ({ currentUser }) => {
  return <h1>{currentUser ? 'You are signed in' : 'You are not signed in'}</h1>;
};

index.getInitialProps = async (context) => {
  const client = buildHttpClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default index;
