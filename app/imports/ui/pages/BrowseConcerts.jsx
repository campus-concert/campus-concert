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

  const months = ['Anytime', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const instruments = ['All instruments'].concat(Concerts.allowedInstruments);
  const tastes = ['All tastes'].concat(Concerts.allowedGenres);

  const { ready, concerts } = useTracker(() => {
    const subscription = Meteor.subscribe(Concerts.userPublicationName);
    const rdy = subscription.ready();
    const concertItems = Concerts.collection.find({}).fetch().sort((a, b) => (a.date - b.date));
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
    return list.filter((concert) => (concert.date.getMonth() === months.indexOf(monthFilter) - 1));
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
