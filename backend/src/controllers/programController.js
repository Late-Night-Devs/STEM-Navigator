const db = require("../models/db");

// Fetch data from the Programs table
exports.getPrograms = (req, res) => {
  console.log("GET Request for Programs", req.body);

  db.query("SELECT * FROM Programs", (err, results) => {
    if (err) {
      res.status(500).send("Error in fetching records from Programs");
      return;
    }
    res.json(results);
  });
};

// exports.filterPrograms = (req, res) => {
//     const tagIds = req.body.tagIds || [];
//     console.log("filterPrograms - Request Body:", req.body);

//     if (tagIds.length > 0) {
//         const placeholders = tagIds.map(() => "?").join(",");
//         const sqlQuery = `
//       SELECT p.* FROM Programs p
//       JOIN ProgramTags pt ON p.program_id = pt.program_id
//       WHERE pt.tag_id IN (${placeholders})
//       GROUP BY p.program_id
//       HAVING COUNT(DISTINCT pt.tag_id) = ?  -- Ensure all selected tags are present
//     `;

//         db.query(sqlQuery, [...tagIds, tagIds.length], (err, results) => {
//             if (err) {
//                 res.status(500).send("Error in fetching filtered programs");
//                 return;
//             }
//             res.json(results);
//         });
//     } else {
//         // If no tag IDs are provided, return all programs
//         db.query("SELECT * FROM Programs", (err, results) => {
//             if (err) {
//                 res.status(500).send("Error in fetching programs");
//                 return;
//             }
//             res.json(results);
//         });
//     }
// };
const fetchFavoritePrograms = async (userID) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT program_id FROM UserFavorites WHERE user_id = ?";
    db.query(sqlQuery, [userID], (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      const favoritePrograms = results.map((result) => result.program_id);
      resolve(favoritePrograms);
    });
  });
};
// filter by tagIDs
// also checking if their favorite is favorite or not to mark 0 or 1
exports.filterPrograms = (req, res) => {
  const tagIds = req.body.tagIds || [];
  const userID = req.body.userID; // Assuming you pass userID in the request body
  console.log("filterPrograms - Request Body:", req.body);

  if (tagIds.length > 0) {
    const placeholders = tagIds.map(() => "?").join(",");
    const sqlQuery = `
            SELECT p.*, (uf.program_id IS NOT NULL) AS isFavorite FROM Programs p
            LEFT JOIN UserFavorites uf ON p.program_id = uf.program_id AND uf.user_id = ?
            JOIN ProgramTags pt ON p.program_id = pt.program_id
            WHERE pt.tag_id IN (${placeholders})
            GROUP BY p.program_id
            HAVING COUNT(DISTINCT pt.tag_id) = ?  -- Ensure all selected tags are present
            `;

    db.query(sqlQuery, [userID, ...tagIds, tagIds.length], (err, results) => {
      if (err) {
        res.status(500).send("Error in fetching filtered programs");
        return;
      }
      res.json(results);
    });
  } else {
    // If no tag IDs are provided, return all programs with isFavorite column
    const sqlQuery = `
            SELECT p.*, (uf.program_id IS NOT NULL) AS isFavorite FROM Programs p
            LEFT JOIN UserFavorites uf ON p.program_id = uf.program_id AND uf.user_id = ?
            `;
    db.query(sqlQuery, [userID], (err, results) => {
      if (err) {
        res.status(500).send("Error in fetching programs");
        return;
      }
      res.json(results);
    });
  }
};

