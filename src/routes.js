/**
 * Created by apple on 7/2/16.
 */
import React from 'react'
import  {Route,IndexRoute} from 'react-router'
import App from './components/app';
import PostsIndex from './components/posts_index'
import PostsNew from './components/posts_new'
import PostsShow from './components/posts_show'
import PostEdit from './components/post_edit'
export default(
    <Route path="/" component={App} >
        <IndexRoute component={PostsIndex}/>
        <Route path="posts/new" component={PostsNew} />
        <Route path="posts/:id" component={PostsShow} />
        <Route path="posts/edit/:id" component={PostEdit} />
    </Route>
)
