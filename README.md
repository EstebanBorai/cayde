# cayde

## About the name

The name is inspired in Destiny's (The Game), Cayde-6 character.

## Development

Theres two ways to run this project either by using Docker (Docker Compose)
or using straight NodeJS commands

### Running with NodeJS (Yarn)

```bash
# install dependencies using `yarn install`
yarn install

# run local development environment
yarn dev

# this output should be printed to stdout

yarn dev
yarn run v1.22.10
$ NEXT_TELEMETRY_DISABLED=1 NODE_ENV=development DEBUG=knex.* env-cmd ts-node-dev --ignore-watch ./src/infrastructure/client --transpile-only ./src/infrastructure/server/main.ts
[INFO] 20:17:57 ts-node-dev ver. 1.1.6 (using ts-node ver. 9.1.1, typescript ver. 4.2.3)
{"level":30, "msg":"Server listening at http://0.0.0.0:3000"}
                                 ▄▄
                               ▀███
                                 ██
 ▄██▀██ ▄█▀██▄ ▀██▀   ▀██▀  ▄█▀▀███   ▄▄█▀██
██▀  ████   ██   ██   ▄█  ▄██    ██  ▄█▀   ██
██      ▄█████    ██ ▄█   ███    ██  ██▀▀▀▀▀▀
██▄    ▄█   ██     ███    ▀██    ██  ██▄    ▄
 █████▀▀████▀██▄   ▄█      ▀████▀███▄ ▀█████▀
                 ▄█
               ██▀
info  - Using webpack 4. Reason: future.webpack5 option not enabled https://nextjs.org/docs/messages/webpack5
info  - Using external babel configuration from cayde/.babelrc
event - compiled successfully
```

### Running with Docker

This application makes use of Docker and Docker Compose for execution.

```bash
# if your docker version is up to date run
docker compose up --build

# otherwise run
docker-compose up --build
```

### Project Structure and Architecture

This application is built with Domain Driven Design in mind.

- The source code for the bussines logic lives in `src/modules`.
- The source code for the Front-End and the Back-End lives in `src/infrastructure`,
client and server respectively.
- The configurations, such as database connection parameters lives in `src/config`.
- Global type definitions for TypeScript lives in `@types`. Keep in mind tha client
also defines its own types for the `client/` directory.
- `common` directory contains reusable code for the whole project

### Styles

The styles of this project are implemented using TailwindCSS along with styled-components.
To have a nice mix and usage twin.macro is used as well, this help us build components
like this in ReactJS:

```typescript
import React from 'react';
import tw, { styled, css, theme } from 'twin.macro';

type Props = {
  variant: 'primary' | 'secondary';
  isSmall?: boolean;
}

const Button = styled.button(({ variant, isSmall }: Props) => [
  tw`px-8 py-2 rounded focus:outline-none transform duration-75`,
  tw`hocus:(scale-105 text-yellow-400)`,
  variant === 'primary' && tw`bg-black text-white border-black`,
  variant === 'secondary' && [
    css`
      box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
    `,
    tw`border-2 border-yellow-600`,
  ],
  isSmall ? tw`text-sm` : tw`text-lg`,
  css`
    color: ${theme`colors.white`};
  `,
]);

export default Button
```
[Here is a example project by Ben Rogerson (Twin Macro Author) on NextJS](https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components)

### Debugging

In order to debug the application, you must run the `debug` script as follows:

```shell
yarn debug
```

When the output is printed to the stdout, you must attach to the NodeJS process,
either using Google Chrome DevTools, Visual Studio Code, or your favorite debugging
tool.

If you are using Visual Studio Code, you can create a `.vscode/launch.json` file in
the project root directory (this directory), and paste the following bytes to the
file:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Process",
      "type": "node",
      "request": "attach",
      "port": 9229
    }
  ]
}
```

Then after running `yarn debug` successfully, you must initialize the debugger,
using the built-in Visual Studio Code debugger, by running the "Attach to process"
task.