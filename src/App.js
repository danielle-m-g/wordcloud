import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {wordFrequency:[]};
  }
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  getWordFrequency = (text) => {
    const stopWords = new Set(["the", "and", "a", "an", "in", "on", "at", "for", "with", "about", "as", "by", "to", "of", "from", "that", "which", "who", "whom", "this", "these", "those", "it", "its", "they", "their", "them", "we", "our", "ours", "you", "your", "yours", "he", "him", "his", "she", "her", "hers", "it", "its", "we", "us", "our", "ours", "they", "them", "theirs", "I", "me", "my", "myself", "you", "your", "yourself", "yourselves", "was", "were", "is", "am", "are", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "as", "if", "each", "how", "which", "who", "whom", "what", "this", "these", "those", "that", "with", "without", "through", "over", "under", "above", "below", "between", "among", "during", "before", "after", "until", "while", "of", "for", "on", "off", "out", "in", "into", "by", "about", "against", "with", "amongst", "throughout", "despite", "towards", "upon", "isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", "hadn't", "doesn't", "didn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", "shouldn't", "mustn't", "needn't", "daren't", "hasn't", "haven't", "hadn't"]);
    const words = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=_`~()]/g, "").replace(/\s{2,}/g, " ").split(" ");
    const filteredWords = words.filter(word => !stopWords.has(word));
    return Object.entries(filteredWords.reduce((freq, word) => {
      freq[word] = (freq[word] || 0) + 1;
      return freq;
    }, {}));
  }


  renderChart() {
    const data = this.state.wordFrequency.sort((a,b)=>b[1]-a[1]).slice(0,5)
    console.log(data)
    //your code here
    const svg = d3.select(".svg_parent");
    const width = 1000;
    const height = 400;
    const maxFont = 100;
    const minFont = 20;
    if (!svg.attr("width")) {
      svg.attr("width", width)
         .attr("height", height);
    }
 
    const fontSizeScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[1]) || 1])
      .range([minFont, maxFont]);
    let positions = [];
    let totWidth = 0;
    data.forEach((d, i) => {
      const fontSize = fontSizeScale(d[1]);
      const wrdWidth = d[0].length * fontSize * 0.5;
      const padding = fontSize * 0.75;
      totWidth += wrdWidth + padding;
    });
    //margins are important
    if (totWidth > width * 0.9) {
      const scaleFact = (width * 0.9) / totWidth;
      fontSizeScale.range([minFont * scaleFact, maxFont * scaleFact]);
    }
    let currX = width * 0.05;
    data.forEach((d, i) => {
      const fontSize = fontSizeScale(d[1]);
      const wrdWidth = d[0].length * fontSize * 0.5;
      const padding = i > 0 ? fontSize * 0.75 : 0;
      currX += padding;
      positions.push({
        x: currX + (wrdWidth / 2),
        y: height / 2,
        fontSize: fontSize,
        width: wrdWidth
      });
      currX += wrdWidth;
    });
    const words = svg.selectAll(".word")
      .data(data, d => d[0]);
    words.enter()
      .append("text")
      .attr("class", "word")
      .attr("text-anchor", "middle")
      .text(d => d[0])
      .attr("x", (d, i) => positions[i].x)
      .attr("y", height / 2)
      .attr("font-size", "0px")
      .transition()
      .duration(1000)
      .attr("font-size", (d, i) => `${positions[i].fontSize}px`);
    words.transition()
      .duration(1000)
      .attr("x", (d, i) => positions[i].x)
      .attr("font-size", (d, i) => `${positions[i].fontSize}px`);
    words.exit()
      .transition()
      .duration(1000)
      .attr("font-size", "0px")
      .remove();
}

  render() {
    return (
      <div className="parent">
        <div className="child1" style={{width: 1000 }}>
        <textarea type="text" id="input_field" style={{ height: 150, width: 1000 }}/>
          <button type="submit" value="Generate Matrix" style={{ marginTop: 10, height: 40, width: 1000 }} onClick={() => {
                var input_data = document.getElementById("input_field").value
                this.setState({wordFrequency:this.getWordFrequency(input_data)})
              }}
            > Generate WordCloud</button>
        </div>
        <div className="child2"><svg className="svg_parent"></svg></div>
      </div>
    );
  }
}

export default App;