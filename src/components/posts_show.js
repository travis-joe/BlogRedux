/**
 * Created by apple on 7/3/16.
 */
import React,{Component,PropTypes } from 'react'
import {connect } from 'react-redux'
import {fetchPost,deletePost} from '../actions/index'
import {Link} from 'react-router'
class PostsShow extends Component {
    static contextTypes = {
        router:PropTypes.object
    }
    componentWillMount(){
        this.props.fetchPost(this.props.params.id)
    }
    onDeleteCLick(){
        this.props.deletePost(this.props.params.id)
            .then(()=>{
                this.context.router.push('/')
            })
    }
    onEditCLick(){
        this.context.router.push('/posts/edit/'+this.props.params.id)
    }

    render(){
        const {post} = this.props
        if(!post){
            return <div>Loading...</div>
        }
        return (<div>
            <Link to="/" className="pull-xs-right">回到主页</Link>

            <button className="btn btn-primary "
                    onClick={this.onEditCLick.bind(this)}>
                编辑
            </button>

            <button className="btn btn-danger "
                     onClick={this.onDeleteCLick.bind(this)}>
                删除
            </button>
            <h3>{post.title}</h3>
            <h6>Categories:{post.categories}</h6>
            <p>{post.content}</p>
        </div>)
    }
}
function mapStateToProps(state){
    return {post:state.posts.post}
}

export default  connect(mapStateToProps,{fetchPost,deletePost}) (PostsShow)