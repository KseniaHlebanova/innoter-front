const fs = require('fs');
require('dotenv').config();

const template = fs.readFileSync('./public/env.template.js', 'utf-8');
const result = template
    .replace('${API_URL}', process.env.API_URL || 'http://localhost:8000')
    .replace('${SENTRY_DSN}', process.env.SENTRY_DSN || '')
    .replace('${APP_MODE}', process.env.APP_MODE || 'dev');


fs.writeFileSync('./public/env.js', result);