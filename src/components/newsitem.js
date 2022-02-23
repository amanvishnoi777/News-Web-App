import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

/**
 *
 */
class newsitem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let {title, description, imageUrl, newsURL} = this.props;
    return (
        <div className="card" style={{}}>
          <img src={imageUrl?imageUrl:"https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA="} className="card-img-top" alt="#"/>
          <div className="card-body">
            <h5 className="card-title" style={{textAlign:"justify", textJustify:"inter-word"}}>{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <a href={newsURL} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
            <div className="card-footer">
              <small className="text-muted">By {this.props.author?this.props.author:"Anonymous"} on {(new Date(this.props.date).toGMTString())}</small>
            </div>
          </div>
        </div>
    );
  }
}

newsitem.propTypes = propTypes;
newsitem.defaultProps = defaultProps;
// #endregion

export default newsitem;
