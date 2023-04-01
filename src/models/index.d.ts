import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published"
}

export enum ModelAttributeTypes {
  BINARY = "binary",
  BINARY_SET = "binarySet",
  BOOL = "bool",
  LIST = "list",
  MAP = "map",
  NUMBER = "number",
  NUMBER_SET = "numberSet",
  STRING = "string",
  STRING_SET = "stringSet",
  NULL = "_null"
}

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

type EagerPost = {
  readonly id: string;
  readonly title: string;
  readonly content?: string | null;
  readonly image?: string | null;
  readonly post_status: PostStatus | keyof typeof PostStatus;
  readonly comments?: ModelCommentConnection | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly _version: number;
  readonly _deleted?: boolean | null;
  readonly _lastChangedAt: number;
}

type LazyPost = {
  readonly id: string;
  readonly title: string;
  readonly content?: string | null;
  readonly image?: string | null;
  readonly post_status: PostStatus | keyof typeof PostStatus;
  readonly comments?: ModelCommentConnection | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly _version: number;
  readonly _deleted?: boolean | null;
  readonly _lastChangedAt: number;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post)

type EagerModelCommentConnection = {
  readonly items: (Comment | null)[];
  readonly nextToken?: string | null;
  readonly startedAt?: number | null;
}

type LazyModelCommentConnection = {
  readonly items: (Comment | null)[];
  readonly nextToken?: string | null;
  readonly startedAt?: number | null;
}

export declare type ModelCommentConnection = LazyLoading extends LazyLoadingDisabled ? EagerModelCommentConnection : LazyModelCommentConnection

export declare const ModelCommentConnection: (new (init: ModelInit<ModelCommentConnection>) => ModelCommentConnection)

type EagerComment = {
  readonly id: string;
  readonly content: string;
  readonly postID: string;
  readonly post?: Post | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly _version: number;
  readonly _deleted?: boolean | null;
  readonly _lastChangedAt: number;
}

type LazyComment = {
  readonly id: string;
  readonly content: string;
  readonly postID: string;
  readonly post?: Post | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly _version: number;
  readonly _deleted?: boolean | null;
  readonly _lastChangedAt: number;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment)

type EagerModelPostConnection = {
  readonly items: (Post | null)[];
  readonly nextToken?: string | null;
  readonly startedAt?: number | null;
}

type LazyModelPostConnection = {
  readonly items: (Post | null)[];
  readonly nextToken?: string | null;
  readonly startedAt?: number | null;
}

export declare type ModelPostConnection = LazyLoading extends LazyLoadingDisabled ? EagerModelPostConnection : LazyModelPostConnection

export declare const ModelPostConnection: (new (init: ModelInit<ModelPostConnection>) => ModelPostConnection)

