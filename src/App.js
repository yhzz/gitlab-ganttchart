import React, { Component } from 'react';
import Chart from "react-google-charts";
import axios from 'axios';

const format = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'string', label: 'Resource' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
]

class App extends Component {
  constructor() {
    super();
    this.state = {
      issues: null,
    };
  }

  componentDidMount() {
  }

  getGitlabIssues = async (private_token) => {
    const url = 'https://gitlab.com/api/v4/issues?private_token=' + private_token;
    let res = await axios.get(url).then((res) => {
      let issues = [
        format,
      ]
      res.data.map((info) => {
        let issue = [
          info.id,
          info.title,
          'spring',
          new Date(info.created_at),
          new Date(2021, 5, 20),
          null,
          100,
          null,
        ]
        issues.push(issue);
      });
      this.setState({ issues });
    });
  };

  async onChange(e) {
    console.log(e.target.value);
    this.getGitlabIssues(e.target.value);
  }
  
  render() {
    return (
      <div>
        set private access token
        <textarea
          onChange={(e) =>
            this.onChange(e)
          }
        />
        <Chart
          width={'100%'}
          chartType="Gantt"
          loader={<div>Loading Chart</div>}
          data={this.state.issues}
          options={{
            height: 800,
            gantt: {
              trackHeight: 30,
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    );
  }

}

export default App;
