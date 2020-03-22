export const USER_FRAGMENT = `
    fragment UserParts on User {
        id
        avatar
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

export const FULLPOST_FRAGMENT = `
    fragment on FullpostParts on FullPost {
        
    }
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            id
            name
        }
    }
`;

export const MESSAGE_FRAGMENT = `
    fragment MessageParts on Message {
        id
        text
        from {
            id
            name
        }
        to {
            id
            name
        }
    }
`;