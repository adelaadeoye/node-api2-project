const express = require("express");

const db = require("../db.js");

const router = express.Router();

router.use(express.json());

//POST: Creates a post using the information sent inside the request body.
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  } else {
    db.insert(req.body)
      .then(posts => {
        db.findById(posts.id).then(posts => {
          res.status(201).json(posts);
        });
      })
      .catch(error => {
        res
          .status(500)
          .json({error: "There was an error while saving the post to the database"  });
      });
  }
});

//**POST: Creates a comment for the post with the specified id using information sent inside of the request body. */
router.post("/:id/comments", (req, res) => {
//    if( db.findCommentById(req.param.id)){
    if (!req.body.text ) {
        res
          .status(400)
          .json({
            errorMessage: "Please provide text for the comment." 
          });
      } else {
        db.insert(req.body)
          .then(posts => {
            res.status(201).json(posts);
          })
          .catch(error => {
            res
              .status(500)
              .json({ error: "There was an error while saving the comment to the database" });
          });
      }
//    }
//    else{
//        res.status(404).json({ message: "The post with the specified ID does not exist." })
//    }
  
});

//**GET: Returns an array of all the post objects contained in the database.*/
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});
//**GET: Returns the post object with the specified id. */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});
//**GET: Returns an array of all the comment objects associated with the post with the specified id. */
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  db.findCommentById(id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});
//**DELETE: Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement. */
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(posts => {
      if (posts) {
        db.find().then(posts => {
          res.status(200).json(posts);
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});
//**PUT: Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original. */

module.exports = router;
