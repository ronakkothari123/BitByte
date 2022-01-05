# API Docs (yay!)

This API has three main routes, namely `/user`, `/draft`, and `/trophies`

This documentation will go over the various endpoints and their respective requirements.

## Types

### Draft

This represents a draft which the user can choose.

**Specifics**:

`name`: the name of the player being drafted

`team`: the team of the player being drafted

`user`: the id of the user which this draft belongs to. Null if no user owns this draft.

Eg.

```js
const draft = {
    name: "Brian Lara",
    team: "West Indies",
    user: "4",
};
```

### Trophies

This is technically not a type but it has some special formatting. The trophies a user has is represented using a string in the form `x-y-z`, where x represents the number of ultimate trophies, y represents the number of silver trophies, and z represents the number of league trophies.

For Example,
this particular user would have 3 ultimate trophies, 4 silver trophies, and 5 league trophies.

```js
const user = {
    username: "Bob",
    password: "XXXXX",
    drafts: [],
    trophies: "3-4-5",
};
```

### User

This type represents a standard user of BitByte.

**Specifics**:

`id`: a unique identifier given to each user upon creation

`username`: the username of the user

`password`: the password of the user, hashed using [argon2](https://github.com/ranisalt/node-argon2)

`name`: the user's real name

`drafts`: a list of the user's current drafts

`trophies`: a string representing the number of trophies a user has.

## User Endpoints

Most POST endpoints return error objects as well as the expected objects\*.

Be sure to check for errors!

| Route            | Type | Body                             | Response                                          |
| ---------------- | ---- | -------------------------------- | ------------------------------------------------- |
| `/user/`         | GET  | None                             | An array of all users created                     |
| `/user/:id`      | GET  | None                             | A user object with the id you specified           |
| `/user/me`       | GET  | None                             | The current logged in user (stored using cookies) |
| `/user/register` | POST | `{username, password, realName}` | The username of the created user.                 |
| `/user/login`    | POST | `{username, password}`           | The username and id of the user                   |
| `/user/delete`   | POST | `{username, password}`           | Success status (boolean)                          |

Some example requests are shown below

```js
// Get All Users
const data = await (await fetch("https://bitbyte.api.com/user")).json();

foreach (const user of data) {
    // Do something cool
}
```

```js
// Sign a User Up
const data = await (
    await fetch("https://bitbyte.api.com/user/register", {
        username: "Bob",
        password: "XXXX",
    })
).json();

console.log(data.name);
```
