import React from 'react'
import ReactHowler from 'react-howler'
import Button from './Button'
import raf from 'raf'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import {BiReset} from "react-icons/bi";

class Player extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      playing: false,
      preload: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0,
      seek: 0,
      rate: 1,
      isSeeking: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleOnEnd = this.handleOnEnd.bind(this)
    this.handleOnPlay = this.handleOnPlay.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.renderSeekPos = this.renderSeekPos.bind(this)
    this.handleLoopToggle = this.handleLoopToggle.bind(this)
    this.handleMuteToggle = this.handleMuteToggle.bind(this)
    this.handleMouseDownSeek = this.handleMouseDownSeek.bind(this)
    this.handleMouseUpSeek = this.handleMouseUpSeek.bind(this)
    this.handleSeekingChange = this.handleSeekingChange.bind(this)
    this.handleRate = this.handleRate.bind(this)
    this.resetRecording = this.resetRecording.bind(this)
  }
  componentWillUnmount () {
    this.clearRAF()
  }

  handleToggle () {
    this.setState({
      playing: !this.state.playing
    })
  }

  resetRecording () {
    this.setState({
      playing: false
    })
    this.player.seek(this.props.startTime)
    this.renderSeekPos()
  }

  handleOnLoad () {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    })
    this.player.seek(this.props.startTime)
  }

  handleOnPlay () {
    this.setState({
      playing: true
    })
    this.renderSeekPos()
  }

  handleOnEnd () {
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleStop () {
    this.player.stop()
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    })
    this.renderSeekPos()
  }

  handleLoopToggle () {
    this.setState({
      loop: !this.state.loop
    })
  }

  handleMuteToggle () {
    this.setState({
      mute: !this.state.mute
    })
  }

  handleMouseDownSeek () {
    this.setState({
      playing: false,
      isSeeking: true
    })
  }

  handleMouseUpSeek (e) {
    this.setState({
      isSeeking: false
    })

    this.player.seek(e.target.value)
  }

  handleSeekingChange (e) {
    this.setState({
      seek: parseFloat(e.target.value)
    })
  }

  renderSeekPos () {
    if (!this.state.isSeeking) {
      this.setState({
        seek: this.player.seek()
      })
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  handleRate (e) {
    const rate = parseFloat(e.target.value)
    this.player.rate(rate)
    this.setState({ rate })
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  render () {
    return (
      <div className='full-control'>
        <ReactHowler
          src={[this.props.recording]}
          preload={this.state.preload}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          mute={this.state.mute}
          volume={this.state.volume}
          seek={this.state.seek}
          rate={this.state.rate}
          ref={(ref) => (this.player = ref)}
        />

        {this.state.loaded &&
        <div>
          <Button onClick={this.handleToggle}>
            {(this.state.playing) ? <FaPause /> : <FaPlay />}
          </Button>
          <Button onClick={this.resetRecording}>
            <BiReset/>
          </Button>
        </div>
        }

        {!this.state.loaded &&
        <Button onClick={this.handleToggle}>
          {(this.state.playing) ? <BiLoader /> : <FaPlay />}
        </Button>
        }

        {this.state.loaded &&
        <p className="timeline">
          {new Date(this.state.seek.toFixed(0) * 1000).toISOString().substr(11, 8)}
          {' / '}
          {(this.state.duration) ? new Date(this.state.duration.toFixed(0) * 1000).toISOString().substr(11, 8) : 'NaN'}
        </p>
        }

        <div className='seek'>
          <span className='slider-container'>
            <input
              type='range'
              min='0'
              max={this.state.duration ? this.state.duration.toFixed(2) : 0}
              step='.01'
              value={this.state.seek}
              onChange={this.handleSeekingChange}
              onMouseDown={this.handleMouseDownSeek}
              onMouseUp={this.handleMouseUpSeek}
            />
          </span>
        </div>
      </div>
    )
  }
}

export default Player
