import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BasicExample from '../Components/Navigation';
import Login from '../Pages/Login';
import farmers from '../Images/farmrs-removebg-preview.png';
import '../Styles/All.css';
import Video from '../img/2758322-hd_1920_1080_30fps.mp4'

function Home() {
  const [isPlaying, setIsPlaying] = useState(false); // State to control video playback

  useEffect(() => {
    const videoElement = document.getElementById('backgroundVideo');

    if (videoElement) {
      videoElement.addEventListener('ended', () => videoElement.play()); // Loop playback
      setIsPlaying(true); // Set initial playing state
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', () => videoElement.play());
      }
    }; // Cleanup on unmount
  }, []); // Empty dependency array for one-time effect

  const handlePlayPause = () => {
    const videoElement = document.getElementById('backgroundVideo');
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="Home">
      <Row className="nav-home">
        <BasicExample />
      </Row>
      <div className="video-container" style={{ position: 'relative' }}>
        <video
          id="backgroundVideo"
          src={Video}
          autoPlay={isPlaying} // Control playback with state
          muted // Mute the video by default (optional)
          loop
          style={{
            position: 'absolute', // Make video fill the container
            top: 0,
            left: 0,
            width: '100%',
            height: '700px',
            objectFit: 'cover', // Adjust video scaling as needed
            zIndex: -1, // Ensure video stays behind other content
          }}
        />
        <Row style={{ position: 'relative', zIndex: 1 }}>
        <Col md={4} className='forms-container' style={{ borderRadius: '20px', marginTop: '10px', Width: '100px' }}>
            <Login />
          </Col>
          <Col md={5} className="forms-farmers" style={{marginTop: '30px', fontFamily: 'sans-serif',  fontWeight: 'bold', color: '#324830'}}>
            <h3>Atteignez vos clients plus rapidement, <br /> Avec nous.</h3>
          </Col>
        </Row>
      </div>
      <button onClick={handlePlayPause} style ={{ border: 'none',  borderRadius : '5px', backgroundColor: 'transparent', fontWeight : 'bold', color: 'white'}}> 
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default Home;
