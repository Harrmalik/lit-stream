import React from 'react'
import _ from 'lodash'

var Results = React.createClass({
    render() {
        let data = this.props.data[0]
        if (!data) {
            return (
                <div></div>
            )
        } else {
            return (
                <div className="ui items">
                    {_.map(data, function(result) {
                        return (
                            <Result
                                key={result.id}
                                result={result}></Result>
                        )
                    })}
                </div>
            )
        }
    }
});

var Result = React.createClass({
    render() {
        return (
            <div className="item">
              <div className="content">
                <a className="header">{this.props.result.title}</a>
                <div className="meta">
                  <span><a href={`https://www.youtube.com/watch?v=${this.props.result.id}`} target='_blank'>{this.props.result.title}</a></span>
                </div>
                <div className="description">
                  {this.props.result.title}
                </div>
                <div className="ui divider"></div>
              </div>
            </div>
        )
    }
})

export default Results;
