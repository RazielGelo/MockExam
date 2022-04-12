// Import base framework for route handling
const express = require('express');
const router = express.Router();

// Import Prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import bcrypt
const bcrypt = require('bcrypt');

/*---GET Routes---*/

// Render Index/Login page
router.get('/', async (req, res) => {
        
    res.render('login.pug');
});

// Render Register page
router.get('/register', async (req, res) => {
        
    res.render('register.pug');
});

// Render Lists page
router.get('/lists', ensureAuthenticated, async (req, res) => {
        
    res.render('lists.pug');
});

// Render Lists page
router.get('/createlist', ensureAuthenticated, async (req, res) => {
        
    res.render('create_list.pug');
});


/*---API Routes---*/

// Render all plants API returning JSON data
router.get('/all', async (req, res) => {
    const lists = await prisma.list.findMany({
		where: {
			listOwner: req.session.user.username
		}
	});
    res.json(lists);
});


/*---POST Routes---*/

// Register POST
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const existUser = await prisma.user.findUnique({
        where: { username: username }
    })
    try {
        if (typeof username !== 'string' || !username || !username.trim() || username.length < 5 || username.trim() !== username) {
            throw new Error(`Username isn't properly defined`)
        }

        if (typeof password !== 'string' || !password || !password.trim() || password.length < 8 || password.trim() !== password) {
            throw new Error(`Password isn't properly defined`);
        }
        if (existUser) {
            throw new Error(`${existUser.username} already exists, please choose a different username`)
        }
        if (req.body.password !== req.body.confirm_password) {
            throw new Error(`Password and Confirm password doesn't match`)
        }
        await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            }
        })
        res.render('login.pug', {
            message: "Successfully registered"
        })
    } catch (error) {
        res.render('register.pug', {
            errors: error.message
        })
    }
});

// Login POST
router.post('/', async (req, res) => {
    const {username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        if (!username || !password) {
            throw new Error(`Please input username and password`)
        }
        if (!user) {            
            throw new Error(`${username} doesn't exist`)
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            throw new Error(`Password is incorrect`)
        }
        else {            
            req.session.authenticated = true;
            req.session.user = user        
			res.redirect('/lists')
        }
    } catch (error) {
        res.render('login.pug', {
            errors: error.message
        })
    }
});

// Create List POST
router.post('/createlist', ensureAuthenticated, async (req, res) => {
	const {list_name, image, list_members } = req.body;
	const secretSanta = list_members.split(",").map(function (value) {
		return value.trim();
	});
	
	const copySecretSanta = [].concat(secretSanta)

	const hasDuplicates = (arr) => {
		return new Set(arr).size !== arr.length;
	  };

	// Shuffle names but never in the same index
	const shuffle = (items) => {
		for(var i = items.length; i-- > 1; ) {
		  var j = Math.floor(Math.random() * i);
		  var tmp = items[i];
		  items[i] = items[j];
		  items[j] = tmp;
		}
		return items;
	  }	
	shuffle(copySecretSanta)
	console.log(secretSanta)
	console.log(copySecretSanta)

	try {
		if (hasDuplicates(secretSanta)) {
			throw new Error(`List of names have duplicates`)
		}
		else {
			const list = await prisma.list.create({
				data: {
					listName: list_name,
					secretSanta: secretSanta,
					recipients: copySecretSanta,
					owner: {
						connect: {
							username: req.session.user.username
						}
					},
					image: `/images/${image}`
		
				}
		
			})
			res.render('lists.pug', {
				message: "Successfully created list",
				user: req.session.user
			})
		}	

	} catch (error) {
		res.render('create_list.pug', {
            errors: error.message,			
            user: req.session.user
        })
	}
});

// Logout
router.get('/logout', (req, res) => {
    try {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    throw new Error(`Unable to logout`)
                } else {
                    res.render('login.pug', {
                        message: "Logout successful",
                        user: null
                    })

                }
            });
        } else {
            res.end()
        }

    } catch (error) {
        res.render('login.pug', {
            errors: error.message
        })
    }
})

// Sourced from our project OpenSourceTB
// Protecting routes from being accessed if not logged in
function ensureAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        return next();
    } else {
        res.render('login.pug', {
            errors: "Please login to access this page"
        })
    }
}

module.exports = router;