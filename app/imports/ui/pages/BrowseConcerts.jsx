import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Dropdown, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';
import ConcertBasic from '../components/ConcertBasic';

const BrowseConcerts = () => {

  const [monthFilter, setMonthFilter] = useState('Anytime');
  const [instrumentFilter, setInstrumentFilter] = useState('All instruments');
  const [tasteFilter, setTasteFilter] = useState('All tastes');
  const [displayedConcerts, setDisplayedConcerts] = useState(6);

  const months = ['Anytime', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const instruments = ['All instruments'].concat(Concerts.allowedInstruments);
  const tastes = ['All tastes'].concat(Concerts.allowedGenres);

  const { ready, concerts } = useTracker(() => {
    const subscription = Meteor.subscribe(Concerts.userPublicationName);
    const rdy = subscription.ready();
    const concertItems = Concerts.collection.find({}).fetch().sort((a, b) => (a.date - b.date));
    return {
      concerts: concertItems,
      ready: rdy,
    };
  }, []);

  const filteredConcerts = concerts.filter((concert) => {
    const monthCondition = monthFilter === 'Anytime' || concert.date.getMonth() === months.indexOf(monthFilter) - 1;
    const instrumentCondition = instrumentFilter === 'All instruments' || concert.instrumentsNeeded.includes(instrumentFilter);
    const tasteCondition = tasteFilter === 'All tastes' || concert.genres.includes(tasteFilter);
    return monthCondition && instrumentCondition && tasteCondition;
  });

  const loadMore = () => {
    setDisplayedConcerts((prevCount) => prevCount + 6);
  };

  const visibleConcerts = filteredConcerts.slice(0, displayedConcerts);

  return ready ? (
    <Container id="browse-all-concerts" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Card className="p-4 mb-4"> {/* Stylish box added here */}
            <Col className="text-center">
              <h2>Browse Concerts</h2>
            </Col>
            <Row>
              <Col>
                <h5>Filter by month:</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-month">
                    {monthFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {months.map((month, index) => (
                      <Dropdown.Item key={index} onClick={() => setMonthFilter(month)}>
                        {month}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <h5>Filter by instrument:</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-instrument">
                    {instrumentFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {instruments.map((instrument, index) => (
                      <Dropdown.Item key={index} onClick={() => setInstrumentFilter(instrument)}>
                        {instrument}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <h5>Filter by tastes:</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-taste">
                    {tasteFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {tastes.map((taste, index) => (
                      <Dropdown.Item key={index} onClick={() => setTasteFilter(taste)}>
                        {taste}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <Button onClick={filteredConcerts} variant="secondary">
                  Apply Filters
                </Button>
              </Col>
            </Row>
            {(filteredConcerts.length === 0) ?
              <h2>No concerts match this filtering</h2>
              : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {visibleConcerts.map((concert, index) => (
                    <Col key={index}>
                      <ConcertBasic concert={concert} showDetailsLink />
                    </Col>
                  ))}
                </Row>
              )}
            {displayedConcerts < filteredConcerts.length && (
              <Row className="justify-content-center mt-4">
                <Button onClick={loadMore} variant="outline-primary" style={{ width: 'fit-content' }}>
                  Load More
                </Button>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BrowseConcerts;
