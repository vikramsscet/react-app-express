import React, {Component} from 'react';
import '../../css/main.css';
import {Content} from '../functional/Content';
import {Navigation} from '../functional/Navigation';
import {Footer} from '../functional/Footer';
const fetch = require("node-fetch");
class Main extends Component{
    constructor(){
        super();
        this.state = {};
    }
    componentDidMount() {
        let self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/api/state");
        xhr.responseType = 'json';

        xhr.onload = function() {
            console.log(xhr.response);
            self.setState(xhr.response);
        };

        xhr.onerror = function() {
            console.log("Booo");
        };

        xhr.send();    
    }
    render(){
        return(
            <div className="main">
                <div className="header">
                    <div className="navigationItems">
                        <Navigation navigation={this.state.navigation} />
                    </div>
                </div>
                <div className="body">
                    <div className="left">
                        <div className="navigationColumnItems">
                            <Navigation navigation={this.state.navigation} />
                        </div>
                    </div>
                    <div className="center">
                        <Content content={this.state.mainContent} />
                    </div>
                    <div className="right">Right</div>
                </div>
                <div className="footer">
                    <Footer footer={this.state.footer} />
                </div>
            </div>
        );
    }
}

export default Main;