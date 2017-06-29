// Auth - login

const Boom = require('boom');
const User = require('../../model/user');
const Token = require('../../model/token');
const Config = require('../../config/config');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('node-uuid');

module.exports = (request, reply) => {
    var queryObj = {};
    if(request.payload.username){
        queryObj = { username: request.payload.username };
    }else if(request.payload.email){
        queryObj = { email: request.payload.email };
    }
    User.where(queryObj).fetch({withRelated:['claims']})
        .then((user) => {
            if (!user) {
                reply(Boom.badRequest('Incorrect username or email!'));
            }
            bcrypt.compare(request.payload.password, user.get('password'), (err, isValid) => {

                if (err){
                    reply(Boom.badRequest('Invalid username or email!'));
                }
                else if (isValid) {
                    var userClaims = user.related('claims').toJSON();
                    const scopes = userClaims.map(item => item.claim)
                    .filter((value, index, self) => self.indexOf(value) === index);
                    console.log(scopes);
                    const secret = Config.get('/jwtAuth/secret');
                    const jti = uuid.v4();
                    const jwtToken = Jwt.sign({
                        jti: jti,
                        email: user.get('email'),
                        username: user.get('username'),
                        user_id: user.get('id'),
                        role: user.get('role'),
                        scopes: scopes,
                        issuer: 'OpenCRVS'
                    },
                    secret, { expiresIn: '1h' }
                    );
                    Token.forge({  
                        'jti': jti,
                        'token': jwtToken
                    }).save()
                    .then(function(model) {
                        reply('{"token" ' + JSON.stringify(jwtToken) + '}');
                    }).catch(function(err) {
                        reply(Boom.badImplementation('terrible implementation on token: '+err));
                    });
                }
            });
        })
        .catch((err) => {

            if (err){
                reply(Boom.badImplementation('terrible implementation on user '+err));
            }
        });
};
