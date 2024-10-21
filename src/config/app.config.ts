import { config } from 'dotenv';
import * as joi from 'joi';
config();

interface EnvVars {
  PORT: number;
  RABBITMQ_URL: string;
  TICKETS_MS_RABBITMQ_QUEUE: string;
  AUTH_MS_RABBITMQ_QUEUE: string;
  USERS_MS_RABBITMQ_QUEUE: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    RABBITMQ_URL: joi.string().required(),
    TICKETS_MS_RABBITMQ_QUEUE: joi.string().required(),
    AUTH_MS_RABBITMQ_QUEUE: joi.string().required(),
    USERS_MS_RABBITMQ_QUEUE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(error.message);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  rabbitMqUrl: envVars.RABBITMQ_URL,
  ticketsMsRabbitMqQueue: envVars.TICKETS_MS_RABBITMQ_QUEUE,
  authMsRabbitMqQueue: envVars.AUTH_MS_RABBITMQ_QUEUE,
  usersMsRabbitMqQueue: envVars.USERS_MS_RABBITMQ_QUEUE,
};
