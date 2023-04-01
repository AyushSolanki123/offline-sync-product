/* eslint-disable */
// this is an auto generated file. This will be overwritten
module.exports = {
    onCreatePost: () => /* GraphQL */ `
        subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
            onCreatePost(filter: $filter) {
                id
                title
                content
                image
                post_status
                comments {
                    items {
                        id
                        content
                        postID
                        createdAt
                        updatedAt
                        _version
                        _deleted
                        _lastChangedAt
                    }
                    nextToken
                    startedAt
                }
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
            }
        }
    `,
    onUpdatePost: () => /* GraphQL */ `
        subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
            onUpdatePost(filter: $filter) {
                id
                title
                content
                image
                post_status
                comments {
                    items {
                        id
                        content
                        postID
                        createdAt
                        updatedAt
                        _version
                        _deleted
                        _lastChangedAt
                    }
                    nextToken
                    startedAt
                }
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
            }
        }
    `,
    onDeletePost: () => /* GraphQL */ `
        subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
            onDeletePost(filter: $filter) {
                id
                title
                content
                image
                post_status
                comments {
                    items {
                        id
                        content
                        postID
                        createdAt
                        updatedAt
                        _version
                        _deleted
                        _lastChangedAt
                    }
                    nextToken
                    startedAt
                }
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
            }
        }
    `,
    onCreateComment: () => /* GraphQL */ `
        subscription OnCreateComment(
            $filter: ModelSubscriptionCommentFilterInput
        ) {
            onCreateComment(filter: $filter) {
                id
                content
                postID
                post {
                    id
                    title
                    content
                    image
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
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
            }
        }
    `,
    onUpdateComment: () => /* GraphQL */ `
        subscription OnUpdateComment(
            $filter: ModelSubscriptionCommentFilterInput
        ) {
            onUpdateComment(filter: $filter) {
                id
                content
                postID
                post {
                    id
                    title
                    content
                    image
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
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
            }
        }
    `,
    onDeleteComment: () => /* GraphQL */ `
        subscription OnDeleteComment(
            $filter: ModelSubscriptionCommentFilterInput
        ) {
            onDeleteComment(filter: $filter) {
                id
                content
                postID
                post {
                    id
                    title
                    content
                    image
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
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
            }
        }
    `,
};
