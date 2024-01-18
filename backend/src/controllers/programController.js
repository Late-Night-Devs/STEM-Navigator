const db = require('../models/db');

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

exports.filterPrograms = (req, res) => {
    const tagIds = req.body.tagIds || [];
    console.log("filterPrograms - Request Body:", req.body);

    if (tagIds.length > 0) {
        const placeholders = tagIds.map(() => "?").join(",");
        const sqlQuery = `
      SELECT p.* FROM Programs p
      JOIN ProgramTags pt ON p.program_id = pt.program_id
      WHERE pt.tag_id IN (${placeholders})
      GROUP BY p.program_id
      HAVING COUNT(DISTINCT pt.tag_id) = ?  -- Ensure all selected tags are present
    `;

        db.query(sqlQuery, [...tagIds, tagIds.length], (err, results) => {
            if (err) {
                res.status(500).send("Error in fetching filtered programs");
                return;
            }
            res.json(results);
        });
    } else {
        // If no tag IDs are provided, return all programs
        db.query("SELECT * FROM Programs", (err, results) => {
            if (err) {
                res.status(500).send("Error in fetching programs");
                return;
            }
            res.json(results);
        });
    }
};

// Delete program based on ID | delete from multiple associates -> itself
exports.deleteProgram = (req, res) => {
    const { programId } = req.params;
    console.log(`DELETE Request: Remove program with ID - ${programId}`);

    // 1: Delete associated entries in UserFavorites table
    db.query("DELETE FROM UserFavorites WHERE program_id = ?", [programId], (errUserFavorites, resultsUserFavorites) => {
        if (errUserFavorites) {
            console.error("Error in removing associated UserFavorites for the program:", errUserFavorites);
            res.status(500).send("Error in removing associated UserFavorites for the program");
            return;
        }

        if (resultsUserFavorites.affectedRows === 0) {
            console.log('No Record of program_id in UserFavorites Table');
        }
        // 2: Delete in ProgramTags table
        db.query("DELETE FROM ProgramTags WHERE program_id = ?", [programId], (errProgramTags, resultsProgramTags) => {
            if (errProgramTags) {
                console.error("Error in removing associated ProgramTags for the program:", errProgramTags);
                res.status(500).send("Error in removing associated ProgramTags for the program");
                return;
            }

            if (resultsProgramTags.affectedRows === 0) {
                console.log('No Record of program_id in ProgramTags Table');
            }

            // 3: Delete itself
            db.query("DELETE FROM Programs WHERE program_id = ?", [programId], (errPrograms, resultsPrograms) => {
                if (errPrograms) {
                    console.error("Error in removing program from Programs:", errPrograms);
                    res.status(500).send("Error in removing program from Programs");
                    return;
                }
                // FINAL result!!!!
                res.json({ message: 'Program, UserFavorites, and ProgramTags removed successfully' });
            });
        });
    });
};
