import React from 'react';

const mockPosts = [
    'khgkjhh jhgjhgk',
    'ytdytvuyiuygu ygo oiuhiuhiuhpiu',
    'kjhgkjhg khgkjhh jhgjhgk',
    'jgfj kjhgj khgkjhh jhgjhgk',
]

const PostList = () => (
    <div class="list-group">
        <h2>Posts</h2>
        {mockPosts.map((post, index) => (
            <a href="./" class="list-group-item list-group-item-action" key={index}>{post}</a>
        ))}
    </div>
)
export default PostList