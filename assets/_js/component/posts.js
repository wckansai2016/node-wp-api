'use strict';

var React = require('react');

module.exports = React.createClass({
    getInitialState: function(){
      return {
          posts: this.props.posts
      }
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({
            posts: nextProps.posts
        })
    },
    renderPosts: function(){
        return this.state.posts.map(function(value, index){
            return (
                <li key={index} className="post">
                    <h2 className="entry-title">{value.title.rendered}</h2>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html: value.content.rendered}} />
                </li>
            )
        })
    },
    render: function() {
        var posts = this.renderPosts();
        return (
            <ul ref="posts">
                {posts}
            </ul>
        )
    }
});
