import React, { Component } from 'react'
import axios from 'axios'

export default class LatestPhoto extends Component {


    state = { 

        photos:[],
        page: 1,
        loading: true,
        search_query: '',
        searching: false
    }






    componentDidMount() { 
        axios.get('https://api.unsplash.com/photos/?client_id=ZGbrLpEltjgkOTtMeh3wgCKqRo-vdVOMBYT_RGJsvAM&per_page=15&page='+this.state.page)
        .then( 
            res => this.setState({ 
                photos: res.data ,
                page : this.state.page + 1 ,
                loading: false,
            })
        )
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

    }  


    loadNextPage = (e) => { 
        axios.get('https://api.unsplash.com/photos/?client_id=ZGbrLpEltjgkOTtMeh3wgCKqRo-vdVOMBYT_RGJsvAM&per_page=15&page='+this.state.page)
        .then( 
            res => this.setState({ 
                photos: res.data ,
                page : this.state.page + 1 ,
                loading: false,
            })
        ) 
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    searchQuery = (e) =>{  
        this.setState({ 
            search_query:e.target.value
        })

    }

    searchTrigger = (e) =>{   
        this.setState({ loading:true })
        axios.get('https://api.unsplash.com/search/photos/?client_id=ZGbrLpEltjgkOTtMeh3wgCKqRo-vdVOMBYT_RGJsvAM&per_page=15&query=' + this.state.search_query +'&page='+this.state.page)
        .then( 
            res => this.setState({ 
                photos: res.data.results ,
                page : 2,
                loading: false,
                searching: true,
                total_found: res.data.total,
                total_found_pages: res.data.total_pages
            })
        ) 
        e.preventDefault();

    }

    loadSearchNextPage = (e) => { 
        axios.get('https://api.unsplash.com/search/photos/?client_id=ZGbrLpEltjgkOTtMeh3wgCKqRo-vdVOMBYT_RGJsvAM&per_page=15&query=' + this.state.search_query +'&page='+this.state.page)
        .then( 
            res => this.setState({ 
                photos: res.data.results ,
                page : this.state.page + 1 ,
                loading: false,
                searching: true,
                total_found: res.data.total,
                total_found_pages: res.data.total_pages
            })
        ) 
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
        
    render() {
        var searchHeadin = '';
        var searchBtnMarkup = '';
        var searchinfo = '';

        if (this.state.searching === true){ 
            searchHeadin = <h4>You searched with <i>{this.state.search_query}</i></h4>
            searchBtnMarkup = <button className="btn btn-warning btn-sm btn-block font-weight-bold" onClick={this.loadSearchNextPage}>Load Page {this.state.page}</button>
            searchinfo = <span> total page {this.state.total_found} | page {this.state.page-1} of {this.state.total_found_pages}</span>
        }
        else{ 
            searchHeadin = <h4>Latest Photo</h4>
            searchBtnMarkup = <button className="btn btn-warning btn-sm btn-block font-weight-bold" onClick={this.loadNextPage}>Load Page {this.state.page}</button>
            searchinfo=''
        }



        if(this.state.loading === true) {
            return (
                <div className="col text-center font-weight-bold">Loading</div>
            )
        } 

         return( 
             <React.Fragment>

                   	<div className="row top-text"> 
                     <div className="col col-auto my-auto"> {searchHeadin} {searchinfo}</div>
                        <div className="col  my-auto text-right"> 
                        <form onSubmit={this.searchTrigger} action=""> 
                            <input type="text" value={this.state.search_query}  onChange={this.searchQuery}  placeholder="type your keyword"/>
                            <input type="submit"  value="search"/>
                        </form>
                        </div>
                    </div>



                 <div className="row">
                 { 
                 
                 this.state.photos.map((photo) => ( 
                     <div key={photo.id} className="col-md-4"> 
                         <div className="single-photo-item">
                             <a href={'photo?id=' + photo.id }  className="d-block">
                                 <div className="photo-wrapper"> 
                                    <img src={ photo.urls.small}  alt="" />
                                 </div>
                             <h5>{photo.title}</h5>
                             <p className="cat-name">{photo.user.name}</p>
                             </a>
                         </div>
                     </div>
         
                 ))
          
                 }

                </div>


                 <div className="col-lg-6 text-center">
                    <div className="load-more-btn">{searchBtnMarkup}</div>
                </div>

             </React.Fragment>  



         )

    }

}


