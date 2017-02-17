import React from 'react';
import ReactDOM from 'react-dom';

var http = require('http');
var appscss = require('./app.scss');

class DefaultPluginInterface extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write some content to post.',
            targetFile: 'test.txt',
            method: 'POST',
            contextPath: 'Default'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMethodChanged = this.handleMethodChanged.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleContextPathChange = this.handleContextPathChange.bind(this);
    }

    handleContextPathChange() {
        this.setState((prevState) => {
            if(prevState.contextPath === 'Default'){
                return {contextPath: 'User App'};
            }
            return {contextPath: 'Default'};
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleFileChange(event) {
        this.setState({targetFile: event.target.value});
    }

    handleSubmit(event) {
        alert('An change was submitted to file: ' + this.state.targetFile);
        event.preventDefault();
        if(this.state.method === "POST"){
            this.sendPost(this.state.targetFile, this.state.value);
        }
        else if(this.state.method === "PUT") {
            this.sendPut(this.state.targetFile, this.state.value);
        }
        else if(this.state.method === "DELETE") {
            this.sendDelete(this.state.targetFile, this.state.value);
        }
        else if(this.state.method === "GET") {
            this.sendGet(this.state.targetFile, this.state.value);
        }
    }

    handleMethodChanged(event) {
        this.setState({method: event.target.value});
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    getContextPath(file) {
        if(this.state.contextPath === 'User App') {
            var path = '/userapp/users/' + file;
            console.log(path);
            return path;
        }
        if(this.state.contextPath === 'Default') {
            var path = '/' + file;
            console.log(path);
            return path;
        }
    }

    sendPost(file, content) {

        var body = JSON.stringify({"destination":this.getContextPath(file), "body":content});

        var options = {
            host: 'localhost',
            port: '3000',
            path: "/post",
            rejectUnauthorized: false,
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "content-length": '' + body.length
            }
        };

        var request = http.request(options, (response) => {
            var str = '';
            response.on('data', (d) => {
                str += d;
            });
            response.on('end', () => {
                console.log(str);
            });
        });

        request.on('error', (e) => {
            console.error(e);
        });
        request.write(body);
        request.end();
    }

    sendPut(file, content) {

        var body = JSON.stringify({"destination":this.getContextPath(file), "body":content});

        var options = {
            host: 'localhost',
            port: '3000',
            path: "/put",
            rejectUnauthorized: false,
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "content-length": '' + body.length
            }
        };

        var request = http.request(options, (response) => {
            var str = '';
            response.on('data', (d) => {
                str += d;
            });
            response.on('end', () => {
                console.log(str);
            });
        });

        request.on('error', (e) => {
            console.error(e);
        });
        request.write(body);
        request.end();
    }

    sendDelete(file, content) {

        var body = JSON.stringify({"destination":this.getContextPath(file), "body":content});

        var options = {
            host: 'localhost',
            port: '3000',
            path: "/delete",
            rejectUnauthorized: false,
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "content-length": '' + body.length
            }
        };

        var request = http.request(options, (response) => {
            var str = '';
            response.on('data', (d) => {
                str += d;
            });
            response.on('end', () => {
                console.log(str);
            });
        });

        request.on('error', (e) => {
            console.error(e);
        });
        request.write(body);
        request.end();
    }

    sendGet(file, content) {

        console.log(file);
        var body = JSON.stringify({"destination":this.getContextPath(file), "body":content});

        var options = {
            host: 'localhost',
            port: '3000',
            path: "/get",
            rejectUnauthorized: false,
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "content-length": '' + body.length
            }
        };

        var request = http.request(options, (response) => {
            var str = '';
            response.on('data', (d) => {
                str += d;
            });
            response.on('end', () => {
                this.setState({value: str});
            });
        });

        request.on('error', (e) => {
            console.error(e);
        });
        request.write(body);
        request.end();
    }

    render() {
        return (
            <div>
                <li className="tg-list-item">
                    <input className="tgl tgl-flip" onChange={this.handleContextPathChange} id="cb5" type="checkbox"/>
                    <label className="tgl-btn" data-tg-off="Default" data-tg-on="User App" htmlFor="cb5"/>
                </li>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <input type="radio" name="post"
                           value="POST"
                           checked={this.state.method === "POST"}
                           onChange={this.handleMethodChanged} />Post<br/>
                    <input type="radio" name="put"
                           value="PUT"
                           checked={this.state.method === "PUT"}
                           onChange={this.handleMethodChanged} />Put<br/>
                    <input type="radio" name="delete"
                            value="DELETE"
                            checked={this.state.method === "DELETE"}
                            onChange={this.handleMethodChanged} />Delete<br/>
                    <input type="radio" name="get"
                           value="GET"
                           checked={this.state.method === "GET"}
                           onChange={this.handleMethodChanged} />Get<br/>
                    <label>
                        File to Affect:
                        <br/>
                        <textarea value={this.state.targetFile} onChange={this.handleFileChange} />
                    </label>
                    <br/>
                    <label>
                        Content to Affect:
                        <br/>
                        <textarea value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );

    }
}

ReactDOM.render(
    <DefaultPluginInterface initialClickTotal={0}/>,
    document.getElementById('root')
);