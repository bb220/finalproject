var LogIn = React.createClass({
  render: function() {
    return (
      <div className="logIn">
        <div className="row logIn">
          <div className="col-xs-4">
          </div>
          <div className="col-xs-2">
            <a href="http://localhost:3000/authorize_user" className="btn btn-default center-block">Log In</a>
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
      <div className="col-xs-4">
      </div>
      <div className="col-xs-2">
        <a href="http://localhost:3000/authorize_user" className="btn btn-default center-block">Log In</a>
      </div>
      <div className="col-xs-2 logOut">
            <a href="http://localhost:3000/logOut" className="btn btn-default center-block">Log Out</a>
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

var Footer = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-bottom">
        <div className="container-fluid">
          <p className="navbar-text navbar-left">statistic</p>
          <p className="navbar-text">Share</p>
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

/*var logIn = Backbone.View.extend({
  el: '#content',
  template: '<div class="login"></div>',
  render: function() {
    this.$el.html(this.template);
    React.render(<LogIn />, this.$('.login').get(0));
  }
}); */

//new logIn().render();
new overallStream().render();


