import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Button, Dropdown } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { ArrowDown, ArrowUp, Funnel } from 'react-bootstrap-icons';
import { Concerts } from '../../api/concert/Concert';
import LoadingSpinner from '../components/LoadingSpinner';
import ConcertBasic from '../components/ConcertBasic';

const BookmarkedConcerts = () => {
  const [monthFilter, setMonthFilter] = useState('Anytime');
  const [instrumentFilter, setInstrumentFilter] = useState('all instruments');
  const [genreFilter, setGenreFilter] = useState('all genres');
  const [sortOrder, setSortOrder] = useState('desc');
  const [displayedConcerts, setDisplayedConcerts] = useState(6);

  const months = ['Anytime', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const instruments = ['all instruments'].concat(Concerts.allowedInstruments);
  const genres = ['all genres'].concat(Concerts.allowedGenres);

  const { ready, bookmarkedConcerts } = useTracker(() => {
    const subscription = Meteor.subscribe(Concerts.bookmarkedPublicationName);
    const rdy = subscription.ready();
    const concertItems = Concerts.collection.find({
      bookmarks: {
        $elemMatch: {
          userId: Meteor.userId(),
          state: true,
        },
      },
    }).fetch().sort((a, b) => {
      if (sortOrder === 'desc') {
        return a.date - b.date; // Descending order
      }
      return b.date - a.date; // Ascending order
    });
    return {
      bookmarkedConcerts: concertItems,
      ready: rdy,
    };
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  const filterMonth = (list) => {
    if (monthFilter === 'Anytime') {
      return list;
    }
    const selectedMonthIndex = months.indexOf(monthFilter);
    return list.filter((concert) => concert.date.getMonth() === selectedMonthIndex - 1);
  };

  const filterInstruments = (list) => {
    if (instrumentFilter !== 'all instruments') {
      return list.filter((concert) => concert.instrumentsNeeded.includes(instrumentFilter));
    }
    return list;
  };

  const filterGenres = (list) => {
    if (genreFilter !== 'all genres') {
      return list.filter((concert) => concert.genres.includes(genreFilter));
    }
    return list;
  };

  const filterConcerts = () => {
    let filtering = filterMonth(bookmarkedConcerts);
    filtering = filterInstruments(filtering);
    filtering = filterGenres(filtering);
    return filtering;
  };

  const resetFilters = () => {
    setMonthFilter('Anytime');
    setInstrumentFilter('all instruments');
    setGenreFilter('all genres');
    setDisplayedConcerts(6);
  };

  const loadMore = () => {
    setDisplayedConcerts((prevCount) => prevCount + 6);
  };

  const filteredConcerts = filterConcerts();
  const visibleConcerts = filteredConcerts.slice(0, displayedConcerts);

  return ready ? (
    <Container id="bookmarked-concerts" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Card className="p-4 mb-4">
            <Col className="text-center mb-2">
              <h2>Bookmarked Concerts</h2>
            </Col>
            <div className="filter-card mb-5">
              <Row>
                <Col className="text-start">
                  <h5>
                    <span style={{ paddingRight: '0.2em' }}>
                      <Funnel />
                    </span>
                    Sort by:
                  </h5>
                </Col>
                <Col>
                  <Button onClick={toggleSortOrder} variant="outline-dark" style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}>
                    Concert Date{' '}
                    {sortOrder === 'desc' ? <span><ArrowDown /></span> : <span><ArrowUp /></span>}
                  </Button>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-month"
                      style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}
                    >
                      {monthFilter !== 'Anytime' ? monthFilter : 'All Months'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ fontSize: '0.8rem' }}>
                      {months.map((month, index) => (
                        <Dropdown.Item key={index} onClick={() => setMonthFilter(month)}>
                          {month}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-taste"
                      style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}
                    >
                      {genreFilter !== 'all genres' ? genreFilter : 'All Genres'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ fontSize: '0.8rem' }}>
                      {genres.map((genre, index) => (
                        <Dropdown.Item key={index} onClick={() => setGenreFilter(genre)}>
                          {genre}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-dark"
                      id="dropdown-instrument"
                      style={{ border: 'none', fontSize: '1rem', padding: '0.2rem 0.4rem' }}
                    >
                      {instrumentFilter !== 'all instruments' ? instrumentFilter : 'All Instruments'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ fontSize: '0.8rem' }}>
                      {instruments.map((instrument, index) => (
                        <Dropdown.Item key={index} onClick={() => setInstrumentFilter(instrument)}>
                          {instrument}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col className="mb-1">
                  <Button onClick={resetFilters} variant="outline-secondary" style={{ fontSize: '1rem', padding: '0.2rem 0.4rem' }}>
                    Reset Filters
                  </Button>
                </Col>
              </Row>
            </div>
            {visibleConcerts.length > 0 ? (
              <Row xs={1} md={2} lg={3} className="g-4">
                {visibleConcerts.map((concert, index) => (
                  <Col key={index}>
                    <ConcertBasic concert={concert} showDetailsLink />
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="mt-3">You have no bookmarked Concerts.</p>
            )}
            {displayedConcerts < bookmarkedConcerts.length && (
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
  ) : (
    <LoadingSpinner />
  );
};

export default BookmarkedConcerts;
