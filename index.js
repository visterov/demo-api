const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json({inflate: true}));
app.use(cookieParser('secret key'))

app.use(cors({
    origin: ['https://localhost:3000','https://visterov.github.io'],
    credentials: true,
}));

let sessionLogin = null;

let postAuthorPatternConventer = (id) => {
    return {
        name: users[id].name,
        surname: users[id].surname,
        avatar: users[id].avatar,
    }
};

let users = [
    {
        id: 0,
        name: `Jegoras`,
        surname: `Vistai`,
        login: 'vistai',
        avatar: `https://d.newsweek.com/en/full/520858/supermoon-moon-smartphone-photo-picture.jpg?w=1600&h=1600&q=88&f=bb45f0cd0324ae5e04827f684a9da7e8`,
        banner: `https://i.pinimg.com/564x/47/3e/56/473e56947934767caf74558c2daf8e58.jpg`,
        status: 'CS:GO commentator, player and analyst',
        location: {
            city: 'Salt Lake City',
            state: 'UH',
            country: 'United States',
        },
        isFollowed: false,
    },
    {
        id: 1,
        name: `John`,
        surname: `Garner`,
        login: 'admin',
        avatar: `https://static6.depositphotos.com/1003369/659/i/600/depositphotos_6591667-stock-photo-close-up-of-beautiful-womanish.jpg`,
        banner: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Gl4aAcxcGLVPCuUuNA55iO0l0ovDHsfEy8OjYhmply6b2EhLqjVf2n6a_WitUsjS_AM&usqp=CAU`,
        status: '✈️ California tomorrow',
        location: {
            city: 'Salt Lake City',
            state: 'UH',
            country: 'United States',
        },
        isFollowed: true,
    },
    {
        id: 2,
        name: `Jane`,
        surname: `Heaton`,
        login: 'j.heaton',
        avatar: `https://www.datocms-assets.com/55010/1631448989-1609827493259134-modelo.jpg?auto=format%2Ccompress&cs=srgb`,
        banner: `https://cdn.pixabay.com/photo/2015/10/29/14/38/web-1012467__340.jpg`,
        status: 'Model from UK',
        location: {
            city: 'Liverpool',
            state: '',
            country: 'United Kingdom',
        },
        isFollowed: true,
    },
    {
        id: 3,
        name: `Alex`,
        surname: `Drake`,
        login: 'cooldrake',
        avatar: `https://sticker-collection.com/stickers/plain/johnnysinsbrazzers/512/c912f70a-f67f-4fe1-af3c-10b5c590047ffile_368359.webp`,
        banner: `https://t4.ftcdn.net/jpg/04/67/92/91/360_F_467929117_kAYW6tFAxAFE1PteYPbSpguPQNNNfVkr.jpg`,
        status: 'playing Call of Duty: Modern Warfare',
        location: {
            city: 'Ogden',
            state: 'UH',
            country: 'United States',
        },
        isFollowed: true,
    },
    {
        id: 4,
        name: `Jakub`,
        surname: `Mathis`,
        login: 'j.mathis',
        avatar: `https://m.media-amazon.com/images/I/61GLqTPhoJL._AC_UL400_.jpg`,
        banner: `https://t4.ftcdn.net/jpg/04/67/92/91/360_F_467929117_kAYW6tFAxAFE1PteYPbSpguPQNNNfVkr.jpg`,
        status: '',
        location: {
            city: 'Dallas',
            state: 'TX',
            country: 'United States',
        },
        isFollowed: true,
    },
    {
        id: 5,
        name: `Elisabeth`,
        surname: `Plummer`,
        login: 'e.plumer',
        avatar: `https://blogforlife.org/wp-content/uploads/2022/05/post_0700_0_debora-lombardi-flower.jpg`,
        banner: `https://t4.ftcdn.net/jpg/04/67/92/91/360_F_467929117_kAYW6tFAxAFE1PteYPbSpguPQNNNfVkr.jpg`,
        status: '',
        location: {
            city: 'New York City',
            state: 'NY',
            country: 'United States',
        },
        isFollowed: true,
    },
    {
        id: 6,
        name: `Michael`,
        surname: `Smith`,
        login: 'smith1987',
        avatar: `https://i.guim.co.uk/img/media/b3f9db5d504c00304c37724927b6e407da17c36b/0_197_5850_3511/master/5850.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=87966753ed0906994f60f72735295414`,
        banner: `https://t4.ftcdn.net/jpg/04/67/92/91/360_F_467929117_kAYW6tFAxAFE1PteYPbSpguPQNNNfVkr.jpg`,
        status: 'tierschutzbund.de',
        location: {
            city: 'Munich',
            state: '',
            country: 'Germany',
        },
        isFollowed: false,
    },
];

let usersPosts = {
    "posts-user-0": [
        {
            id: 1,
            author: postAuthorPatternConventer(1),
            message: `Hey. How are you feeling today?`,
            likeCount: 20
        },
        {
            id: 2,
            author: postAuthorPatternConventer(6),
            message: `I finished my album. Go check it out!`,
            likeCount: 34
        },
        {
            id: 3,
            author: postAuthorPatternConventer(3),
            message: `I'm going on a picnic. Do you wanna join?`,
            likeCount: 1
        },
    ],
    "posts-user-1": [],
    "posts-user-2": [],
    "posts-user-3": [],
    "posts-user-4": [],
    "posts-user-5": [],
    "posts-user-6": [],
};

