/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports = {
    createPost: `
        mutation CreatePost(
            $input: CreatePostInput!
            $condition: ModelPostConditionInput
        ) {
            createPost(input: $input, condition: $condition) {
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
                _deleted
            }
        }
    `,
    updatePost: `
        mutation UpdatePost(
            $input: UpdatePostInput!
            $condition: ModelPostConditionInput
        ) {
            updatePost(input: $input, condition: $condition) {
                id
                title
                content
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
    deletePost: `
        mutation DeletePost(
            $input: DeletePostInput!
            $condition: ModelPostConditionInput
        ) {
            deletePost(input: $input, condition: $condition) {
                id
                title
                content
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
    createComment: `
        mutation CreateComment(
            $input: CreateCommentInput!
            $condition: ModelCommentConditionInput
        ) {
            createComment(input: $input, condition: $condition) {
                id
                content
                postID
                post {
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
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
            }
        }
    `,
    updateComment: `
        mutation UpdateComment(
            $input: UpdateCommentInput!
            $condition: ModelCommentConditionInput
        ) {
            updateComment(input: $input, condition: $condition) {
                id
                content
                postID
                post {
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
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
            }
        }
    `,
    deleteComment: `
        mutation DeleteComment(
            $input: DeleteCommentInput!
            $condition: ModelCommentConditionInput
        ) {
            deleteComment(input: $input, condition: $condition) {
                id
                content
                postID
                post {
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
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
            }
        }
    `,
};
