// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import $ from 'jquery';
import { nowPlaying, setControls } from '../actions';
import DefaultImage from '../imgs/no-img.png';
// var ct = new ColorThief();

class MediaViewPage extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        track: null
      }

      this.getAlbum = this.getAlbum.bind(this)
      this.getColors = this.getColors.bind(this)
    }

    componentDidMount() {
      this.getAlbum()
    }

    componentDidUpdate() {
        if (this.state.track !== this.props.nowPlaying.title) {
            this.setState({track: this.props.nowPlaying.title})
            this.getAlbum()
        }
    }

    getAlbum() {
        let component = this
        let nowPlaying = component.props.nowPlaying

        console.log(component.props)

        if (component.props.nowPlaying) {
            $.ajax({
                //url: `https://axzodu785h.execute-api.us-east-1.amazonaws.com/dev?track=${nowPlaying.title.split('-')[1]}&artist=${nowPlaying.title.split('-')[0]}`
                url: `/findAlbum/${nowPlaying.title.split('-')[0]}/${nowPlaying.title.split('-')[1]}`
            }).done((album) => {
                this.getColors(album)
            });
        }
    }

    getColors(album) {

        let track = this.props.nowPlaying
        var img = document.getElementById('image')
        // console.log(img);
        img.setAttribute('crossOrigin', '*');
        var src = album ? `${album.image}?${new Date().getTime()}` : DefaultImage;
        console.log(src);
        img.setAttribute('src', src);
        $('.v').html(track.title.split('-')[1]);
        $('.0').html(`${track.title.split('-')[0]} - ${album ? album.album : ''}`);

        // console.log(track, img);
        // img.addEventListener('load', function() {
        //     // Set variables and get colors from images
        //     var vibrant = new Vibrant(img, 64, 5);
        //     var swatches = vibrant.swatches();
        //     var color = ct.getColor(img);
        //     var pal = ct.getPalette(img);
        //     if (swatches['Vibrant']) {
        //         var v = swatches['Vibrant'].getRgb();
        //
        //         // Change UI colors based on colors found
        //         $(".v").css("color", swatches['Vibrant'].getHex());
        //         // $('#Viewer').css("backgroundColor", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
        //         $('#image').css('boxShadow', `0 0 50px ${swatches['Vibrant'].getHex()}`);
        //         $('.dom').css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        //         $('.0').css("color", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        //     } else {
        //         // Change UI colors based on colors found
        //         $(".v").css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        //         // $('body').css("backgroundColor", `rgb(${pal[1][0]}, ${pal[1][1]}, ${pal[1][2]})`);
        //         $('#image').css('boxShadow', `0 0 50px rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        //         $('.dom').css("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        //         $('.0').css("color", `rgb(${pal[0][0]}, ${pal[0][1]}, ${pal[0][2]})`);
        //     }
        // });
    }

    render() {
        return (
            <div id="Viewer" className="page">
                <div id="div1" className="ui container">
                    <img id="image" src={DefaultImage} alt=""></img>
                    <h1 className='v'> </h1>
                    <h2 className='0'> </h2>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  nowPlaying: state.nowPlaying,
})

const mapDispatchToProps = dispatch => ({
    setControls: bindActionCreators(setControls, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaViewPage)
