import { useEffect, useState , useCallback } from 'react';
import './styles.css'

import { Posts } from '../../posts';
import { loadPosts } from '../../utils/loadPosts';
import { Button } from '../../components/button';
import { TextInput } from '../../components/textInput';

export const Home = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [posts, setPosts] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allPosts, setAllPosts] = useState([0]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [page, setPage] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [postsPerPage] = useState(2);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [seachValue, setSeachValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!seachValue ? posts.filter(post => {
    return post.title.toLowerCase().includes(seachValue.toLowerCase());
  }) : posts;

  
  const HandleLoadPosts = useCallback (async (page , postsPerPage) => {
    const postsAndPhotos = await loadPosts()
    
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    HandleLoadPosts(0 ,postsPerPage);
  }, [HandleLoadPosts , postsPerPage])
  
  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target
    setSeachValue(value)
  }

  return (
    <section className='container'>
      <div className='search-container'>

        {!!seachValue && (
          <h1>Search value:{seachValue}</h1>
        )}

        <TextInput seachValue={seachValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts =(</p>
      )}
      <div className='button-container'>
        {!seachValue && (
          <Button text='Load more posts' onClick={loadMorePosts} disable={noMorePosts} />
        )}
      </div>
    </section>
  );
}

export default Home;
