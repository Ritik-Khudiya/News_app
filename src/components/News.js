import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Rotate from './Rotate';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps={
    country:'in',
    category:"general",
    pageSize:5
  }
  static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
  } 
      constructor(props){
        super(props);
         this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        } 
        document.title=`${this.props.category.slice(0,1).toUpperCase()+this.props.category.slice(1)}-News`;
      }
    
     async componentDidMount()
      {
        this.props.setProgress(0);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7426fbfa56004e50ae4c75ebea2d2c09&page=1&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        this.setState({articles:parseData.articles,
          totalResults:parseData.totalResults, 
          loading:false});
          this.props.setProgress(100);
          
      }
      
//  handlePreClick=async ()=>{

//   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7426fbfa56004e50ae4c75ebea2d2c09&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
//   this.setState({loading:true});
//   let data=await fetch(url);
//   let parseData=await data.json();
//   console.log(parseData);
//   this.setState({
//     page:this.state.page-1,
//     articles:parseData.articles,
//     loading:false
//   })

       
//  }
//  handleNextClick=async ()=>{
  
//   if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
//   {
//   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7426fbfa56004e50ae4c75ebea2d2c09&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
//   this.setState({loading:true});
//   let data=await fetch(url);
//   let parseData=await data.json();
//   console.log(parseData);
  
//   this.setState({
//     page: this.state.page+1,
//     articles:parseData.articles,
//     loading:false,
    
//   })
  
// }

//  }
 fetchMoreData = async() => {
  this.setState({page:this.state.page+1});
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7426fbfa56004e50ae4c75ebea2d2c09&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
        // this.setState({loading:true});
        let data=await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        this.setState({articles:this.state.articles.concat(parseData.articles),
          totalResults:parseData.totalResults, 
          // loading:false
        });
};
render() {
    return (
     <>
        <h1 className='text-center' style={{margin:'40px 0px'}}>News App- Top Headlines on {this.props.category.slice(0,1).toUpperCase()+this.props.category.slice(1)}</h1>
        {this.state.loading && <Rotate/>} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Rotate/>}
        >
        <div className="container">
        <div className="row">
        { this.state.articles.map((element)=>{
            return   <div className="col-md-4 my-3">
                  <Newsitem key={element.url} title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} 
                  author={element.author} date={element.publishedAt} source={element.source.name}/>
                 </div>

        })}
        </div> 
        </div>
        </InfiniteScroll>
        </>
      
    )
  }
}

export default News