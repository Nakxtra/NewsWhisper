import React from 'react'

const NewsItem = (props)=> {
        let {title, description, imgUrl, newsUrl, author, publish, source} = props;
        return (
            <div>
                <div className="card my-3">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "50%"}}>{source}</span>
                    <img className="card-img-top" src={imgUrl} alt="error" style={{height: "10rem", overflowY: "hidden"}}/>
                    <div className="card-body">
                        <div style={{height: "15.5rem", overflowY: "hidden"}}>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text" style={{height: "7.8rem", overflowY: "hidden"}}>{description}...</p>

                        </div>
                        <p className="card-text" style={{marginBottom: "0rem"}}><small className="text-muted">{author?author:source}</small></p>
                        <p style={{color: "#6c757d"}}>{new Date(publish).toGMTString()}</p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
