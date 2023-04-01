/* eslint-disable */
// this is an auto generated file. This will be overwritten
module.exports = {
    getPost: `
        query GetPost($id: ID!) {
            getPost(id: $id) {
                id
                title
                content
                
                post_status
                comments {
                    items {
                        id
                        content
                        postID
                    }
                    nextToken
                    startedAt
                }
                createdAt
                updatedAt
                _deleted
            }
        }
    `,
    listPosts: `
        query ListPosts(
            $filter: ModelPostFilterInput
            $limit: Int
            $nextToken: String
        ) {
            listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
                items {
                    id
                    title
                    content
                    post_status
                    comments {
                        nextToken
                        startedAt
                    }
                    createdAt
                    updatedAt
                    _version
                    _deleted
                    _lastChangedAt
                }
                nextToken
                startedAt
            }
        }
    `,
    syncPosts: `
        query SyncPosts(
            $filter: ModelPostFilterInput
            $limit: Int
            $nextToken: String
            $lastSync: AWSTimestamp
        ) {
            syncPosts(
                filter: $filter
                limit: $limit
                nextToken: $nextToken
                lastSync: $lastSync
            ) {
                items {
                    id
                    title
                    content
                    
                    post_status
                    comments {
                        nextToken
                        startedAt
                    }
                    createdAt
                    updatedAt
                    _version
                    _deleted
                    _lastChangedAt
                }
                nextToken
                startedAt
            }
        }
    `,
    getComment: `
        query GetComment($id: ID!) {
            getComment(id: $id) {
                id
                content
                postID
                post {
                    id
                    title
                    content                    
                    post_status
                }
            }
        }
    `,
    listComments: `
        query ListComments(
            $filter: ModelCommentFilterInput
            $limit: Int
            $nextToken: String
        ) {
            listComments(
                filter: $filter
                limit: $limit
                nextToken: $nextToken
            ) {
                items {
                    id
                    content
                    postID
                    post {
                        id
                        title
                        content
                        
                        post_status
                        createdAt
                        updatedAt
                        _version
                        _deleted
                        _lastChangedAt
                    }
                    createdAt
                    updatedAt
                    _version
                    _deleted
                    _lastChangedAt
                }
                nextToken
                startedAt
            }
        }
    `,
    syncComments: `
        query SyncComments(
            $filter: ModelCommentFilterInput
            $limit: Int
            $nextToken: String
            $lastSync: AWSTimestamp
        ) {
            syncComments(
                filter: $filter
                limit: $limit
                nextToken: $nextToken
                lastSync: $lastSync
            ) {
                items {
                    id
                    content
                    postID
                    post {
                        id
                        title
                        content
                        
                        post_status
                        createdAt
                        updatedAt
                        _version
                        _deleted
                        _lastChangedAt
                    }
                    createdAt
                    updatedAt
                    _version
                    _deleted
                    _lastChangedAt
                }
                nextToken
                startedAt
            }
        }
    `,
    commentsByPostIDAndContent: `
        query CommentsByPostIDAndContent(
            $postID: ID!
            $content: ModelStringKeyConditionInput
            $sortDirection: ModelSortDirection
            $filter: ModelCommentFilterInput
            $limit: Int
            $nextToken: String
        ) {
            commentsByPostIDAndContent(
                postID: $postID
                content: $content
                sortDirection: $sortDirection
                filter: $filter
                limit: $limit
                nextToken: $nextToken
            ) {
                items {
                    id
                    content
                    postID
                    post {
                        id
                        title
                        content
                        
                        post_status
                        createdAt
                        updatedAt
                        _version
                        _deleted
                        _lastChangedAt
                    }
                    createdAt
                    updatedAt
                    _version
                    _deleted
                    _lastChangedAt
                }
                nextToken
                startedAt
            }
        }
    `,
};
