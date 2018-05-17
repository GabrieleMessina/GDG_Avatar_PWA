import React from 'react';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import Canvas from './mCanvas'
import {connect} from 'react-redux';
import {setCropping, setImage, setImageUrl} from '../redux/actions/index';
import AvatarEditor from 'react-avatar-editor';
import {
    Slider,
    FlatButton
} from 'material-ui';
import '../style/App.css'


class CanvasPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {slider: 1, scale: 1};
    }

    componentWillMount() {
        const logoWtm = new Image();
        logoWtm.crossOrigin = 'anonymous';
        logoWtm.src = './img/logow.svg';
        this.setState({logoWtm: logoWtm});
        const frame = new Image();
        frame.crossOrigin = 'anonymous';
        frame.src = "./img/frame.svg";
        this.setState({frame: frame});
    }

    handleSlider = (event, value) => {
        this.setState({slider: value});
    };


  render() {
    const setEditorRef = (editor) => {
      this.editor = editor; 
    }
    const downloadImg = ()=>{
      if(window.navigator.userAgent.indexOf("Edge") > -1){

        var drawingFileName = "avatar" + Math.round( (new Date()).getTime() / 1000 ) + ".png"; // Produces a unique file name every second.
        window.navigator.msSaveBlob(this.props.canvas.msToBlob(), drawingFileName); // Save the user's drawing to a file.
      } // saveCanvas
    }

        const setCrop = () => {
            this.props.dispatch(setCropping(this.editor.getCroppingRect()));
        };

        const Cropper = (props) => (

            <AvatarEditor
                {...props}
                ref={setEditorRef}
                image={this.props.imageUrl}
                onMouseUp={setCrop}
                width={600}
                onImageReady={setCrop}
                height={600}
                border={0}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={this.state.slider}
                rotate={0}
            />
        );

        const imgUpload = () => {
            const image = document.getElementById("inputImage").files[0];
            const url = window.URL || window.webkitURL;
            const src = url.createObjectURL(image);
            this.props.dispatch(setImageUrl(src));
            this.props.dispatch(setImage(true));
        };

        switch (this.props.stepIndex) {
            case 0:
                return (
                    <div>
                        <div style={{margin: "0", height: "50vh", width: "100%", backgroundColor:'lightGrey', display:'flex', justifyContent:'center',alignItems:'center',cursor:'pointer', position:'relative'}} >
                            <UploadIcon color="#00BCD4"/> <p style={{color:"#00BCD4"}}>UPLOAD IMAGE</p>
                            <input id="inputImage" onChange={imgUpload} type="file" accept="image/*,capture=camera"/>
                        </div>
                        <p>Recommended resolution for your photo is 600x600.</p>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <div>
                            <p>Scale Image</p>
                            <Slider
                                style={{width: "30%", margin: "auto"}}
                                min={1}
                                max={10}
                                step={0.1}
                                value={this.state.slider}
                                onChange={this.handleSlider}
                            />
                        </div>
                        <Cropper/>
                    </div>
                );
            case 2:
                return <Canvas/>;
            case 3:
                return (
                    <a href={this.props.canvasUrl} onClick={downloadImg} download="avatar.png" id="download">
                        <FlatButton style={{margin: "0", height: "50vh", width: "100%"}} backgroundColor={"light-gray"}
                                    label="Download Avatar!" primary={true} icon={<DownloadIcon/>}/>
                    </a>
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
}

const mapStateToProps = (state) => {
    return {
        image: state.data.image,
        imageUrl: state.data.imageUrl,
        wtm: state.data.wtm,
        bw: state.data.bw,
        blackText: state.data.blackText,
        canvas: state.data.canvas,
        canvasUrl: state.data.canvasUrl
    }
};

export default connect(mapStateToProps)(CanvasPanel);