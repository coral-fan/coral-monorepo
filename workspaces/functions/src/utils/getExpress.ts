import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

export default function getExpress() {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(cors());
  app.use(morgan('combined'));

  return app;
}