// Delete program based on IDs | delete from multiple associates -> itself
exports.deleteProgram = (req, res) => {
  const { programIDs } = req.params;

  //  string into an array of substrings.
  const programIDArray = programIDs.split(",").map((id) => parseInt(id.trim()));

  if (programIDArray.length === 0) {
    return res
      .status(400)
      .json({ error: "No program IDs provided for deletion" });
  }

  //separated string of program IDs displays on console log to keep tracking of each deletion.
  console.log(
    `DELETE Request: Remove programs with IDs - ${programIDArray.join(", ")}`
  );

  // Loop through each program ID for deletion
  programIDArray.forEach((programId) => {
    // 1: Delete associated entries in UserFavorites table
    db.query(
      "DELETE FROM UserFavorites WHERE program_id = ?",
      [programId],
      (errUserFavorites, resultsUserFavorites) => {
        if (errUserFavorites) {
          console.error(
            `Error in removing associated UserFavorites for program ${programId}:`,
            errUserFavorites
          );
          res
            .status(500)
            .send(
              `Error in removing associated UserFavorites for program ${programId}`
            );
          return;
        }

        if (resultsUserFavorites.affectedRows === 0) {
          console.log(
            `No Record of program_id ${programId} in UserFavorites Table`
          );
        }

        // 2: Delete in ProgramTags table
        db.query(
          "DELETE FROM ProgramTags WHERE program_id = ?",
          [programId],
          (errProgramTags, resultsProgramTags) => {
            if (errProgramTags) {
              console.error(
                `Error in removing associated ProgramTags for program ${programId}:`,
                errProgramTags
              );
              res
                .status(500)
                .send(
                  `Error in removing associated ProgramTags for program ${programId}`
                );
              return;
            }

            if (resultsProgramTags.affectedRows === 0) {
              console.log(
                `No Record of program_id ${programId} in ProgramTags Table`
              );
            }

            // 3: Delete itself
            db.query(
              "DELETE FROM Programs WHERE program_id = ?",
              [programId],
              (errPrograms, resultsPrograms) => {
                if (errPrograms) {
                  console.error(
                    `Error in removing program ${programId} from Programs:`,
                    errPrograms
                  );
                  res
                    .status(500)
                    .send(
                      `Error in removing program ${programId} from Programs`
                    );
                  return;
                }

                // Check if itself in Programs table
                if (resultsPrograms.affectedRows === 0) {
                  console.log(
                    `No Record of program_id ${programId} in Programs Table`
                  );
                }

                // FINAL RESULLT!!! Log success for each program ID
                console.log(
                  `Program ${programId}, UserFavorites, and ProgramTags removed successfully`
                );
              }
            );
          }
        );
      }
    );
  });

  // Last message for the return
  // FINAL result after processing all program IDs
  res.json({ message: "Deletion process completed based on program_id" });
};

exports.addProgram = (req, res) => {
  const {
    title,
    lead_contact,
    contact_email,
    link_to_web,
    duration,
    duration_unit,
    long_description,
    tag_ids,
  } = req.body;

  // Insert the program into the Programs table
  const insertProgramQuery =
    "INSERT INTO Programs (title, lead_contact, contact_email, link_to_web, duration, duration_unit, long_description) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    insertProgramQuery,
    [
      title,
      lead_contact,
      contact_email,
      link_to_web,
      duration,
      duration_unit,
      long_description,
    ],
    (err, results) => {
      if (err) {
        console.error("Error adding new program:", err);
        res.status(500).send("Error adding new program");
        return;
      }

      const programId = results.insertId;

      if (tag_ids && tag_ids.length > 0) {
        const programTagValues = tag_ids.map((tag_id) => [programId, tag_id]);
        const programTagQuery =
          "INSERT INTO ProgramTags (program_id, tag_id) VALUES ?";

        db.query(
          programTagQuery,
          [programTagValues],
          (errProgramTags, resultsProgramTags) => {
            if (errProgramTags) {
              console.error("Error adding program tags:", errProgramTags);
              res.status(500).send("Error adding program tags");
              return;
            }
            console.log("Program tags added successfully");
          }
        );
      }

      res.status(201).json({
        message: "New program added successfully",
        programId: programId,
      });
    }
  );
};

exports.updateProgram = (req, res) => {
  const {
    program_id,
    title,
    lead_contact,
    contact_email,
    link_to_web,
    duration,
    duration_unit,
    long_description,
    tag_ids,
  } = req.body;

  const query =
    "UPDATE Programs SET title = ?, lead_contact = ?, contact_email = ?, link_to_web = ?, duration = ?, duration_unit = ?, long_description = ? WHERE program_id = ?";

  db.query(
    query,
    [
      title,
      lead_contact,
      contact_email,
      link_to_web,
      duration,
      duration_unit,
      long_description,
      program_id,
    ],
    (err, results) => {
      if (err) {
        console.error("Error updating program:", err);
        res.status(500).send("Error updating program");
        return;
      }

      const deleteQuery = "DELETE FROM ProgramTags WHERE program_id = ?";
      db.query(deleteQuery, [program_id], (errDelete, resultsDelete) => {
        if (errDelete) {
          console.error("Error deleting existing program tags:", errDelete);
          res.status(500).send("Error deleting existing program tags");
          return;
        }
        console.log("Existing program tags deleted successfully");

        // If there are new tags to add, proceed with insertion
        if (tag_ids && tag_ids.length > 0) {
          const programTagValues = tag_ids.map((tag_id) => [
            program_id,
            tag_id,
          ]);
          const programTagQuery =
            "INSERT INTO ProgramTags (program_id, tag_id) VALUES ?";
          db.query(
            programTagQuery,
            [programTagValues],
            (errProgramTags, resultsProgramTags) => {
              if (errProgramTags) {
                console.error("Error adding program tags:", errProgramTags);
                res.status(500).send("Error adding program tags");
                return;
              }
              console.log("Program tags updated successfully");
            }
          );
        }
      });

      if (results.affectedRows === 0) {
        res.status(404).send("Program not found");
        return;
      }
      res.json({ message: "Program updated successfully" });
    }
  );
};
