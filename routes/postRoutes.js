
const express = require('express');
var router = express.Router();
const fetch = require('node-fetch')

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

const baseURL = 'https://www.reddit.com'

router.post('/upvote', async (req, res) => {
   console.log("Upvote attempted!")
   console.log(req.body)
   await fetch(`${baseURL}/api/vote`, {
      headers: {
         'User-Agent': process.env.USER_AGENT,
      },
   },
      {
         id: req.body.postID,
         dir: "1"
      })
      .then(response => response.json())
      .then(data => {
         console.log(data)
         return data
      })
   res.send(JSON.stringify(data))
})

function downvote(postID) {
   fetch(`${baseURL}/api/vote`, {
      headers: {
         'User-Agent': process.env.USER_AGENT,
      },
   },
      {
         id: postID,
         dir: "-1"
      })
      .then(response => response.json())
      .then(data => {
         console.log(data)
      })
}

function unvote(postID) {
   fetch(`${baseURL}/api/vote`, {
      headers: {
         'User-Agent': process.env.USER_AGENT,
      },
   },
      {
         id: postID,
         dir: "0"
      })
      .then(response => response.json())
      .then(data => {
         console.log(data)
      })
}

module.exports = router;