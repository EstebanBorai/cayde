# whizzes

### Development

This application makes use of Docker and Docker Compose for execution.

```bash
# if your docker version is up to date run
docker compose up --build

# otherwise run
docker-compose up --build
```

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