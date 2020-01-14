const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch')
let config = require('./config.json')

require('dotenv').config(); // We're storing environmental variables in .env. This tells Node to read that file and set 'em for us.

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



// *** Initialization ***
let userAgent = `browser:${process.env.CLIENT_ID}:0.0.1 (by /u/Important_Quit)`

// <platform>:<app ID>:<version string> (by /u/<reddit username>)


// *** Routes ***

// app.post('/checkSubreddit', async (req, res) => {
//    let results = await r.getSubreddit(req.body.subreddit).getHot()
//    res.send(results)
// })

// app.post('/getHotReddit', async (req, res) => {
//    // Will get subreddits from database eventually. 
//    // Right now it's called for every sub in the broswer JS's redux store, which draws from localStorage

//    let fetchPromises = []

//    let fetchPosts = async (subreddit) => {
//       return await r.getSubreddit(subreddit).getHot()
//    }

//    console.log("reddit request body")
//    console.log(req.body)
//    for (let i = 0; i < req.body.subreddits.length; i++) {
//       fetchPromises.push(fetchPosts(req.body.subreddits[i]))
//    }

//    Promise.all(fetchPromises).then((results) => {
//       let flattenedResults = []

//       results.forEach((subredditResults) => {
//          subredditResults.forEach((post) => { flattenedResults.push(post) })
//       })

//       res.send(flattenedResults)
//    })
// })

app.get('/getAuthLink', (req, res) => {
   let baseURL = 'https://www.reddit.com/api/v1/authorize?'
   let clientID = process.env.CLIENT_ID
   let responseType = 'code' // Specified by https://github.com/reddit-archive/reddit/wiki/OAuth2
   let state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // This will be sent back when authorization goes through. Via https://gist.github.com/6174/6062387
   let redirectURI = process.env.REDIRECT_URI // Which endpoint will be called after the user authorizes?
   let duration = "permanent" // Also specified by https://github.com/reddit-archive/reddit/wiki/OAuth2. Temp doesn't get a refresh token - permanent does
   // let scopeString = // identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread. Request as needed.
   // Scope string optional?
   let scope = "identity"

   let authLink = `${baseURL}client_id=${clientID}&response_type=${responseType}&state=${state}&redirect_uri=${redirectURI}&duration=${duration}&scope=${scope}`

   res.send({ authLink, state })
})

app.post('/getTokens', async (req, res) => {
   let baseURL = 'https://www.reddit.com/api/v1/access_token'
   const encode = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')

   let data = await fetch(baseURL, {
      method: 'POST',
      headers: {
         'User-Agent': userAgent,
         'Authorization': `Basic ${encode}`,
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=authorization_code&code=${req.body.code}&redirect_uri=${process.env.REDIRECT_URI}`
   })
      .then(response => response.json())
      .then(data => {
         console.log(data)
         return data
      })

   console.log(data)
   res.send(data)
})

// app.get('/authorized', (req, res) => {

//    // Make this our redirect endpoint somehow?
//    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// })





if (process.env.NODE_ENV === 'production') {
   // Serve any static files
   app.use(express.static(path.join(__dirname, 'client/build')));

   // Handle React routing, return all requests to React app
   app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
   });
}

app.listen(port, () => console.log(`Listening on port ${port}`));