# API Docs (yay!)

This API has three main routes, namely `/user`, `/draft`, and `/trophies`

This documentation will go over the various endpoints and their respective requirements.

## Types

### Draft

This represents a draft which the user can choose.

```TypeScript
class Draft {
    name: string,
    team: string,
    user: number
}
```

The user property of the draft object is usually an integer, representing the user's id.

Eg.

```js
const draft = {
    name: "Brian Lara",
    team: "West Indies",
    user: 4,
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

```ts
class User {
    id: number,
    username: string,
    password: string,
    name: string,
    drafts: Draft[],
    trophies: string,
}
```

### Errors

If a request returns errors, they are placed in an array, with each error being of the following format

```js
class ErrorElement {
    field: string;
    message: string;
}
```

An example response with an error

```js
{
    errors: [
        {
            field: "username",
            error: "that username does not exist",
        },
    ];
}
```

The password of the user is hashed using [argon2](https://github.com/ranisalt/node-argon2)

## User Endpoints

**Note**: Most [user](#user) endpoints return [error objects](#errors) as well as the expected objects\*.

Be sure to check for errors!

| Route            | Type | Body                             | Response                                          |
| ---------------- | ---- | -------------------------------- | ------------------------------------------------- |
| `/user/`         | GET  | None                             | An array of all users created                     |
| `/user/:id`      | GET  | None                             | A user object with the id you specified           |
| `/user/me`       | GET  | None                             | The current logged in user (stored using cookies) |
| `/user/register` | POST | `{username, password, realName}` | The username of the created user.                 |
| `/user/login`    | POST | `{username, password}`           | The username and id of the user                   |
| `/user/delete`   | POST | `{username, password}`           | Success status (boolean)                          |

Some example requests are shown below\*\*

```js
// Get All Users
const data = await (await fetch("https://bitbyte.api.com/user")).json();

foreach (const user of data) {
    // Do something cool
}
```

```js
// Sign a User Up

const body = {
    username: "bob",
    password: "xxxx",
};

const data = await (
    await fetch("https://bitbyte.api.com/user/register", {
        method: "POST",
        body: JSON.stringify(body),
    })
).json();

if (data.errors) {
    // Handle Error
} else {
    // Handle Success
}
```

\* CORS has not been setup yet

\*\*The example requests do not include important details such as CORS

## Draft Endpoints

[Draft](#draft) endpoints will return [error objects](#errors) as well.

| Route           | Type | Body                          | Response                      |
| --------------- | ---- | ----------------------------- | ----------------------------- |
| `/draft/all`    | GET  | None                          | All created drafts            |
| `/draft/add`    | POST | `{draft: {name, team}, user}` | An array of the user's drafts |
| `/draft/remove` | POST | `{draft: {name, team}, user}` | An array of the user's drafts |

When adding a draft, if it is not present in the database, it is automatically created and stored in the database.

An exchange route will be added so that draft trading in possible in one call.
