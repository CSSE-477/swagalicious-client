import React from 'react';
import ReactDOM from 'react-dom';

var http = require('http');

class DefaultPluginInterface extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write some content to post.',
            targetFile: 'test.txt'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
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
        this.sendPost(this.state.targetFile, this.state.value)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    sendPost(file, content) {
        this.setState((prevState) => ({
            clickTotal: prevState.clickTotal + 1
        }));

        var body = JSON.stringify({"destination":'/' + file, "body":content});

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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Content to Post:
                        <br/>
                        <textarea value={this.state.targetFile} onChange={this.handleFileChange} />
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