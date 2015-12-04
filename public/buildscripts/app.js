"use strict";

var LogIn = React.createClass({
  displayName: "LogIn",

  render: function render() {
    return React.createElement(
      "div",
      { className: "logIn" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement("div", { className: "space" })
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "h1",
          { className: "text-center" },
          " What The Filter "
        )
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement("div", { className: "col-sm-1 col-md-3" }),
        React.createElement(
          "div",
          { className: "col-sm-10 col-md-6" },
          React.createElement(
            "h3",
            { className: "text-center" },
            "Log in to your Instagram account to use ",
            React.createElement(
              "em",
              null,
              "WTF"
            )
          )
        ),
        React.createElement("div", { className: "col-sm-1 col-md-3" })
      ),
      React.createElement(
        "div",
        { className: "row logIn" },
        React.createElement("div", { className: "col-xs-3 col-md-5" }),
        React.createElement(
          "div",
          { className: "col-xs-6 col-md-2" },
          React.createElement(
            "a",
            { href: "/authorize_user", className: "btn btn-lg btn-block btn-success center-block" },
            "Log In"
          )
        ),
        React.createElement("div", { className: "col-xs-3 col-md-5" })
      )
    );
  }
});

var LogOut = React.createClass({
  displayName: "LogOut",

  render: function render() {
    return React.createElement(
      "div",
      { className: "logOut" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement("div", { className: "col-xs-3 col-md-5" }),
        React.createElement(
          "div",
          { className: "col-xs-6 col-md-2 logOut" },
          React.createElement(
            "a",
            { href: "/logOut", className: "btn btn-default center-block" },
            "Log Out"
          )
        ),
        React.createElement("div", { className: "col-xs-3 col-md-5" })
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
        "h1",
        { className: "text-center" },
        "What The Filter"
      )
    );
  }
});

var Twitter = React.createClass({
  displayName: "Twitter",

  render: function render() {
    return React.createElement(
      "div",
      { className: "row trow" },
      React.createElement("div", { className: "col-xs-2" }),
      React.createElement(
        "div",
        { className: "col-xs-8" },
        React.createElement(
          "div",
          { className: "btn btn-info btn-lg center-block", onClick: this.startTweet },
          "Twitter"
        )
      ),
      React.createElement("div", { className: "col-xs-2" })
    );
  },
  startTweet: function startTweet() {
    tweetProcess();
  }
});

var Facebook = React.createClass({
  displayName: "Facebook",

  logInFb: function logInFb() {
    FB.login(function () {
      postAPI("There are " + filteredCount + " photos in my Instagram feed using a filter, WhatTheFilter?! https://whatthefilter.herokuapp.com/");
    }, { scope: 'publish_actions' });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "row fbrow" },
      React.createElement("div", { className: "col-xs-2" }),
      React.createElement(
        "div",
        { className: "col-xs-8" },
        React.createElement(
          "div",
          { className: "btn btn-primary btn-lg center-block", onClick: this.logInFb },
          "facebook"
        )
      ),
      React.createElement("div", { className: "col-xs-2" })
    );
  }
});

var Message = React.createClass({
  displayName: "Message",

  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement("div", { className: "col-xs-2" }),
      React.createElement(
        "div",
        { className: "col-xs-8" },
        React.createElement(
          "h4",
          { className: "text-center message-text" },
          "Message Posted"
        )
      ),
      React.createElement("div", { className: "col-xs-2" })
    );
  }
});

var SocialBox = React.createClass({
  displayName: "SocialBox",

  render: function render() {
    return React.createElement(
      "div",
      { className: "modal fade", id: "myModal" },
      React.createElement(
        "div",
        { className: "modal-dialog" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-body" },
            React.createElement(
              "h3",
              { className: "text-center" },
              "There are ",
              this.props.filteredcount,
              " photos in my Instagram feed using a filter, ",
              React.createElement(
                "em",
                null,
                "WhatTheFilter?!"
              )
            ),
            React.createElement(Twitter, null),
            React.createElement(Facebook, { filteredcount: this.props.filteredcount }),
            React.createElement(Message, null)
          ),
          React.createElement(
            "div",
            { className: "modal-footer" },
            React.createElement(
              "button",
              { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
              "Close"
            )
          )
        )
      )
    );
  }
});

