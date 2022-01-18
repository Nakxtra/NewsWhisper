import React from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";


const News = (props)=>{

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    document.title = `${(props.category).charAt(0).toUpperCase() + (props.category).slice(1, (props.category).length)}-NewsWhisper`

    const updateNews = async()=> {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page}&pageSize=${props.mxNews}`
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let data_parsed = await data.json();
        props.setProgress(70);
        setArticles(data_parsed.articles);
        setTotalResults(data_parsed.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    // componentDidMount=()=> {
    // }

    // handlePreClick = async()=>{
    //     this.setState({page: --page});
    //     this.updateNews();
    // }

    // handleNextClick = async()=>{
    //     this.setState({page: ++page});
    //     this.updateNews();
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page+1}&pageSize=${props.mxNews}`
        let data = await fetch(url);
        let data_parsed = await data.json();
        setPage(page+1);
        setArticles(articles.concat(data_parsed.articles));
        setTotalResults(data_parsed.totalResults);
        setLoading(false);

    }

        return (
            <div>
                <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "2rem"}}>Top {(props.category).charAt(0).toUpperCase() + (props.category).slice(1, (props.category).length)} Headlines</h1>

                {loading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner />}
                    >
                <div className="container">
                <div className="row">
                        {/*!loading && */articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/newspaper-vector-icon-isolated-transparent-background-linear-outline-high-quality-transparency-concept-can-be-used-web-130122286.jpg"} newsUrl={element.url} author={element.author} publish={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                </div>
                </div>
                    </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.mxNews)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                </div> */}
            </div>
        );
}

News.defaultProps = {
    mxNews: 12,
    country: "in",
    category: 'general'
}
News.propTypes = {
    mxNews: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}
export default News;
