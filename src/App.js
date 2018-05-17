import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CanvasPanel from './components/CanvasPanel'
import LensIcon from 'material-ui/svg-icons/image/lens';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { setImage } from '../src/redux/actions/index';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import {Step, 
  Slider,
  IconButton,
  FlatButton
}from '../node_modules/material-ui';
import './style/App.css';
import { __esModule } from 'recompose/pure';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {stepIndex: 0}; 
  }

  componentDidUpdate(e){
    console.log(e);
    if(this.state.stepIndex == 0 && this.props.image==true) this.handleNext();
  }
  
  handleNext = () => {
    const {stepIndex} = this.state;
    if(stepIndex == 3) {
      this.setState({stepIndex: 0});
      this.props.dispatch(setImage(false));
      return false;
    }
    if(stepIndex == 0 && this.props.image==false)return alert("Please upload an image");
    this.setState({
      stepIndex: stepIndex + 1,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if(stepIndex == 1) this.props.dispatch(setImage(false));
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };


  render() {
    const { stepIndex} = this.state;
    const contentStyle = {margin: '0 16px 64px 16px'};
      
    var downloadImg = () =>{
      console.log("download", this.state.canvasUrl);
    }
    const bottomBarDesktop = 
      <BottomNavigation style={{position: "fixed", width: "100vw",justifyContent:"space-between", left:0, bottom: 0, zIndex:10}} selectedIndex={(isBrowser)?stepIndex+1:null}>
        <FlatButton
          label="Back"
          disabled={stepIndex === 0}
          onClick={this.handlePrev}
          style={{flex:"1 0 0", margin: "auto"}}  
          />
        <BottomNavigationItem
          icon={<LensIcon></LensIcon>}
          style={{flex:"0 0 0", margin:"auto"}}
        />
        <BottomNavigationItem
          icon={<LensIcon></LensIcon>}
          style={{flex:"0 0 0", margin:"auto"}}
        />
        <BottomNavigationItem
          icon={<LensIcon></LensIcon>}
          style={{flex:"0 0 0", margin:"auto"}}
        />
        <BottomNavigationItem
          icon={<LensIcon></LensIcon>}
          style={{flex:"0 0 0", margin:"auto"}}
        />
        <FlatButton
          label={stepIndex === 2 ? 'Finish' : (stepIndex === 3) ? 'Restart' : 'Next'}
          primary={true}
          style={{flex:"1 0 0",  margin:"auto"}}
          onClick={this.handleNext}
        />
      </BottomNavigation>

      const bottomBarMobile =

      <BottomNavigation style={{position: "fixed", width: "100vw",justifyContent:"space-between", left:0, bottom: 0, zIndex:10}} selectedIndex={(isBrowser)?stepIndex+1:null}>
      <FlatButton
        label="Back"
        disabled={stepIndex === 0}
        onClick={this.handlePrev}
        style={{flex:"1 0 0", margin: "auto"}}  
        />
      <FlatButton
        label={stepIndex === 2 ? 'Finish' : (stepIndex === 3) ? 'Restart' : 'Next'}
        primary={true}
        style={{flex:"1 0 0",  margin:"auto"}}
        onClick={this.handleNext}
      />
    </BottomNavigation>

    return (     
      <Provider store={this.props.store}>
      <div className="App" style={{textAlign:"center",}}>
        <div className="fork">
          <a href="https://github.com/GDGCatania/GDG_Avatar_PWA/tree/React"><img src="./img/GitHub.png" alt="fork on GitHub" height={(isMobile)? 25 : 50} width={(isMobile)? 25 : 50}/></a>
        </div>
        
        {(isBrowser)? bottomBarDesktop : bottomBarMobile}

  
        <img style={{height:"15em", margin:"-50px"}} alt="GDG logo" src="./img/logo.svg"/>

        <div style={contentStyle}>
      
          <div style={{textAlign: "center"}}>
            <CanvasPanel scale={this.state.slider} handleNext={this.handleNext} handlePrev={this.handlePrev} stepIndex={stepIndex} image={this.props.image}></CanvasPanel>
          </div>
        
        </div>
      </div>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

App.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    image: state.data.image
  }
}

export default connect(mapStateToProps)(App);
