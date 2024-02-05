import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const backend_url = process.env.REACT_APP_BACKEND_URL;


function FavoriteProgramsDisplay({ cookieUID }) {
    const { isAuthenticated } = useAuth0();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [programs, setPrograms] = useState([]);
    
    useEffect(() => {
        console.log("--------- use effect from favorite display ----------")
        
        const checkFavoriteDatabase = async () => {
            if (!isAuthenticated && !cookieUID) {
                console.log("User is not authenticated. Please log in.");
                return;
            }

            try {
                console.log("-----!!!!---- fetching fav programs from favorite display ----------")
                const response = await axios.get(
                    `${backend_url}/user/favorite/getFavoritePrograms/${cookieUID}`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("hahahah ", response)
                console.log(" favorite programs display:  ", response.data);
                const isFavoriteInDatabase = response.data.isFavorite;
                setIsFavorite(isFavoriteInDatabase);
                setPrograms(response.data);
            } catch (error) {
                console.log("-----!!!!---- fetching fav programs from favorite display ERROR ----------")
                if (error.response && error.response.status === 404) {
                    setIsFavorite(false);
                } else if (error.response && error.response.status === 500) {
                    console.error("Internal Server Error:", error);
                }
            }
        };

        checkFavoriteDatabase();
    }, [cookieUID]);

    return (
        <div>
            {programs.length > 0 ? (
                programs.map((program) => (
                    <ProgramColumn
                        key={program.program_id}
                        program={program}
                        cookieUID={cookieUID}
                    />
                ))
            ) : (
                <p>You don't have any favorite programs at the moment.</p>
            )}
        </div>
    );
}


function ProgramCard({ program, cookieUID }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { isAuthenticated } = useAuth0();
    const [isCollapsed, toggleIsCollapsed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const checkFavoriteDatabase = async () => {
            //  console.log("22222check auth0  :  ", isAuthenticated);
            try {
                const response = await axios.get(
                    `${backend_url}/user/favorite/checkFavorite/${cookieUID}/${program.program_id}`,
                    {
                        withCredentials: true,
                    }
                );

                const isFavoriteInDatabase = response.data.isFavorite;
                //  console.log("checking the return from fav : ", isFavoriteInDatabase);
                setIsFavorite(isFavoriteInDatabase);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Handle 404 (Not Found) by returning false
                    setIsFavorite(false);
                } else if (error.response && error.response.status === 500) {
                    console.error("Internal Server Error:", error);
                }
            }
        };

        checkFavoriteDatabase();
    }, [isAuthenticated, cookieUID, program.program_id]);

    const toggleFavorite = async () => {
        try {
            if (!isAuthenticated) {
                alert("Oops! It looks like you're not logged in. Please log in to unlock this feature!");
                return;
            }

            console.log("isFavorite:   ", isFavorite, cookieUID, program.program_id )
            const favoriteRequest = isFavorite ? "removeFavorite" : "addFavorite";
            const url = `${backend_url}/user/favorite/${favoriteRequest}`;

            const requestData = {
                userID: cookieUID,
                programID: program.program_id,
            };

            const response = await axios.post(url, requestData, {
                withCredentials: true,
            });

            setIsFavorite((prevIsFavorite) => !prevIsFavorite);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div>

            <Card key={program.program_id} className="w-100 position-relative mb-3">
                <FontAwesomeIcon
                    icon={isFavorite ? solidStar : regularStar}
                    className="star-icon position-absolute top-0 end-0 m-2"
                    onClick={toggleFavorite}
                    style={{
                        cursor: "pointer",
                        color: isFavorite ? "gold" : "grey",
                    }}
                />
                <Card.Body>
                    <Card.Title>{program.title}</Card.Title>
                    <Card.Text>
                        Lead Contact: {program.lead_contact}
                        <br />
                        Contact Email:{" "}
                        <a href={`mailto:${program.contact_email}`}>
                            {program.contact_email}
                        </a>
                        <Collapse in={isCollapsed}>
                            <div id="collapse-text">
                                Web Link: <a href={program.link_to_web}>{program.link_to_web}</a>
                                <br />
                                <ProgramDuration program={program} />
                                <br />
                                <br />
                                {program.long_description}
                            </div>
                        </Collapse>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                    <Button
                        onClick={() => {
                            toggleIsCollapsed(!isCollapsed);
                            toggleText();
                        }}
                        aria-controls="collapse-text"
                        aria-expanded={isCollapsed}
                    >
                        <ShowMoreShowLess isExpanded={isExpanded} />
                    </Button>
                </Card.Footer>
            </Card>

        </div>
    );
}


const ProgramColumn = ({ program, cookieUID }) => {
    const [mdValue, setMdValue] = useState(4);

    const changeMdValue = () => {
        if (mdValue === 4) {
            setMdValue(12);
        } else {
            setMdValue(4);
        }
    };

    return (
        <Col key={program.id} md={mdValue} className="mb-4">
            <ProgramCard
                program={program}
                cookieUID={cookieUID}
            />
        </Col>
    );
};


const ProgramDuration = ({ program }) => {
    return <>{program.duration ?
        "Program Duration: " + program.duration + " " + program.duration_unit :
        "Program Duration: Varies"}</>;
}

const ShowMoreShowLess = ({ isExpanded }) => {
    return <>{isExpanded ? "Show Less" : "Show More"}</>;
};

export default FavoriteProgramsDisplay;