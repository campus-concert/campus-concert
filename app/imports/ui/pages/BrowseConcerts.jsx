import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Dropdown, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';
import ConcertBasic from '../components/ConcertBasic';

const BrowseConcerts = () => {

  const [monthFilter, setMonthFilter] = useState('Anytime'); // [1]
  const [instrumentFilter, setInstrumentFilter] = useState('All instruments');
  const [tasteFilter, setTasteFilter] = useState('All tastes');
  const [filteredConcerts, setFilteredConcerts] = useState();

  const { ready, concerts } = useTracker(() => {
    const subscription = Meteor.subscribe(Concerts.userPublicationName);
    const rdy = subscription.ready();
    const concertItems = Concerts.collection.find({}).fetch();
    setFilteredConcerts(concertItems);
    return {
      concerts: concertItems,
      ready: rdy,
    };
  }, []);

  const filterMonth = (list) => {
    if (monthFilter === 'Anytime') {
      return list;
    }
    return list.filter((concert) => (concert.date.includes(monthFilter)));
  };

  const filterInstruments = (list) => {
    if (instrumentFilter !== 'All instruments') {
      return list.filter((concert) => (concert.instrumentsNeeded.includes(instrumentFilter)));
    }
    return list;
  };

  const filterTastes = (list) => {
    if (tasteFilter !== 'All tastes') {
      return list.filter((concert) => (concert.genres.includes(tasteFilter)));
    }
    return list;
  };

  const filterConcerts = () => {
    let filtering = filterMonth(concerts);
    filtering = filterInstruments(filtering);
    filtering = filterTastes(filtering);
    setFilteredConcerts(filtering);
  };

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
                  <Dropdown.Toggle variant="primary" id="dropdown-location">
                    {monthFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setMonthFilter('Anytime')}>
                      Anytime
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Jan')}>
                      Jan
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Feb')}>
                      Feb
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Mar')}>
                      Mar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Apr')}>
                      Apr
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('May')}>
                      May
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Jun')}>
                      Jun
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Jul')}>
                      Jul
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Aug')}>
                      Aug
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Sep')}>
                      Sep
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Oct')}>
                      Oct
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Mar')}>
                      Mar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Nov')}>
                      Nov
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setMonthFilter('Dec')}>
                      Dec
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <h5>Filter by instrument:</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-location">
                    {instrumentFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setInstrumentFilter('All instruments')}>
                      All instruments
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setInstrumentFilter('guitar')}>
                      Guitar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setInstrumentFilter('flute')}>
                      Flute
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setInstrumentFilter('piano')}>
                      Piano
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setInstrumentFilter('trumpet')}>
                      Trumpet
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <h5>Filter by tastes:</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-location">
                    {tasteFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTasteFilter('All tastes')}>
                      All tastes
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setTasteFilter('rock')}>
                      Rock
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setTasteFilter('pop')}>
                      Pop
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setTasteFilter('hip-hop')}>
                      Hip-hop
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setTasteFilter('jazz')}>
                      Jazz
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <Button onClick={filterConcerts} variant="secondary">
                  Apply Filters
                </Button>
              </Col>
            </Row>
            {(filteredConcerts.length === 0) ?
              <h2>No concerts match this filtering</h2>
              : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {filteredConcerts.map((concert, index) => (
                    <Col key={index}>
                      <ConcertBasic concert={concert} showDetailsLink />
                    </Col>
                  ))}
                </Row>
              )}
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BrowseConcerts;
