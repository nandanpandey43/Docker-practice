const express = require('express');
const client = require('prom-client');
const responseTime = require('response-time')
const { createLogger, transports, log } = require("winston");
const LokiTransport = require("winston-loki");


const app = express();
const port = 4000;

const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
};
const logger = createLogger(options);


// Create a Registry
const register = new client.Registry();

// Enable collection of default metrics
client.collectDefaultMetrics({ register });

// Example custom metric
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestsTotal);


const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "this tell req res time taken",
  labelNames: ["method", "route", "status_code"],
  buckets: [1,2,3,4,5,6]
})
register.registerMetric(reqResTime);


app.use(responseTime((req, res, time)=> {
  reqResTime.labels({
    method: req.method,
    route: req.url,
    status_code: res.statusCode
  }).observe(time);
}))


// Middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Example route
app.get('/', (req, res) => {
  logger.info("root route")
  res.send('Hello World!');
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  logger.info("metrics route")
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  logger.info("Server started")
  console.log(`Node.js server listening at http://localhost:${port}`);
});
