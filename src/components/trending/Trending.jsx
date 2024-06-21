import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const offers = [
  {
    "id": 1,
    "imgSrc": "img/offer-1.png",
    "altText": "Spring Collection Offer",
    "title": "Black Friday Collection",
    "subtitle": "20% off the all order"
  },
  {
    "id": 2,
    "imgSrc": "img/offer-2.png",
    "altText": "Winter Collection Offer",
    "title": "Weekend Sales Collection",
    "subtitle": "20% off the all order"
  }
];

const Offer = ({ offer }) => (
  <div style={{backgroundColor: '#D31737'}} className="position-relative text-center text-md-right text-white mb-2 py-5 px-5">
    <Image src={offer?.imgSrc} alt={offer?.altText} />
    <div className="offer-content">
      <h5 className="text-uppercase text-white mb-3">{offer?.subtitle}</h5>
      <h1 className="mb-4 font-weight-semi-bold">{offer?.title}</h1>
      <Button variant="outline-primary text-white" className="py-md-2 px-md-3">Shop Now</Button>
    </div>
  </div>
);

Offer.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imgSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
  }).isRequired
};

const Trending = () => {
  return (
    <Container fluid className="offer pt-5">
      <Row className="px-xl-5">
        {offers.map(offer => (
          <Col md={6} className="pb-4" key={offer.id}>
            <Offer offer={offer} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Trending;