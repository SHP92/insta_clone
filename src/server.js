import './env';
import { prisma } from '../generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import { schema } from './schema';
import passport from 'passport';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middleware';
import uploads from './upload';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema, context: ({ request }) => ({ request, isAuthenticated })});
server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/uploads', uploads.single('file'), (req, res) => {
    const { file } = req;
    res.json({
        location: file.location
    })
});

server.start({ port:PORT }, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})