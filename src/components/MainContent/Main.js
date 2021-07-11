import React from 'react'
import { useLocation } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import useFetch from '../../hooks/useFetch';
import './Main.css';

const Main = ({ coins }) => {
  const location = useLocation();

  const path = location.pathname;
  const newPath = path.substring(1);

  const resource = coins.find((element) => {
    return element.id === newPath
  });

  // const url = `https://api.coingecko.com/api/v3/coins/${newPath}?localization=false`
  // const { data: coinDetails } = useFetch(url);
  // console.log(coinDetails);

  return (
    <>
      <Row className='m-2'>
        <h4 className='mb-0 mt-4'>
          <img
            src={resource.image === null ? '' : resource.image}
            width="50"
            height="50"
            className="rounded-circle"
            alt="Ashley Briggs"
            style={{
              marginRight: '10px'
            }}
          />
          {`${resource.name === null ? '' : resource.name} (${resource.symbol === null ? '' : resource.symbol})`}
        </h4>
        <Col xl={4} md={6} sm={12}>
          <Card className='shadow-sm p-3 mb-5 mt-4 w-100 h-60 cards'>
            <CardBody>
              <small className="text-right text-navy">Latest price from</small> <strong>{resource.name}</strong>
              <br />
              <h2>IDR {resource.current_price === null ? '' : resource.current_price.toLocaleString()}</h2>
              <br />
              <small className="text-muted">{resource.last_updated}</small>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} md={6} sm={12}>
          <Card className='shadow-sm p-3 mb-5 mt-4 w-100 h-60'>
            <CardBody>
              <small className="text-right text-navy">From the last 24hours</small>
              <br />
              {resource.price_change_percentage_24h < 0 ? (
                <>
                  <h2 className="price-down">{`${resource.price_change_percentage_24h === null ? '' : resource.price_change_percentage_24h.toFixed(2)}%`}</h2>
                  <br />
                  <strong>{resource.name}</strong><small className="text-muted">price is down</small>
                </>
              ) : (
                <>
                  <h2 className="price-up">{`${resource.price_change_percentage_24h === null ? '' : resource.price_change_percentage_24h.toFixed(2)}%`}</h2>
                  <br />
                  <strong>{resource.name === null ? '' : resource.name}</strong><small className="text-muted"> price is up</small>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col xl={5} md={12} sm={12}>
          <Card className='shadow-sm p-3 mb-5 mt-4 w-100 h-60'>
            <CardBody>
              <Row>
                <Col md={6}>
                  <strong className="desc-text">Market Cap</strong><br />
                  <small className="text-muted">IDR {resource.market_cap === null ? '' : resource.market_cap.toLocaleString()}</small><br />
                  <strong className="desc-text">24h High</strong><br />
                  <small className="text-muted">IDR {resource.high_24h === null ? '' : resource.high_24h.toLocaleString()}</small><br />
                  <strong className="desc-text">Fully Diluted Valuation</strong><br />
                  <small className="text-muted">IDR {resource.fully_diluted_valuation === null ? '' : resource.fully_diluted_valuation.toLocaleString()}</small>
                </Col>
                <Col md={6}>
                  <strong className="desc-text">24 Hour Trading Vol</strong><br />
                  <small className="text-muted">IDR {resource.total_volume === null ? '' : resource.total_volume.toLocaleString()}</small><br />
                  <strong className="desc-text">Circulating Supply</strong><br />
                  <small className="text-muted">{resource.circulating_supply === null ? '' : resource.circulating_supply.toLocaleString()} / {resource.total_supply === null ? '' : resource.total_supply.toLocaleString()}</small><br />
                  <strong className="desc-text">Max Supply</strong><br />
                  <small className="text-muted">{resource.total_supply === null ? '' : resource.total_supply.toLocaleString()}</small>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Main
