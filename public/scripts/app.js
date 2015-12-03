var LogIn = React.createClass({
  render: function() {
    return (
      <div className="logIn">
        <div className="row">
          <div className="space"></div>
        </div>
        <div className="row">
          <h1 className="text-center"> What The Filter </h1>
        </div>
        <div className="row">
          <div className="col-sm-1 col-md-3"></div>
          <div className="col-sm-10 col-md-6">
            <h3 className="text-center">Log in to your Instagram account to use <em>WTF</em></h3>
          </div>
          <div className="col-sm-1 col-md-3"></div>
        </div>
        <div className="row logIn">
          <div className="col-xs-3 col-md-5">
          </div>
          <div className="col-xs-6 col-md-2">
            <a href="/authorize_user" className="btn btn-lg btn-block btn-success center-block">Log In</a>
          </div>
          <div className="col-xs-3 col-md-5">
          </div>
        </div>
      </div>
      );
  }
});

var LogOut = React.createClass({
  render: function() {
    return (
    <div className="logOut">
      <div className="row">
        <div className="col-xs-3 col-md-5">
        </div>
        <div className="col-xs-6 col-md-2 logOut">
          <a href="/logOut" className="btn btn-default center-block">Log Out</a>
        </div>
        <div className="col-xs-3 col-md-5"></div>
      </div>
    </div>
    );
  }
});


var Header = React.createClass({
  render: function() {
    return (
      <nav>
          <h1 className="text-center">What The Filter</h1>
      </nav>
      );
  }
});

var Twitter = React.createClass({
  render: function() {
    return(
      <div className="row trow">
        <div className="col-xs-2"></div>
        <div className="col-xs-8">
          <div className="btn btn-info btn-lg center-block" onClick={this.startTweet}>Twitter</div>
        </div>
        <div className="col-xs-2"></div>
      </div>
    );
  },
  startTweet: function() {
    window.open("/authorize_twitter", "", "width=600, height=200");
    var data = JSON.stringify({count: filteredCount});
    $.ajax({
      type: "POST",
      url: '/updateMessage',
      contentType: 'application/json',
      dataType: 'json',
      data: data,
      success: function() {
        console.log('great');
      }
    });
  }
});

var Facebook = React.createClass({
  logInFb: function() {
    FB.login(function(){
      postAPI("There are " + filteredCount + " photos in my Instagram feed using a filter! WhatTheFilter?!");
    },{scope: 'publish_actions'});
  },
  render: function() {
    return (
      <div className="row fbrow">
        <div className="col-xs-2"></div>
        <div className="col-xs-8">
          <div className="btn btn-primary btn-lg center-block" onClick={this.logInFb}>facebook</div>
        </div>
        <div className="col-xs-2"></div>
      </div>
    );
  }
});

var Message = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-2"></div>
        <div className="col-xs-8">
          <h4 className="text-center message-text">Message Posted</h4>
        </div>
        <div className="col-xs-2"></div>
      </div>
      );
  }
});

var SocialBox = React.createClass({
  render: function() {
    return(
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
                <h3 className="text-center">There are {this.props.filteredcount} photos in my Instagram feed using a filter, <em>WhatTheFilter?!</em></h3>
                <Twitter />
                <Facebook filteredcount={this.props.filteredcount} />
                <Message />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      );
  }
});


var Footer = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-bottom">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className=" share-btn navbar-toggle collapsed btn navbar-btn" data-toggle="modal" data-target="#myModal" aria-expanded="false" aria-label="share">
              <span className="glyphicon glyphicon-share" aria-hidden="true"></span>
            </button>
            <a className="navbar-brand">{this.props.filteredcount}/{this.props.totalcount} Photos Filtered</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <button type="button" className="share-btn btn navbar-btn navbar-right" data-toggle="modal" data-target="#myModal">
              <span className="glyphicon glyphicon-share" aria-hidden="true"></span>
              </button>
            </ul>
          </div>
        </div>
      </nav>
      );
  }
});

var PhotoFeed = React.createClass({

  loadPhotosFromServer: function() {
    $.ajax({
      type: "GET",
      url: requestUrl,
      dataType: 'json',
      success: function(response) {
        this.setState({response: response});
      }.bind(this),
      error: function() {}.bind(this)
    });
  },

  getInitialState: function() {
    return {response:[]};
  },

  componentDidMount: function() {
    this.loadPhotosFromServer();
  },

  loadMore: function() {
    this.loadPhotosFromServer();
  },

  render: function() {
    var responseLength = this.state.response.length;
    totalCount += responseLength;
    for(var i = 0; i < responseLength; i++) {
      if (i == responseLength - 3) {
        rows.push(
          <div className="photo">
            <Photo count={i} imagesrc={this.state.response[i].images.standard_resolution.url} filter={this.state.response[i].filter} />
            <Waypoint onEnter={this.loadMore} />
          </div>
          );
      }
      else {
        rows.push(
          <div className="photo">
          <Photo count={i} imagesrc={this.state.response[i].images.standard_resolution.url} filter={this.state.response[i].filter} />
          </div>
          );
      } 
      if(this.state.response[i].filter !== "Normal"){
        filteredCount += 1;
      }

    }
    return(
      <div className="photoFeed" >
          {rows}
          <Footer filteredcount={filteredCount} totalcount={totalCount} />
          <SocialBox filteredcount={filteredCount} totalcount={totalCount} />
      </div>

    );
  }
});

var Photo = React.createClass ({
    render: function() {
        return(
            <div className="photo">
                <img src={this.props.imagesrc} className="img-responsive center-block"/> 
                <h2 className="text-center"><span>{this.props.filter}</span></h2>
            </div>
            );
    }
});

//Global variables
var rows =[];
var filteredCount = 0;
var totalCount = 0;
var requestUrl = "/loadPhotoFeed";

var OverallStream = React.createClass({
  render: function() {
    return (
      <div className="overallStream">
        <Header />
        <LogOut />
        <PhotoFeed />
      </div>
      );
  }
});

//Backbone views
var overallStream = Backbone.View.extend({
  el: '#content',
  template: '<div class="photo-stream"></div>',
  render: function() {
    this.$el.html(this.template);
    React.render(<OverallStream />, this.$('.photo-stream').get(0));
    return this;
  }
});

var logIn = Backbone.View.extend({
  el: '#content',
  template: '<div class="login"></div>',
  render: function() {
    this.$el.html(this.template);
    React.render(<LogIn />, this.$('.login').get(0));
  }
});

new logIn().render();

var success = Backbone.View.extend({
  el: '#content',
  template: '<div class="success"></div>',
  render: function() {
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

  streamScreen: function() {
    console.log('streamScreen!');
    new overallStream().render();
  },

  success: function() {
    new success().render();
  }

});

var app_router = new Router;
Backbone.history.start();
