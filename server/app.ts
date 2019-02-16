import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

const app = express();

app.get('/api/:year/:month', (req, res) => {
  /**
   * An example of handling query parameters and bad requests:
   */
  // const { filterString } = req.query;

  // if (!filterString) {
  //   res.statusMessage = `Must provide a filterString query parameter.`;
  //   res.sendStatus(HttpStatus.BAD_REQUEST);
  //   return;
  // }

    fs.readFile(path.join(`${__dirname}/events.json`),'utf8', (err, dataArg) => {
      if (err) throw err;
      const obj = JSON.parse(dataArg);
      const data = obj['data'];
      const monthData = new Array();
      data.map((obj : object) => {
        const launch_date = new Date(obj['launch_date']);
        const year = req.params.year;
        const month = req.params.month;

        if (launch_date.getFullYear() == year &&
            launch_date.getMonth() + 1 == month) {
              monthData.push(obj);
        }
      });
      res.json(monthData);
    });
  });

  app.get('/data', (req, res) => {
    res.sendFile(path.join(`${__dirname}/events.json`));
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  });

/**
 * These endpoints are used for deploying the Heroku app, which serves
 * both the server and client. Testing the client locally should be done
 * with the CRA server, which proxies requests to this server for /api, but serves
 * the content separately for HMR.
 */
app.use('/static', express.static(path.join(`${__dirname}/build/static`)));
app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

export default app;