var Footer = React.createClass({
  displayName: "Footer",

  render: function render() {
    return React.createElement(
      "nav",
      { className: "navbar navbar-inverse navbar-fixed-bottom" },
      React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement(
          "div",
          { className: "navbar-header" },
          React.createElement(
            "button",
            { type: "button", className: " share-btn navbar-toggle collapsed btn navbar-btn", "data-toggle": "modal", "data-target": "#myModal", "aria-expanded": "false", "aria-label": "share" },
            React.createElement("span", { className: "glyphicon glyphicon-share", "aria-hidden": "true" })
          ),
          React.createElement(
            "a",
            { className: "navbar-brand" },
            this.props.filteredcount,
            "/",
            this.props.totalcount,
            " Photos Filtered"
          )
        ),
        React.createElement(
          "div",
          { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
          React.createElement(
            "ul",
            { className: "nav navbar-nav navbar-right" },
            React.createElement(
              "button",
              { type: "button", className: "share-btn btn navbar-btn navbar-right", "data-toggle": "modal", "data-target": "#myModal" },
              React.createElement("span", { className: "glyphicon glyphicon-share", "aria-hidden": "true" })
            )
          )
        )
      )
    );
  }
});

var PhotoFeed = React.createClass({
  displayName: "PhotoFeed",

  loadPhotosFromServer: function loadPhotosFromServer() {
    $.ajax({
      type: "GET",
      url: requestUrl,
      dataType: 'json',
      success: (function (response) {
        this.setState({ response: response });
      }).bind(this),
      error: (function () {}).bind(this)
    });
  },

  getInitialState: function getInitialState() {
    return { response: [] };
  },

  componentDidMount: function componentDidMount() {
    this.loadPhotosFromServer();
  },

  loadMore: function loadMore() {
    this.loadPhotosFromServer();
  },

  render: function render() {
    var responseLength = this.state.response.length;
    totalCount += responseLength;
    for (var i = 0; i < responseLength; i++) {
      if (i == responseLength - 3) {
        rows.push(React.createElement(
          "div",
          { className: "photo" },
          React.createElement(Photo, { key: i, imagesrc: this.state.response[i].images.standard_resolution.url, filter: this.state.response[i].filter }),
          React.createElement(Waypoint, { onEnter: this.loadMore, passed: "false" })
        ));
      } else {
        rows.push(React.createElement(
          "div",
          { className: "photo" },
          React.createElement(Photo, { key: i, imagesrc: this.state.response[i].images.standard_resolution.url, filter: this.state.response[i].filter })
        ));
      }
      if (this.state.response[i].filter !== "Normal") {
        filteredCount += 1;
      }
    }
    return React.createElement(
      "div",
      { className: "photoFeed" },
      rows,
      React.createElement(Footer, { filteredcount: filteredCount, totalcount: totalCount }),
      React.createElement(SocialBox, { filteredcount: filteredCount, totalcount: totalCount })
    );
  }
});

var Photo = React.createClass({
  displayName: "Photo",

  render: function render() {
    return React.createElement(
      "div",
      { className: "photo" },
      React.createElement("img", { src: this.props.imagesrc, className: "img-responsive center-block" }),
      React.createElement(
        "h2",
        { className: "text-center" },
        React.createElement(
          "span",
          null,
          this.props.filter
        )
      )
    );
  }
});

//Global variables
var rows = [];
var filteredCount = 0;
var totalCount = 0;
var requestUrl = "/loadPhotoFeed";

var OverallStream = React.createClass({
  displayName: "OverallStream",

  render: function render() {
    return React.createElement(
      "div",
      { className: "overallStream" },
      React.createElement(Header, null),
      React.createElement(LogOut, null),
      React.createElement(PhotoFeed, null)
    );
  }
});

//Backbone views
var overallStream = Backbone.View.extend({
  el: '#content',
  template: '<div class="photo-stream"></div>',
  render: function render() {
    this.$el.html(this.template);
    React.render(React.createElement(OverallStream, null), this.$('.photo-stream').get(0));
    return this;
  }
});

var logIn = Backbone.View.extend({
  el: '#content',
  template: '<div class="login"></div>',
  render: function render() {
    this.$el.html(this.template);
    React.render(React.createElement(LogIn, null), this.$('.login').get(0));
  }
});

new logIn().render();

var _success = Backbone.View.extend({
  el: '#content',
  template: '<div class="success"></div>',
  render: function render() {
    window.close();
  }
});

//Backbone router
var Router = Backbone.Router.extend({
  routes: {
    "stream": 'streamScreen',
    "stream/*path": 'streamScreen',
    "success": 'success'
  },

  streamScreen: function streamScreen() {
    console.log('streamScreen!');
    new overallStream().render();
  },

  success: function success() {
    new _success().render();
  }

});

var app_router = new Router();
Backbone.history.start();
