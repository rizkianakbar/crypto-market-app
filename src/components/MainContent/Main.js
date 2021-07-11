import React from 'react'
import { useLocation } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import './Main.css';

const Main = ({ coins }) => {
  const location = useLocation();

  const path = location.pathname;
  const newPath = path.substring(1);

  const resource = coins.find((element) => {
    return element.id === newPath
  });

  return (
    <>
      <Row className='m-2'>
        <h4 className='mb-0 mt-4'>
          <img
            src={resource.image}
            width="50"
            height="50"
            className="rounded-circle"
            alt="Ashley Briggs"
            style={{
              marginRight: '10px'
            }}
          />
          {`${resource.name} (${resource.symbol})`}
        </h4>
        <Col md={4}>
          <Card className='shadow-sm p-3 mb-5 mt-4 w-100 h-60'>
            <CardBody>
              <small className="text-right text-navy">Latest price from</small> <strong>{resource.name}</strong>
              <br />
              <h2>IDR {resource.current_price.toLocaleString()}</h2>
              <br />
              <small className="text-muted">{resource.last_updated}</small>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow-sm p-3 mb-5 mt-4 w-100 h-60'>
            <CardBody>
              <small className="text-right text-navy">From the last 24hours</small>
              <br />
              <h2>{`${resource.price_change_percentage_24h.toFixed(2)}%`}</h2>
              <br />
              <strong>{resource.name}</strong><small className="text-muted"> is down</small>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow-sm p-3 mb-5 mt-4 w-100 h-60'>
            <CardHeader>
              <CardTitle tag="h5" className=" mb-0 ">
                <img
                  src={resource.image}
                  width="36"
                  height="36"
                  className="rounded-circle"
                  alt="Ashley Briggs"
                  style={{
                    marginRight: '10px'
                  }}
                />
                {`${resource.name} (${resource.symbol})`}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <small className="text-right text-navy">Latest price from</small> <strong>{resource.name}</strong>
              <br />
              <h2>IDR {resource.current_price.toLocaleString()}</h2>
              <br />
              <small className="text-muted">{resource.last_updated}</small>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Main
