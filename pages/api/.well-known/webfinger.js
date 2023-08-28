export default function handler(req, res) {
  const host = 'mastodon.gamedev.place';
  const handle = 'amano';
  const data = {
    subject: `acct:${handle}@${host}`,
    aliases: [`https://${host}/@${handle}`, `https://${host}/users/${handle}`],
    links: [
      {
        rel: 'http://webfinger.net/rel/profile-page',
        type: 'text/html',
        href: `https://${host}/@${handle}`,
      },
      {
        rel: 'self',
        type: 'application/activity+json',
        href: `https://${host}/users/${handle}`,
      },
      {
        rel: 'http://ostatus.org/schema/1.0/subscribe',
        template: 'https://mastodon.social/authorize_interaction?uri={uri}',
      },
    ],
  };

  res.status(200).json(data);
}
