export const isAuthenticated = request => {
    if (!request.user) {
        throw Error('need to login : authentification error');
    }
    return;
};