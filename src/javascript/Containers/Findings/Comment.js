import React, {Component} from 'react'
import localStorage from 'localStorage'
import {createComment, fetchAllComments,} from '../../Actions/CommentActions'
import {formtTime} from '../Common'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }
    this.handleMessage = this
      .handleMessage
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }
  handleMessage(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  componentDidMount() {
    const payload = {
      findingId: this.props.findingId
    }
    this.fetchComments(payload);
  }
  fetchComments(payload) {
    this
      .props
      .dispatch(fetchAllComments(payload));
  }
  handleSubmit() {
    const payload = {
      name: this.state.name,
      findingId: this.props.findingId
    }
    this
      .props
      .dispatch(createComment(payload));
    const commentListPayload = {
      findingId: this.props.findingId
    }
    this
      .props
      .dispatch(fetchAllComments(commentListPayload));
  }
  renderComments(comments) {
    return (
      <div id="comments-list">
        {comments.map((comment, index) => (
          <div key={index} class="comment jumptarget" id="comment-21">
            <p>
              <span class="label">{comment.userName}:</span>
            </p>
            <blockquote>
              <p>{comment.name}</p>
              <small>
                <em>{formtTime(comment.createdAt)}</em>
              </small>
            </blockquote>
          </div>
        ))
}
      </div>
    );
  }
  renderCommentForm(finding) {
    if (finding.createComments) {
      return (
        <form class="new_comment">
          <div class="row">
            <div class="form-group col-md-12">
              <label for="comment_comment">Comment</label>:
              <textarea class="form-control" name="name" id="comment_message" onChange={this.handleMessage}></textarea>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12">
              <button type="button" name="commit" value="Add" class="btn btn-primary" onClick={this.handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </form>
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.createResponse) {
      toastr.info("Comment added successfully");
      var payload = {
        findingId: this.props.findingId
      }
      this.fetchComments(payload)
    }
  }
  render() {
    const {fetchedComments} = this.props;
    const {finding} = this.props;
    return (
      <div class="finding-comments">
        <div class="comments-list">
          {this.renderComments(fetchedComments)}
          <div class="row top-buffer">
            <div class="comment-form" id="comment-form">
              {this.renderCommentForm(finding)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({finding: state.findings.finding, fetchedComments: state.comments.fetchedComments, createResponse: state.comments.createResponse});
export default connect(mapStateToProps)(Comment);
