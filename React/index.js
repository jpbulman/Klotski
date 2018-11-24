import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PuzzlePiece extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      og: rcToName(this.props.name,this.props.document),
      value: rcToName(this.props.name,this.props.document),
      isSelected: false,
    };
  } 

  render() {
    return (
      <button className={this.state.value} 
      onClick = {() => this.setState({value: this.state.isSelected ? this.state.og:this.state.value+"Selected", isSelected: !this.state.isSelected})} />
    );
  }
}

function rcToName(i,j){
    if(i=='2' && j=='2'){
      return 'twoByTwo';
    }
    else if(i == '1' && j == '2'){
      return 'oneByTwo';
    }
    else if(i == '2' && j == '1'){
      return 'twoByOne';
    }
    else {
      return 'oneByOne';
    }
}

class Game extends React.Component {
    render() {
      return (
        <div align="right">

          <div align="center">
            <div><PuzzlePiece name="2" document="1"/></div>
            <div><PuzzlePiece name="2" document="2"/></div>
            <div><PuzzlePiece name="2" document="1"/></div>
          </div>
          <div><PuzzlePiece name="2" document="1"/></div>

          <div align="right">
            <div align="middle">
              <button >^</button>
              <div>
                <button class="left">^</button>
                <button class="down">^</button>
                <button class="right">^</button>
              </div>
            </div>
          </div>

        </div>
      );
    }
  }

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);