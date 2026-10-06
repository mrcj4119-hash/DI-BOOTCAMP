import posts from './data/posts.json'

function PostList() {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}

export default PostList
