import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">  			
                            <div className="footermenu">
                                <ul>
                                    <li><a href="/">facebook</a></li>
                                    <li><a href="/">Twitter</a></li>
                                    <li><a href="/">Youtube</a></li>
                                    <li><a href="/">Linkedin</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        )
    }
}
