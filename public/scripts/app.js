var UserOptions = React.createClass({
  render: function() {
    return (
      <div className="userOptions">
        <div className="row logIn">
          <div className="col-xs-4">
          </div>
          <div className="col-xs-2">
            <a href="http://localhost:3000/authorize_user" className="btn btn-default center-block">Log In</a>
          </div>
          <div className="col-xs-2 logOut">
            <a href="http://localhost:3000/logOut" className="btn btn-default center-block">Log Out</a>
          </div>
          <div className="col-xs-4">
          </div>
          
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
          <div className="photoContainer">
            <PhotoContainer count={i} imagesrc={this.state.response[i].images.standard_resolution.url} filter={this.state.response[i].filter} />
            <Waypoint onEnter={this.loadMore} />
          </div>
          );
      }
      else {
        rows.push(
          <div className="photoContainer">
          <PhotoContainer count={i} imagesrc={this.state.response[i].images.standard_resolution.url} filter={this.state.response[i].filter} />
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



var PhotoContainer = React.createClass ({
    render: function() {
        return(
            <div className="photoContainer">
                <FilterLabel filter={this.props.filter} />
                <Photo imagesrc={this.props.imagesrc} />
            </div>
            );
    }
});

var Photo = React.createClass ({
    render: function() {
        return(
            <div className="photo">
                <img src={this.props.imagesrc} className="center-block"/> 
            </div>
            );
    }
});

var FilterLabel = React.createClass({
    render: function() {
        return(
            <div className="filterLabel">
                <h2 className="text-center">{this.props.filter}</h2>
            </div>
            );
    }
}); 

//Global variables
var rows =[];
var requestUrl = "http://localhost:3000/loadPhotoFeed";

var OverallView = React.createClass({
  render: function() {
    return (
      <div className="overallView">
        <Header />
        <UserOptions />
        <PhotoFeed />
      </div>
      );
  }
});

React.render(
  <OverallView  />,
  document.getElementById('content')
);