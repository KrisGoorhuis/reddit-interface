User login via OAuth2. Should allow us to fetch a subscription list, view just subscribed subreddits. I would assume.

pagination of results

Slidey animations?


### What did I learn?
OAuth2 redirect flow
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



### Endpoints
getAuthLink
returns fields `authLink` and `state`

