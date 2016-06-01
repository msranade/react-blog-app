import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSinglePost, deletePost } from '../actions/index';

class PostsShow extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchSinglePost(this.props.params.id);
  }

  onDelete() {
    console.log('deleting the post...');
    this.props.deletePost(this.props.params.id)
      .then(() => {
        this.context.router.push("/");
      });
  }

  render() {

    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
      <Link to="/">Back to Index</Link>
        <h3>{ post.title }</h3>
        <h6>Categories: { post.categories }</h6>
        <p>{ post.content }</p>

        <button className="btn btn-danger pull-xs-right"
         onClick={ this.onDelete.bind(this) }>Delete</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchSinglePost: fetchSinglePost, deletePost: deletePost })(PostsShow);