import { makeServer } from './server';

const { PORT } = process.env;

const server = makeServer();

server.listen(parseInt(PORT, 10), function (err) {
  if (err) {
    server.log.error(err.message);
    process.exit(1);
  }
});
