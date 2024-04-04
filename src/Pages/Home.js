import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BasicExample from '../Components/Navigation';
import Login from '../Pages/Login';
import farmers from '../Images/farmrs-removebg-preview.png';
import '../Styles/Home.css';
import Video from '../img/vid.mp4'
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };


  const [isPlaying, setIsPlaying] = useState(false); 

  useEffect(() => {
    const videoElement = document.getElementById('backgroundVideo');

    if (videoElement) {
      videoElement.addEventListener('ended', () => videoElement.play()); 
      setIsPlaying(true); 
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', () => videoElement.play());
      }
    }; 
  }, []); 

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
          autoPlay={isPlaying} 
          muted 
          loop
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            objectFit: 'cover', 
            zIndex: -1, 
            filter: 'brightness(0.4)',

           }}
        />
        <Row style={{ position: 'relative', zIndex: 1 }}>
        <Col md={4} className='forms-container' >
            <Login />
          </Col>
          <Col className="farmconnect-hero" >
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>FarmConnect</h2>

              <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
{t("hello")}
             **FarmConnect** connecte les agriculteurs, les consommateurs et les vendeurs au sein d'une communauté agricole dynamique. Trouvez des produits frais, des ressources et un réseau de soutien.
              </p>

              <button onClick={handlePlayPause} className="farmconnect-play-button">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </Col>



        </Row>
      </div>
    </div>
  );
}

export default Home;
