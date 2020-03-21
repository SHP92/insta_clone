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