# Grizzly
## An Open Source alternative for BearApp/OneNote

![Presentation](https://raw.githubusercontent.com/lveteau/Grizzly-app/master/screen/app.png)

## Features
- Written in simple and plain JavaScript. Easy to use, easy to contribute.
- No installation necessary
- User Friendly
- You manage and keep your own data
- Did I say that it work everywhere, even on FreeBSD ?

## Setup / How to launch

**Please be aware, it's a development version and not suitable for personal use right now.**

There is two parts: The server and the client.

#### Requirements:
    - NodeJs (The more is it up to date, the better it is)
    - MongoDB (Again, latest version available)
  
### Setup the server

### Installation

Make a ``grizzly`` database in mongodb, then, create a ``notes`` collection

*Temporary: Add one entry in this collection (if you don't it won't work):*
```js
{
    "title" : "test",
    "content" : "test",
    "tags" : [ 
        "test"
    ]
}
```
Go into /api (``cd api``) and run ``npm i``, it will install all the needed dependencies. Once finished, run the server with ``npm run start`` !

### Setup the client:
This part is a bit easier, go into /app (``cd app``) and run ``npm i``, then type ``npm run dev`` and voila !

If you correctly setup the mongo database, you should see a "Test" note, and now you're good !


## How to use

Right now, it work with a not so user friendly tag system. If you want to create a "todo" tag, you need to create a new note, then change the tag to "todo". Hit the refresh key (f5) and you should see your newly created tag.

Sometimes, it won't refresh when you create/delete/update note, if so, hit f5 again

## Contributing

I'll be seriously happy to recieve issues/pull request !
Right now, I don't impose you some template, simply make a new branch with an explicit name and do what you want. Same with the issue, simply describe what you need/what's happening.

### Todolist:

- Correct refresh when update/delete
- Be able to create a note without the needs of already having one
- Better tag management system (same as it is right now but stylized ?)
- User management, be able to have multiple protected user on the same server instance
- Respect api url convention 
- Remove the alt menu
- Some settings page (we'll need vue router), to change:
    - database url
    - username
    - user profile picture ?
    - password
- About page
