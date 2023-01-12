import Layout from '../../components/layout';
import { getAllPostIds,getPostData } from '../../lib/posts';
import utilStyle from '../../styles/utilis.module.css'
import Head from 'next/head';
import Date from '../../components/date';

export default function Post( {postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

        <h5 className={utilStyle.marginBottom}>
          {postData.title}
        </h5>
        
        <br />
        <span className={utilStyle.colorRed}>
          {postData.id}
        </span>
        
        <br />
        <Date dateString={postData.date} />
        <br />
        {/* contenuto del mio post da visualizzare in modo asincrono */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
  </Layout>
  );
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
  }
  
export async function getStaticProps({ params }) {
// Fetch necessary data for the blog post using params.id
const postData = await getPostData(params.id);

return {
  props: {
    postData,
  },
};
}