import makeServer from './server';

(async () => {
  const server = await makeServer();

  server.listen(3000);
})();
