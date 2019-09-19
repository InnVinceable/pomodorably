import React from 'react';
import Logo from './Components/logo';
import Timer from './Components/timer';
import Option from './Components/option';
import Button from './Components/button';
import Cog from './Components/cog';
import { setTimeout } from 'timers';

const ipcRenderer = window.require('electron').ipcRenderer;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            breakTime: 250,
            workTime: 1500,
            seconds: 1500,
            timerId: false,
            active: 'workTime',
            prevActive: 'workTime'
        }

        this.playStop = this.playStop.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.closeWindow = this.closeWindow.bind(this);

        ipcRenderer.on('main-response', (event, arg) => {
            if (arg) {
                arg.forEach(event => {
                    switch (event) {
                        case 'TOGGLE':
                            this.playStop();
                            break;
                        case 'PAUSE':
                            break;
                    }
                });
            }
            setTimeout(() => ipcRenderer.send('main-ping', this.state.timerId),100);
        
        })
        ipcRenderer.send('main-ping', this.state.timerId);
    }

    updateTime() {
        this.setState(function (prevState, props) {
            const currentState = Object.assign(prevState);
            const stillActive = (prevState.seconds - 1) > 0;
            const nextTimer = prevState.active === 'workTime' ? 'breakTime' : 'workTime'
            
            currentState.seconds = stillActive ? currentState.seconds - 1 : currentState[nextTimer];
            currentState.active = stillActive ? currentState.active : nextTimer;
            
            console.log(currentState.active, ' ', prevState.active);
            if (currentState.active != this.state.prevActive) {
                if (currentState.active === 'breakTime') {
                    this.setState({prevActive: 'breakTime'});
                    ipcRenderer.send('main-break-notification');
                } else {
                    this.setState({prevActive: 'workTime'});
                    ipcRenderer.send('main-work-notification');
                }
            }

            if (this.timerID) {
                currentState.timerId = this.timerID;
            }
            return currentState;
        });
    }

    closeWindow() {
        window.close();
    }

    playStop() {
        if (this.state.timerId) {
            clearInterval(this.state.timerId);
            return this.setState({
                seconds: this.state.workTime,
                timerId: false,
                active: 'workTime'
            });
        }

        this.timerID = setInterval(() => this.updateTime(), 1000)
    }

    updateLength(timer, e) {
        if (this.state.timerId) {
            return false;
        }

        const state = Object.assign({}, this.state);
        state[timer] = e.target.value * 60;
        state.seconds = timer === 'workTime' ? e.target.value * 60 : state.seconds
        this.setState(state);
    }
    render() {
        const buttonString = this.state.timerId ? 'Stop' : 'Start';
        return (
            <div>
                <div className="top-bar">
                    <button className="top-bar-btn"><div className="cog-wrapper"><Cog width="15px" height="15px" /></div></button>
                    <button onClick={this.closeWindow} className="top-bar-btn">x</button>
                </div>
                <div className="app">
                    <Logo />
                    <Timer active={this.state.active} seconds={this.state.seconds} />
                    <Button action={this.playStop}>{buttonString}</Button>
                    <Option value={this.state.workTime} timer="workTime" updateLength={this.updateLength.bind(this)}>Work</Option>
                    <Option value={this.state.breakTime} timer="breakTime" updateLength={this.updateLength.bind(this)}>Break</Option>
                </div>
            </div>

        )
    }
}

export default App;
