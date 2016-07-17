/**
 * Created by apple on 7/15/16.
 */
import React,{ Component,PropTypes } from 'react'
import { Link } from 'react-router'
import {reduxForm} from 'redux-form'
import {fetchPost,editPost} from '../actions/index'


class PostEdit extends Component {
    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount(){
        this.props.fetchPost(this.props.params.id)
    }

    onSubmit(props){
        this.props.editPost(props)
            .then(()=>{
                //blog post has benn created navigate the user to the index
                this.context.router.push('/')
            })
    }

    render(){
        const { fields:{ title, categories, content,id } , handleSubmit} = this.props;


        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <h3>编辑</h3>
                <input type="hidden" className="form-control"  {...id}   name = "id" />
                <div className={`form-group ${title.touched && title.invalid? 'has-danger' : ''}`}>
                    <lable>标题</lable>
                    <input type="text" className="form-control"  {...title}  name = "title" />
                    <div className="text-help">
                        {title.touched ? title.error : ' '}
                    </div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid? 'has-danger' : ''}`}>
                    <lable>分类</lable>
                    <input type="text" className="form-control" {...categories}   name = "categories" />
                    <div className="text-help">
                        {categories.touched ? categories.error : ' '}
                    </div>
                </div>

                <div className={`form-group ${content.touched && content.invalid? 'has-danger' : ''}`}>
                    <lable>内容</lable>
                    <textarea type="text" className="form-control" {...content}  name = "content" />
                    <div className="text-help">
                        {content.touched ? content.error : ' '}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">保存</button>
                <Link to="/" className="btn btn-danger">取消</Link>
            </form>
        );
    }
}
function validate(values){
    const errors = {}
    if(!values.title){
        errors.title='请输入标题'
    }
    if(!values.categories){
        errors.categories='请输入分类'
    }
    if(!values.content){
        errors.content='请输入内容'
    }
    return errors
}

function mapStateToProps(state) {
    return {initialValues:state.posts.post}
}

export default reduxForm({
    form:'PostsNewForm',
    fields:['title','categories','content','id'],
    validate
},mapStateToProps,{editPost,fetchPost})(PostEdit)