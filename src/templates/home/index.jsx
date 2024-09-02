import { Component } from 'react';
import './styles.css'

import { Posts } from '../../posts';
import { loadPosts } from '../../utils/loadPosts';
import { Button } from '../../components/button';
import { TextInput } from '../../components/textInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    seachValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ seachValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, seachValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!seachValue ? posts.filter(post => {
      return post.title.toLowerCase().includes(seachValue.toLowerCase());
    }) : posts;

    return (
      <section className='container'>
        <div className='search-container'>

          {!!seachValue && (
            <h1>Search value:{seachValue}</h1>
          )}

          <TextInput seachValue={seachValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts =(</p>
        )}
        <div className='button-container'>
          {!seachValue && (
            <Button text='Load more posts' onClick={this.loadMorePosts} disable={noMorePosts} />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
