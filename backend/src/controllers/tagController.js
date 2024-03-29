const db = require("../models/db");

exports.getTags = (req, res) => {
  console.log("getTAgs");
  db.query("SELECT * FROM Tags", (err, results) => {
    if (err) {
      res.status(500).send("Error in fetching records from Tags");
      return;
    }
    res.json(results);
  });
};

exports.deleteProgramsByTag = (req, res) => {
  const { tagIDs } = req.params;

  // Convert string into an array of substrings.
  const tagIDArray = tagIDs.split(",").map((id) => parseInt(id.trim()));

  if (tagIDArray.length === 0) {
    return res.status(400).json({ error: "No tag IDs provided for deletion" });
  }

  // Separated string of tag IDs displays on console log to keep track of each deletion.
  console.log(
    `DELETE Request: Remove programs with Tag IDs - ${tagIDArray.join(", ")}`
  );

  // Loop through each tag ID for deletion
  tagIDArray.forEach((tagId) => {
    // 1: Delete associated entries in ProgramTags table
    db.query(
      "DELETE FROM ProgramTags WHERE tag_id = ?",
      [tagId],
      (errProgramTags, resultsProgramTags) => {
        if (errProgramTags) {
          console.error(
            `Error in removing associated ProgramTags for tag ${tagId}:`,
            errProgramTags
          );
          res
            .status(500)
            .send(`Error in removing associated ProgramTags for tag ${tagId}`);
          return;
        }

        if (resultsProgramTags.affectedRows === 0) {
          console.log(`No Record of tag_id ${tagId} in ProgramTags Table`);
        }

        // 2: Delete itself from Tags table
        // comment this out if just wanted to remove programs associated to the tagID
        db.query(
          "DELETE FROM Tags WHERE tag_id = ?",
          [tagId],
          (errTags, resultsTags) => {
            if (errTags) {
              console.error(
                `Error in removing tag ${tagId} from Tags:`,
                errTags
              );
              res.status(500).send(`Error in removing tag ${tagId} from Tags`);
              return;
            }

            // Check if itself in Tags table
            if (resultsTags.affectedRows === 0) {
              console.log(`No Record of tag_id ${tagId} in Tags Table`);
            }

            // FINAL RESULT!!! Log success for each tag ID
            console.log(
              `Tag ${tagId}, and associated ProgramTags removed successfully`
            );
          }
        );
      }
    );
  });

  // Last message for the return
  // FINAL result after processing all tag IDs
  res.json({ message: "Deletion process completed based on tag_id" });
};

// Function to add a new tag
exports.addTag = (req, res) => {
  const { tag_name, category } = req.body;
  const query = "INSERT INTO Tags (tag_name, category) VALUES (?, ?)";

  db.query(query, [tag_name, category], (err, results) => {
    if (err) {
      console.error("Error adding new tag:", err);
      res.status(500).send("Error adding new tag");
      return;
    }
    res
      .status(201)
      .json({ message: "New tag added successfully", tagId: results.insertId });
  });
};

// Function to update an existing tag
exports.updateTag = (req, res) => {
  const { tag_id, tag_name, category } = req.body;
  const query = "UPDATE Tags SET tag_name = ?, category = ? WHERE tag_id = ?";

  db.query(query, [tag_name, category, tag_id], (err, results) => {
    if (err) {
      console.error("Error updating tag:", err);
      res.status(500).send("Error updating tag");
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send("Tag not found");
      return;
    }
    res.json({ message: "Tag updated successfully" });
  });
};
