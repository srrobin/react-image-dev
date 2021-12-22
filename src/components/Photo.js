import React, { Component } from 'react'
import axios from 'axios'

export default class Photo extends Component {

    state = {
        photo: [],
        loading: true,
    }


    componentDidMount() { 


        let search = window.location.search;
        let params = new URLSearchParams(search);
        let photo_id = params.get('id');


        axios.get('https://api.unsplash.com/photos/' + photo_id +'/?client_id=ZGbrLpEltjgkOTtMeh3wgCKqRo-vdVOMBYT_RGJsvAM ')
        .then( 
            res => this.setState({ 
                photo: res.data ,
                page : this.state.page + 1 ,
                loading: false,
            })
        )
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

    }  
    render() {
        console.log(this.state.photo)
        var photo = this.state.photo
        return (
            <div>
                {photo.description ? <h4>  {photo.description}</h4>   : '' }

                <div className="photo-single-wrapper"> 
                   <div className="photo-single-info"> 
                        {photo.alt_description ? <p>  {photo.alt_description}</p>   : '' }
                                    
                         <ul>
                             <li> <label htmlFor="uploded_by">Uploded By</label>  {photo.user && photo.user.name} </li>
                             { photo.updated_at ? <li> <label htmlFor="uploded_date">Uploded Date</label>  { photo.updated_at}</li>   :'' } 
                             
                            <li> <label htmlFor="camera_model">Camera Model </label>  {photo.exif && photo.exif.model}</li>
                         </ul>
                         <a className="d-btn" target="_blank" href={photo.links && photo.links.download}> Download </a>
                   </div>
                    <div className="photo-img-n"><img src={ photo.urls && photo.urls.full } alt=""/></div> 
                </div>
            </div>
        )
    }
}

