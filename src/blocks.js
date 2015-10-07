import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';

export default class Blocks extends Component {
  constructor (props) {
    super(props);
  }

  state = {
    items: [0, 1, 2, 3],
    currentCount: 3
  }

  handleAdd = () => {
    let items = this.state.items;
    let currentCount = this.state.currentCount + 1;
    items.push(currentCount);
    this.setState({items, currentCount});
  }

  handleRemove = (key) => {
    let items = this.state.items;
    let keyIndex = items.indexOf(+key);

    if(keyIndex !== -1) {
      items.splice(keyIndex, 1);
      this.setState({items});
    }
  }

  getDefaults = () => {
    let obj = {};
    this.state.items.forEach(key => {
      obj[key] = {
        width: '200px',
        opacity: spring(1),
        scale: spring(1),
      }
    });

    return obj;
  }

  willEnter = () => {
    return {
      width: '200px',
      opacity: spring(0),
      scale: spring(0),
    }
  }
  
  willLeave = () => {
    return {
      width: '200px',
      opacity: spring(0),
      scale: spring(0)
    }
  }

  render = () => {
    return (
        <div>
          <h2>Quick example of React Motion</h2>
          <p>Removing and adding itens with TransitionMotion</p>
          <div>
            Click to add itens
            <button onClick={this.handleAdd}>add</button>
            <hr />
          </div>
          <div>
          <TransitionMotion
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            styles={this.getDefaults()}>
            {current =>
              <div className="c-blocks">
              {
                Object.keys(current).map(key => {
                  let {width, opacity, scale} = current[key];
                  let style = {
                    width,
                    opacity,
                    transform: `scale(${scale})`
                  }

                  return (
                    <div
                      style={style}
                      key={key}
                      onClick={this.handleRemove.bind(this, key)}
                      className="c-blocks__item">
                      {key}
                    </div>
                  )
                })
              }
              </div>
            }

          </TransitionMotion>
          <hr />
          <p>* Click on any item ro remove it</p>
          <a href="">Check the code!</a>
          </div>
        </div>
    );
  }
}
