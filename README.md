User login via OAuth2. Should allow us to fetch a subscription list, view just subscribed subreddits. I would assume.

pagination of results

Slidey animations?


### Notes
We're storing tokens in localStorage right now. This is a security risk to be remedied. TODO.

Idea one, via [stackoverflow](https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js), is to "set a secure, http only cookie which only the server can read. This cookie is sent with each request and is not able to be read using javascript."


### Intentions
#### Use raw API
`Snoowrap` is a super handy library, and I'd be using it if this weren't a study project. Reddit's API is the most complicated I've used yet and I want to conquer it!


### What did I learn?
#### OAuth2 redirect flow
I'm writing an article about this. I'll link it here when it's published!

Proper URL parsing



### Misc. Lessons

#### The URL() Constructor
OAuth2 sticks parameters in the URL with a redirected user. You don't need to grab these with regex matches - use the URL() constructor!
```
// http://localhost:3000/authorized?state=fdxli1aebxcgf6ihpwjhl&code=h-KWYqs4DeJsQlEDQ5Hhf_qUdzM
new URL(window.location.href).searchParams.get("code")
```

#### Iffy
Conditional rendering statements are great.
Ternary operators are great for conditional rendering!
But without nesting, they only allow two choices. And nested T's look awful.

IIFE — Immediately-invoked function expressions — to the rescue, Via [logrocket](https://blog.logrocket.com/5-common-practices-that-you-can-stop-doing-in-react-9e866df5d269/),

{
   (() => {
      if (this.props.status === 'PENDING') {
         return (<div className="loading" />);
      }
      else {
         return (<div className="container" />);

   })()
} 
An anonymous function, made into a function expression. (Wrap) and call().
I seem to recall running into situations where I wanted more complicated conditional rendering. This seems perfect.


#### window.location.replace(...)
Redirect from javascript after constructing the URL instead of trying to pull some weird <a href=> shenannigans.

#### dotenv module for local process.env variables

#### Once again: not all variables need to live in state.
Only ones you WANT to trigger a rerender upon change. I seem to keep butting against this and causing myself all sorts of unnecessary problems with rerunning code.

### Endpoints
getAuthLink
returns fields `authLink` and `state`



### Persisting Questions
#### Where should logic go?
Server side or client side? In the reducers or in the app?

I continue to believe there's likely a best practice here that I'm unaware of. I like using server endpoints, so I think I'm a bit biased toward shifting things there. Keeping logic outside reducers might simply be more of a personal preference - I think I enjoy having all the Redux stuff be uniformly neat.

Of course, handling sensitive data should be left to the server side. That's less preferential. 



### TODOs
Fail gracefully when the user denies access