import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../../css/main.css';
import {Content} from '../functional/Content';
import {Navigation} from '../functional/Navigation';
import {Footer} from '../functional/Footer';
import {AddNavigation} from "../functional/subComponents/AddNavigation";
import {RemoveNavigation} from "../functional/subComponents/RemoveNavigation";
import AddContent from './AddContent';
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
            
            self.setState(xhr.response);
        };

        xhr.onerror = function() {
            console.log("Booo");
        };

        xhr.send();    
    }
    render(){
        let content=this.state.mainContent;
        return(
            <Router>
            <div className="main">
                <div className="header">
                    <div className="navigationItems">
                        <Navigation navigation={this.state.navigation} />
                    </div>
                </div>
                <div className="body">
                    {/* <div className="left">
                        <div className="navigationColumnItems">
                            <Navigation navigation={this.state.navigation} />
                        </div>
                    </div> */}
                    <div className="center">
                        
                        <Route exact 
                            path="/"
                            render={() => (
                                <Content content={content} />
                              )}  
                        />
                        <Route path="/addNavigation" component={AddNavigation} />
                        <Route path="/removeNavigation" component={RemoveNavigation} />
                        <Route path="/addContent" component={AddContent} />
                    </div>
                    {/* <div className="right">Right</div> */}
                </div>
                <div className="footer">
                    <Footer footer={this.state.footer} />
                </div>
            </div>
            
            

            </Router>
        );
    }
}

export default Main;