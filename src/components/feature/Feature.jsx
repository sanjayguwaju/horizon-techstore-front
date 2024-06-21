import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faShippingFast, faExchangeAlt, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    icon: faCheck,
    title: "Quality Product"
  },
  {
    icon: faShippingFast,
    title: "Free Shipping"
  },
  {
    icon: faExchangeAlt,
    title: "14-Day Return"
  },
  {
    icon: faPhoneVolume,
    title: "24/7 Support"
  }
];

const FeatureItem = ({ feature }) => (
  <Col lg={3} md={6} sm={12} className="pb-1">
    <div
      className="d-flex align-items-center border mb-4"
      style={{padding: "30px", backgroundColor: '#D31737'}}
    >
      <FontAwesomeIcon icon={feature.icon} className="text-white m-0 mr-3" size="2x" />
      <h5 className="font-weight-semi-bold m-0 text-white">{feature.title}</h5>
    </div>
  </Col>
);

FeatureItem.propTypes = {
  feature: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

const Feature = () => {
  return (
    <Container fluid className="pt-5">
      <Row className="px-xl-5 pb-3">
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} />
        ))}
      </Row>
    </Container>
  );
};

export default Feature;