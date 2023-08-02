import React from 'react';
import Layout from '../components/Layouts/Layout';
import { useAuth } from '../context/auth';
const Home = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"Home-Vlabs"} keywords={"C,C++,Python,University"}>
    <h3>Home Page</h3>
    <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default Home
