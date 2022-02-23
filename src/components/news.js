import React from "react";
import PropTypes from "prop-types";
import NewsItem from "./newsitem.js";
import Spinner from "./spinner.js";
import InfiniteScroll from "react-infinite-scroll-component";


const propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.string,
  category:PropTypes.string,
};

const defaultProps = {
  country:'in',
  pageSize:"9",
  category:'general'
};

class news extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        articles:[],
        page:1,
        totalArticles:0,
        loading:true,
        totalResults: 0 
    };
    document.title = `${props.category} - NewsMonkey`;
  }

  async updateNews(page){
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7bcda2a4c76d46d7b271493963348f00&pageSize=${this.props.pageSize}&page=${page}`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles:parsedData.articles
      , totalArticles:parsedData.totalArticles
      , totalResults: parsedData.totalResults});
    this.props.setProgress(100);
    }

  async componentDidMount(){
    this.setState({loading:true});
    this.updateNews(this.state.page)
  }

  handlePrevClick = async ()=>{
    this.setState({loading:true, page: this.state.page -1})
    this.updateNews(this.state.page-1);
  }
  handleNextClick = async ()=>{
    this.setState({loading:true, page:this.state.page + 1});
    this.updateNews(this.state.page+1);
  }

  fetchMoreData = async () => {
   this.setState({page:this.state.page + 1});
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7bcda2a4c76d46d7b271493963348f00&pageSize=${this.props.pageSize}&page=${this.state.page}`
   let data = await fetch(url);
   let parsedData = await data.json();
   this.setState({articles:this.state.articles.concat(parsedData.articles)
     , loading:false
     , totalArticles:parsedData.totalArticles
     , totalResults: parsedData.totalResults}); 
   };


  render() {
    return (
      <div className="container my-3">

        <h1 className="mb-4 text-center" style={{marginTop:"100px"}}>Top {this.props.category} Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length != this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">
        {this.state.articles.map((element) => {
            return <div className="col-md-4 my-4" key = {element.url}>
            <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 100):""} imageUrl={element.urlToImage}
                newsURL={element.url} author={element.author} date={element.publishedAt}/>
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-primary mx-4" onClick={this.handlePrevClick}>	&#8592; Previous</button>
        <button disabled={((this.state.page + 1) > Math.ceil(this.state.totalArticles/this.props.pageSize)) ? true:false} type="button" className="btn btn-primary mx-4" onClick={this.handleNextClick}> Next &#8594;	</button>
        </div> */}
      </div>
    );
  }
}

news.propTypes = propTypes;
news.defaultProps = defaultProps;
// #endregion

export default news;
