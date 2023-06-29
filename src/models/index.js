// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TEST, MEMBER } = initSchema(schema);

export {
  TEST,
  MEMBER
};