import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import FAQ from './FAQ';
import AssistanceTelephonique from './AssistanceTelephonique'; 
import DiscussionDirecte from './DiscussionDirecte'; 

function Support() {
  const [selectedComponent, setSelectedComponent] = useState('FAQ');

  const handleSelect = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'FAQ':
        return <FAQ />;
      case 'AssistanceTelephonique':
        return <AssistanceTelephonique />;
      case 'DiscussionDirecte':
        return <DiscussionDirecte />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="FAQ" onSelect={() => handleSelect('FAQ')}>FAQ</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="AssistanceTelephonique" onSelect={() => handleSelect('AssistanceTelephonique')}>Assistance Téléphonique</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="DiscussionDirecte" onSelect={() => handleSelect('DiscussionDirecte')}>Discussion Directe</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="mt-3">{renderComponent()}</div>
    </div>
  );
}

export default Support;
