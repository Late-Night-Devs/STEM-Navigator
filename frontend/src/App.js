// App.js
import React, { useState } from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterByTag from './components/FilterByTag';
import Programs from './components/Programs';
import programData from './data/programs.json'; // Importing the JSON data
import PSU_logo from './image/PSU_logo.png'
import Viking from './image/viking.png'

function App() {
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [hasFiltered, setHasFiltered] = useState(false);

  // Function to handle the change when filters are applied
  const handleFilterChange = (selectedTags) => {
    // Flatten the selectedTags object into an array of selected options
    const allSelectedTags = Object.values(selectedTags).flat();

    // If no tags are selected, reset the filtered programs and don't set hasFiltered to true
    if (allSelectedTags.length === 0) {
      setHasFiltered(false);
      setFilteredPrograms([]);
    } else {
      // Set hasFiltered to true only if there are selected tags
      setHasFiltered(true);

      // Filter the programData based on the selected tags
      const matchedPrograms = programData.programs.filter(program =>
        // Check if any of the program's tags match any of the selected tags
        program.tags.some(tag => allSelectedTags.includes(tag))
      );

      // Update the state with the matched programs
      setFilteredPrograms(matchedPrograms);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col className='bg-light' style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Navbar bg="light" expand="lg" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
            <Navbar.Brand href="#">
              <div className="d-flex align-items-center">
                <img src={PSU_logo} className="img-fluid mr-2" alt="PSU Logo" style={{ width: '210px', height: 'auto' }} />
                <h3 className="mb-1" style={{ marginLeft: '15px', fontWeight: 'bold' }}>PSU STEM Access</h3>
              </div>
            </Navbar.Brand>
          </Navbar>
        </Col>
      </Row>


      <Row className='mt-5'>
        <Col md={12} lg={6} className="border-end">
          <FilterByTag onFilterChange={handleFilterChange} />
        </Col>
        <Col md={12} lg={6} className="d-flex align-items-center justify-content-center  rounded shadow " style={{ minHeight: '200px' }}>
          <div>
            {hasFiltered ? (
              <Programs programs={filteredPrograms} />
            ) : (
              <div className='mb-3 text-center' style={{ fontSize: '1.6rem', color: 'green' }}>
                <strong> Please select the tags to find your desired programs! </strong>

                <img
                  className="img-fluid mx-auto" // Use mx-auto to center horizontally
                  src={Viking}
                  alt="viking thinking ..."
                  style={{ width: '250px', height: 'auto' }}
                />
              </div>
            )}

          </div>
        </Col>

      </Row>
    </Container>
  );
}

export default App;