let usersResponseCreator = (page, count) => {
    let items = [];
    [...users].splice(page * count - count, count).map(i => {
        items.push({
            id: i.id,
            name: i.name,
            surname: i.surname,
            avatar: i.avatar,
            status: i.status,
            location: {
                city: i.location.city,
                state: i.location.state,
                country: i.location.country
            },
            isFollowed: i.isFollowed,
        });
    });
    return {
        items: items,
        totalCount: users.length,
    };
};

let profileResponseCreator = (user) => {
    let items = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        avatar: user.avatar,
        banner: user.banner,
        status: user.status,
        location: {
            city: user.location.city,
            state: user.location.state,
            country: user.location.country
        },
    };
    let posts = usersPosts[`posts-user-${user.id}`];

    return {
        items,
        posts
    };
}

let loginResponseCreator = (user, loginStatus) => {
    if (loginStatus) {
        return {
            resultCode: 0,
            loginData: {
                id: user.id,
                login: user.login,
                name: user.name,
                surname: user.surname,
            }
        }
    } else {
        return {
            resultCode: 1,
            message: "Incorrect login!"
        }
    }

};

let followResponseCreator = (method, loginStatus, followStatus = null) => {
    if (method === 'GET') {
        return {
            value: followStatus
        }
    }

    if (loginStatus) {
        return {
            resultCode: 0,
            followStatus,
            message: 'OK'
        }
    } else {
        return {
            resultCode: 1,
            message: "You're not authorized!"
        }
    }
}

let statusResponseCreator = (method, userProfileStatus, loginStatus = false) => {
    if (method === 'GET') {
        return {
            value: userProfileStatus
        }
    }

    if (method === 'PUT') {
        if (loginStatus) {
            return {
                resultCode: 0,
                message: 'OK'
            }
        } else {
            return {
                resultCode: 1,
                message: "You're not authorized!"
            }
        }
    }
}

app.get('/', (req, res) => {
    res.send('ReactSocial API');
});

app.get('/api/1.0/users', (req, res) => {
    let page = req.query.page || 1;
    let count = req.query.count || 2;

    if (count <= 50) {
        res.json(usersResponseCreator(page, count));
    } else {
        res.json({message: 'Maximum count is 50!'})
    }
});

app.get('/api/1.0/profile/:id', (req, res) => {
	const user = users.find(u => u.id === +req.params.id);

	if (user) {
		res.json(profileResponseCreator(user));
	} else {
		res.json({message: 'No such /profile method.'});
	}
});

app.get('/api/1.0/profile/status/:id', (req, res) => {
    const user = users.find(u => u.id === +req.params.id);

    if (user) {
        res.json(statusResponseCreator('GET', user.status));
    } else {
        res.json({message: "User not found"});
    }
});

app.put('/api/1.0/profile/status/', (req, res) => {
    if (sessionLogin) {
        let user = users.find(u => u.login === sessionLogin);
        const userIndex = users.indexOf(user);
        users[userIndex] = {...user, ...req.body};
        res.json(statusResponseCreator('PUT', null, true));
    } else {
        res.json(statusResponseCreator('PUT', null, false));
    }
});

app.post('/api/1.0/profile/posts', (req, res) => {
    if (sessionLogin) {
        let user = users.find(u => u.login === sessionLogin);
        let posts = usersPosts[`posts-user-${req.body.id}`]

        posts.push(
            {
                id: posts.length + 1,
                author: postAuthorPatternConventer(user.id),
                message: req.body.message,
                likeCount: 0
            }
        );

        res.json({resultCode: 0, message: 'OK', data: {posts}});
    } else {
        res.json({resultCode: 1, message: "You're not authorized"});
    }
});

app.post('/api/1.0/auth/login', (req, res) => {
    let login = req.body.login;
    let user = users.find(u => u.login === login);

    if (user) {
        sessionLogin = login

        res.json(loginResponseCreator(user, true));
    } else {
        res.json(loginResponseCreator(null, false));
    }
});

app.delete('/api/1.0/auth/login', (req, res) => {
    if (sessionLogin) {
        sessionLogin = null;
    }

    if (!sessionLogin) {
        res.json({resultCode: 0, message: 'OK'});
    } else {
        res.json({resultCode: 1, message: 'Something went wrong'});
    }
});

app.get('/api/1.0/auth/me', (req, res) => {
    if (sessionLogin) {
        let user = users.find(u => u.login === sessionLogin);
        res.json(loginResponseCreator(user, true));
    } else {
        res.json(loginResponseCreator(null, false));
    }
});

app.get('/api/1.0/follow/:id', (req, res) => {
    let userFollow = users.find(u => u.id === +req.params.id).isFollowed;

    res.json(followResponseCreator('GET', sessionLogin, userFollow));
});

app.post('/api/1.0/follow/:id', (req, res) => {
    let userToFollow = users.find(u => u.id === +req.params.id);

    if (sessionLogin) {
        let user = users.find(u => u.login === sessionLogin);
        userToFollow.isFollowed = true;
        res.json(followResponseCreator('POST', true, userToFollow.isFollowed));
    } else {
        res.json(followResponseCreator('POST', false));
    }
});

app.delete('/api/1.0/follow/:id', (req, res) => {
    let userToFollow = users.find(u => u.id === +req.params.id);

    if (sessionLogin) {
        userToFollow.isFollowed = false;
        res.json(followResponseCreator('DELETE', true, userToFollow.isFollowed));
    } else {
        res.json(followResponseCreator('DELETE', false));
    }
});

app.listen(PORT, () => console.log('Listening on port 5000'));