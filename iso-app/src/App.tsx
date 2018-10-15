/// <reference path="../../../pxt/built/pxtsim.d.ts" />


import * as React from 'react';
import './App.css';

class App extends React.Component {
    protected embedFrame: HTMLDivElement;
    protected driver: pxsim.SimulatorDriver;

    private setFrameRef = (div: HTMLDivElement) => this.embedFrame = div;

    public render() {
        return (
            <div className="App">
                <div id="simulator-embed" ref={this.setFrameRef}>
                </div>
            </div>
        );
    }

    public componentDidMount() {
        if (this.embedFrame) {
            this.driver = new pxsim.SimulatorDriver(this.embedFrame, {
                simUrl: "./simulator.html"
            });
              
            const binRequest = new XMLHttpRequest();
            const that = this;
            binRequest.addEventListener("load", function() {
                that.driver.run(this.responseText);
            });
            binRequest.open("GET", "./external/iso-binary.js");
            binRequest.send();
        }
    }
}

export default App;
