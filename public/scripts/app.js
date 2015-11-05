var LogIn = React.createClass({
  render: function() {
    return (
      <div className="logIn">
        <div className="row">
          <h1 className="text-center"> What The Filter?! </h1>
        </div>
        <div className="row">
          <div className="col-xs-3"></div>
          <div className="col-xs-6">
            <p className="lead">You must log in to your Instagram account in order to use <em>WTF</em>. We use it solely to retrieve your photos and display their filter data. We do not store any of the data or information related to your account.</p>
          </div>
          <div className="col-xs-3"></div>
        </div>
        <div className="row logIn">
          <div className="col-xs-3 col-md-5">
          </div>
          <div className="col-xs-6 col-md-2">
            <a href="http://localhost:3000/authorize_user" className="btn btn-lg btn-block btn-success center-block">Log In</a>
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
          <a href="http://localhost:3000/logOut" className="btn btn-default center-block">Log Out</a>
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
          <h1 className="text-center">What The Filter?!</h1>
      </nav>
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
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="col-xs-8">
                    <div className="btn btn-info btn-lg center-block">Twitter</div>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="col-xs-8">
                    <div className="btn btn-primary btn-lg center-block">facebook</div>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
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
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="">statistic</a>
          </div>
          <ul className="navbar-right">
          <button type="button" className="btn btn-default navbar-btn" data-toggle="modal" data-target="#myModal">Share</button>
          </ul>
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
    }
    return(
      <div className="photoFeed" >
          {rows}
      </div>
    );
  }
});

var Photo = React.createClass ({
    render: function() {
        return(
            <div className="photo">
                <img src={this.props.imagesrc} className="center-block"/> 
                <h2 className="text-center"><span>{this.props.filter}</span></h2>
            </div>
            );
    }
});

//Global variables
var rows =[];
var requestUrl = "http://localhost:3000/loadPhotoFeed";

var OverallStream = React.createClass({
  render: function() {
    return (
      <div className="overallStream">
        <Header />
        <LogOut />
        <PhotoFeed />
        <SocialBox />
        <Footer />
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

//Backbone router
var Router = Backbone.Router.extend({
  routes: {
    "stream": 'streamScreen'
  },

  streamScreen: function() {
    console.log('streamScreen!');
    new overallStream().render();
  }

});

var app_router = new Router;
Backbone.history.start();
