import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PostStyles from "./styles/PostStyles";
import DeletePost from "./DeletePost";
import { canUpdatePost } from "../lib/genUtils";
import PostUserInfo from "./PostUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import CreateComment from "./CreateComment";
import Comments from "./Comments";
import ReplyComment from "./ReplyComment";

const LIKE_POST_MUTATION = gql`
  mutation LIKE_POST_MUTATION($id: ID!) {
    likePost(id: $id) {
      id
    }
  }
`;

const UNLIKE_POST_MUTATION = gql`
  mutation LIKE_POST_MUTATION($id: ID!) {
    dislikePost(id: $id) {
      id
    }
  }
`;

class Post extends Component {
  state = {
    canCreateComment: false,
    canReplyComment: false,
    commentReplyInfo: {
      commentId: "",
      author: "",
    },
    commentsList: '',
    likeVar: '',
    likeStatus: false,
    likesCount: '',
    loading: false
  };

  componentDidMount(){
    const { post } = this.props;
    if(post){
      this.setState({commentsList: post.comments})
      this.handleLikes();
    }
  }

  componentDidUpdate(prevprops){
    const { post } = this.props;
    if(this.props !== prevprops){
    if(post){
      this.setState({commentsList: post.comments})
      this.handleLikes();
    }}
  }

  handleLikes(){
    const { post, me } = this.props;
    this.setState({likesCount: post.likes.length});
      let likes = post.likes
      likes.filter(item => {
        let user = item.user;
        if(user.id  === me.id){
          this.setState({likeVar: item.id, likeStatus: true  })
        }  
      });
    }

  handleComments = (commentId, author) => {
    this.setState({
      canCreateComment: false,
      canReplyComment: true,
      commentReplyInfo: {
        commentId: commentId,
        author: author,
      },
    });
  };

  onNewComment = (content, newId) =>{
    let { post, me }= this.props;
    const comment = {
      author:{id: me.id, name: me.name, profilePic: me.profilePic},
      content: content,
      id: newId,
      replies: [],
      createdAt: new Date(),
    }
    post.comments.push(comment);
    this.setState({commentsList: post.comments});
  }

  onNewReplyComment = (content, commentId) =>{
    let { post, me }= this.props;
    const replyComment = {
      author:{id: me.id, name: me.name, profilePic: me.profilePic},
      content: content,
      createdAt: new Date(),
      id: "newReply"
    }
    post.comments.filter((comment) => {
      if (comment.id === commentId) {
        comment.replies.push(replyComment);
        return comment;
      }
      return comment;
    });
    this.setState({commentsList: post.comments});
  }

  render() {
    const { post, me } = this.props;
    const { canCreateComment, canReplyComment, commentReplyInfo, commentsList, likeStatus, likesCount } = this.state;
    return (
      <div>
        <PostStyles className="card">
          {post.image && <img src={post.image} alt={post.title} />}

          <div className="card-header border-bottom-0">
            <PostUserInfo
              post={post}
              likesCount={this.state.likesCount}
              isMyPost={canUpdatePost(me, post.author)}
              />
          </div>

          <div className="card-body">
            <Title>
              <a>{`Closed ${post.company}`}</a>
            </Title>
            <div className="post-content">{post.content}</div>
          </div>

          <div className="card-footer border-top-0">
            <div className="buttonList">
                {canUpdatePost(me, post.author) && (
                  <>
                    <Link
                      href={{
                        pathname: "updatePost",
                        query: { id: post.id },
                      }}
                    >
                      <a><FontAwesomeIcon icon={faPencilAlt} /></a>
                    </Link>
                    <Link
                      href={{
                        pathname: "/addContact",
                        query: { company: post.company, description: post.content, source:'posts' },
                      }}
                    >
                      <a><FontAwesomeIcon icon={faUserPlus} /></a>
                    </Link>
                    <DeletePost id={post.id}><FontAwesomeIcon icon={faTrash} /></DeletePost>
                  </>
                )}

                {!canUpdatePost(me, post.author) && (
                  <>
                  <Mutation mutation={likeStatus ? UNLIKE_POST_MUTATION : LIKE_POST_MUTATION} variables={{id: likeStatus ? this.state.likeVar : post.id}}>
                    {(likePost, { loading, error }) => (
                      <a className={this.state.loading ? "inactiveLink" : ''} onClick={async()=>{
                        this.setState({likeStatus: !likeStatus, likesCount: likeStatus ? likesCount-1 : likesCount+1, loading:  true})
                        const res = await likePost();
                        this.setState({likeVar: likeStatus ? '' : res.data.likePost.id, loading:  false})
                      }}>
                        <FontAwesomeIcon icon={faThumbsUp} color={likeStatus? "#26A69A": "black"} />
                        &nbsp;&nbsp;Like{likeStatus? 'd': ''}
                      </a>)}
                      </Mutation>
                    <a
                      onClick={() =>
                        this.setState({ canCreateComment: !canCreateComment, canReplyComment: false })
                      }
                    >
                      <FontAwesomeIcon icon={faComment} />
                      &nbsp;&nbsp;Comment
                    </a>
                  </>
                )}
              </div>
          </div>
        </PostStyles>

        <Comments
          commentList={commentsList}
          replyComment={this.handleComments}
          me={me}
        />
        <div className="commentInput">{canCreateComment ? <CreateComment postId={post.id} onCommentPost={this.onNewComment}/> : ""} 
          {canReplyComment ? <ReplyComment commentId={commentReplyInfo.commentId} author={commentReplyInfo.author} onCommentPost={this.onNewReplyComment}/> : "" }
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
};

export default Post;
