import './Home.css'

import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import Layout from '../components/Layouts/Layout';
import {useAuth} from '../context/auth';
import {newsData} from '../news';

const Home = () => {
  const [auth]=useAuth();
  const news = newsData;
  return (
    <Layout title={"Home-Vlabs"} keywords={"C,C++,Python,University"}>
    <h4 className='news-header'>News about KIIT :</h4>
    <div className='scroll'>
    {
      news.map((item)=>{
        let title=item.title
        let desc=item.desc.substring(0,500)+'...  '
        let postedDate=item.postedDate
        let url=item.url
        return(
          <>
          <Link to={url} style={{textDecoration:"none",color:'black'}} target="_blank">
          <div className='news-outerbox'>
            <div className='title' style={{fontWeight:'bold',color:'red'}}>
              {title}
            </div>
            <div>
              Posted on: <span style={{fontWeight:500}}>{postedDate}</span><br/>
            </div>
            <div>
              {desc}
            </div>

          </div>
          </Link>
          </>
        )
      })
      
    }
    </div>
    
    
    </Layout>
  )
}

export default Home
