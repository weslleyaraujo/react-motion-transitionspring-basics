import React, { Component } from 'react';
import { TransitionMotion } from 'react-motion';

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
        val: {
          width: 0,
          opacity: 0,
          scale: 1,
        }
      }
    });

    return obj;
  }

  getEnds = () => {
    let obj = {};
    this.state.items.forEach(key => {
      obj[key] = {
        val: {
          width: 100,
          opacity: 1,
          scale: 1,
        }
      }
    });

    return obj;
  }

  willLeave = () => {
    return {
      val: {
        width: 0,
        opacity: 0,
        scale: 100,
      }
    }
  }

  willEnter = () => {
    return {
      val: {
        width: 0,
        opacity: 0,
        scale: 1,
      }
    }
  }

  render = () => {
    return (
        <div>
          <div>
            Click to add itens
            <button onClick={this.handleAdd}>add</button>
            <hr />
          </div>
          <div>
          <TransitionMotion
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            defaultStyles={this.getDefaults()}
            styles={this.getEnds()}>
            {current =>
              <div className="c-blocks">
              {
                Object.keys(current).map(key => {
                  let {width, opacity, scale} = current[key].val;
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
          </div>
        </div>
    );
  }
}
