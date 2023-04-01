// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PostStatus = {
  "DRAFT": "draft",
  "PUBLISHED": "published"
};

const ModelAttributeTypes = {
  "BINARY": "binary",
  "BINARY_SET": "binarySet",
  "BOOL": "bool",
  "LIST": "list",
  "MAP": "map",
  "NUMBER": "number",
  "NUMBER_SET": "numberSet",
  "STRING": "string",
  "STRING_SET": "stringSet",
  "NULL": "_null"
};

const ModelSortDirection = {
  "ASC": "ASC",
  "DESC": "DESC"
};

const { Post, ModelCommentConnection, Comment, ModelPostConnection } = initSchema(schema);

export {
  PostStatus,
  ModelAttributeTypes,
  ModelSortDirection,
  Post,
  ModelCommentConnection,
  Comment,
  ModelPostConnection
};