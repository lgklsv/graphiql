# GraphiQL

[GraphiQL](https://graphiql-sandbox.web.app/) is a powerful IDE for GraphQL APIs.

This project was created as a task on [RS School React course](https://rs.school/react/). Sandbox ships with basic features such as syntax highlighting, intelligent type ahead of fields, real-time error highlighting and reporting for queries and variables, documentation explorer, search, markdown support, the ability to configure HTTP headers, and so much more.

## Key features

- Use GraphQL API of your choice (make sure it does not have CORS)
- Run GraphQL queries, mutations
- Documentation explorer to look through API schema
- Variables and HTTP headers editors to set them on you query
- Codemirror editor with syntax highlighting and autocomplete
- Tabs to work with different queries at the same time
- Login with Firebase to save all you queries
- Prettify, copy, download tools for query and response fields
- App + codemirror shortcuts
- Two languages support (EN / RU)
- Responsive design (up to 320px)

## Screenshot

![app](https://github.com/lgklsv/graphiql/assets/101424508/c9dc7337-9a67-4275-8583-bac4ce057aa5)

## Tech stack

- Typescript
- React
- Redux / RTK Query
- GraphQL
- Firebase
- Scss
- Ant Design

## GraphQL APIs

### Default API

[Countries](https://github.com/trevorblades/countries) - 🌎 Public GraphQL API for information about countries

### Your own API

You can use your GraphQL API, just put the link into connection field. If you API does not have CORS you will be able to test it in our sandbox.

## How run locally

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/lgklsv/graphiql.git

# Go into the repository and install dependencies
$ cd graphiql
$ npm install

# Start the project
$ npm run dev

# For more commands read package.json
```
