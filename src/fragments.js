export const USER_FRAGMENT = `
    fragment UserParts on User {
        id
        name
        email
        bio
        posts {
            id
            caption
        }
        followers {
            id
            name
            email
        }
        followings {
            id
            name
            email
        }
    }
`;

export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment {
        id
        text
        user {
            name
        }
    }
`;