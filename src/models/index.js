// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MEMBER } = initSchema(schema);

export {
  MEMBER
};