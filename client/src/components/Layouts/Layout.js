import React from 'react'
import Header from './Header'
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div className=''>
      <Helmet>
                <meta charSet="utf-8" />
          
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta name="author" content="Nazim Qureshi"/>
                
                <title >{title}</title>
      </Helmet>
      <Header/>
      <main style={{width:"100%"}}>
        <Toaster />
        {children}
        
      </main>
      <Footer/>
      
    </div>
  )
}

Layout.defaultProps={
  title:"V-labs",
  description:"A comprehensive solution for students and colleges",
  keywords:"Programming languages,C,C++,Online Compiler,online lab,lab,virtual lab,vlab,VLAB",
}
export default Layout
