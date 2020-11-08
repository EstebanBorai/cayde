interface BasicAuth {
  userId: string;
  password: string;
}

function basicAuth (httpHeader:string): BasicAuth {
  const [kind, token] = httpHeader.split(' ');

  if (kind.toLocaleLowerCase() !== 'basic') {
    throw new Error('invalid "Authorization" header');
  }

  const buff = Buffer.from(token, 'base64');
  const decodeCredentials = buff.toString('ascii').split(':');

  if (decodeCredentials.length !== 2) {
    throw new Error ('invalid "Authorization" header');
  }

  return {
    userId: decodeCredentials[0],
    password: decodeCredentials[1],
  }
}

export default basicAuth;