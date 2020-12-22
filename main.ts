import { makeServer } from './server';

const server = makeServer();

server.listen(parseInt(process.env.PORT, 10), function (err) {
  if (err) {
    server.log.error(err.message);
    process.exit(1);
  }
});
