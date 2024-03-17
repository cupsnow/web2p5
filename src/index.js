import React from 'react';
import ReactDOM from 'react-dom';
import ShowTime from './showtime.js';
// import './index.css';

async function getComponentAsync() {
    const element = document.createElement('div');
    const { default: _ } = await import('lodash');    
    element.innerHTML = _.join(['lodash', 'loaded'], ' ');
    return element;
}

async function launchAsync() {
    getComponentAsync().then((component) => {
        document.body.appendChild(component);
    
        const app = document.createElement('div');
        document.body.appendChild(app);
    
        const title = 'React with Webpack and Babel2';
    
        ReactDOM.render((<div>
            <ShowTime/>
        </div>), app);
    });
}

if ("isCordovaApp" in window && window.isCordovaApp) {
    console.log("isCordovaApp")
    document.addEventListener('deviceready', () => {
        console.log('deviceready');
        launchAsync();
      }, false);
} else {
    console.log("browser run")
    launchAsync();
}