import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const MainSiteWrapper = ({ children }) => <>

  <main role="main" className="flex-shrink-0" style={{ paddingTop: `4rem` }}>
    <Container>
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  </main>
</>;
