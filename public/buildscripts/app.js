"use strict";

var LogIn = React.createClass({
  displayName: "LogIn",

  render: function render() {
    return React.createElement(
      "div",
      { className: "row logIn" },
      React.createElement(
        "div",
        { className: "col-xs-1 col-xs-offset-5 " },
        React.createElement(
          "a",
          { href: "https://instagram.com/oauth/authorize/?client_id=874eb5d83dfb4035a71c97faa154e0a9&redirect_uri=http://localhost:8080/&response_type=token", className: "btn btn-default" },
          "Log In"
        )
      )
    );
  }
});

var LogOut = React.createClass({
  displayName: "LogOut",

  render: function render() {
    return React.createElement(
      "div",
      { className: "row logOut" },
      React.createElement(
        "div",
        { className: "col-xs-1 col-xs-offset-5 " },
        React.createElement(
          "a",
          { href: "https://instagram.com/accounts/logout/", className: "btn btn-default" },
          "Log Out"
        )
      )
    );
  }
});

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    return React.createElement(
      "nav",
      null,
      React.createElement(
        "h2",
        { className: "text-center" },
        "What The Filter?!"
      )
    );
  }
});

var PhotoFeed = React.createClass({
  displayName: "PhotoFeed",

  grabToken: function grabToken() {
    var urlArray = window.location.href.split('#');
    var pathArray = urlArray[1].split("=");
    var token = pathArray[1];
    return token;
  },

  loadPhotosFromServer: function loadPhotosFromServer(token) {

    $.ajax({
      type: "GET",
      url: requestUrl + token,
      dataType: 'jsonp',
      success: (function (response) {
        this.setState({ response: response.data });
        requestUrl = response.pagination.next_url;
      }).bind(this),
      error: (function () {}).bind(this)
    });
  },

  getInitialState: function getInitialState() {
    return { response: [] };
  },

  componentDidMount: function componentDidMount() {
    this.loadPhotosFromServer(this.grabToken());
  },

  loadMore: function loadMore() {
    this.loadPhotosFromServer(this.grabToken());
  },

  render: function render() {

    var responseLength = this.state.response.length;
    for (var i = 0; i < responseLength; i++) {
      if (i == responseLength - 1) {
        rows.push(React.createElement(
          "div",
          { className: "photoContainer", onClick: this.loadMore },
          React.createElement(PhotoContainer, { count: i, imagesrc: this.state.response[i].images.standard_resolution.url, filter: this.state.response[i].filter })
        ));
      } else {
        rows.push(React.createElement(
          "div",
          { className: "photoContainer" },
          React.createElement(PhotoContainer, { count: i, imagesrc: this.state.response[i].images.standard_resolution.url, filter: this.state.response[i].filter })
        ));
      }
    }
    return React.createElement(
      "div",
      { className: "photoFeed" },
      rows
    );
  }
});

var PhotoContainer = React.createClass({
  displayName: "PhotoContainer",

  render: function render() {
    return React.createElement(
      "div",
      { className: "photoContainer" },
      React.createElement(Photo, { imagesrc: this.props.imagesrc }),
      React.createElement(FilterLabel, { filter: this.props.filter })
    );
  }
});

var Photo = React.createClass({
  displayName: "Photo",

  render: function render() {
    return React.createElement(
      "div",
      { className: "photo" },
      React.createElement("img", { src: this.props.imagesrc, className: "center-block" })
    );
  }
});

var FilterLabel = React.createClass({
  displayName: "FilterLabel",

  render: function render() {
    return React.createElement(
      "div",
      { className: "filterLabel" },
      React.createElement(
        "h4",
        { className: "text-center" },
        this.props.filter
      )
    );
  }
});

//Global variables
var rows = [];
var requestUrl = "https://api.instagram.com/v1/users/self/feed?access_token=";

var OverallView = React.createClass({
  displayName: "OverallView",

  render: function render() {
    return React.createElement(
      "div",
      { className: "overallView" },
      React.createElement(Header, null),
      React.createElement(LogIn, null),
      React.createElement(LogOut, null),
      React.createElement(PhotoFeed, null)
    );
  }
});

React.render(React.createElement(OverallView, null), document.getElementById('content'));

// Use in order to continue photo stream
/*
React.render(
  <PhotoFeed />,
  document.getElementById('content2')
); */