import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterByTag from "./FilterByTag";
import Programs from "./Programs";
import FavoriteProgramsDisplay from "./FavoriteSection";
import { Link } from "react-scroll";
import "../../CSS/ProgramTab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import Cookies from "js-cookie";

function ProgramTab() {
  const [selectedTagIds, setSelectedTagIds] = useState(new Set());
  const [isFavoriteClicked, setFavoriteClicked] = useState(false);
  // no matter what is true or false for the favorite btn as long as they click on the star icon
  // it needs to re-render the site again to update favorite programs.
  const handleFavoriteClicked = () => setFavoriteClicked(!isFavoriteClicked);
  // unmount the click is back to false until the user clicks on the favorite
  useEffect(() => {
    setFavoriteClicked(false);
  }, []);

  // get userID from cookies
  const cookieUID = Cookies.get("cookieUId");

  return (
    <Container fluid>
      <Row className="img-hero-welcome">
        <div className="hero-img"></div>
        <section>
          <h1 className="intro text-center fs-3 fw-bold p-5">
            Portland State University STEM Programs
          </h1>
          {cookieUID && (
            <div className="d-flex justify-content-end ">
              <Link
                to="favoriteSection"
                smooth={true}
                duration={300}
                className="btn btn-primary mt-3 favorite-button "
              >
                <FontAwesomeIcon
                  icon={solidStar}
                  style={{
                    cursor: "pointer",
                    color: "gold",
                    paddingRight: "7px",
                  }}
                />
                My Favorite Lists
              </Link>
            </div>
          )}
        </section>
      </Row>
      <Row className="mt-5">
        <Col
          md={12}
          lg={6}
          role="region"
          aria-label="FILTER PROGRAMS BY TAG"
        >
          <FilterByTag
            setSelectedTagIds={setSelectedTagIds}
            cookieUID={cookieUID}
          />
        </Col>
        <Col
          md={12}
          lg={6}
          className="border-end rounded shadow "
          style={{ minHeight: "200px" }}
          role="region"
          aria-label="FILTERED PROGRAMS"
        >
          <div>
            {selectedTagIds.size > 0 ? (
              <Programs
                selectedTagIds={selectedTagIds}
                cookieUID={cookieUID}
                handleFavoriteClicked={handleFavoriteClicked}
              />
            ) : (
              <Programs
                selectedTagIds={new Set()}
                cookieUID={cookieUID}
                handleFavoriteClicked={handleFavoriteClicked}
              />
            )}
          </div>
        </Col>
      </Row>

      <Row role="region" aria-label="FAVORITED PROGRAMS">
        {cookieUID && (
          <div id="favoriteSection" className="mt-4 border border-2">
            <h3 className="p-2"> Display Favorite</h3>
            <FavoriteProgramsDisplay
              cookieUID={cookieUID}
              handleFavoriteClicked={handleFavoriteClicked}
            />
          </div>
        )}
      </Row>
    </Container>
  );
}

export default ProgramTab;
