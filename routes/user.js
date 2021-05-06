const passport = require('passport');
const passportConfig = require('../config/passport');
const jwt = require('jsonwebtoken');

const router = require('express').Router();
const User = require('../models/user-model');
const Todo = require('../models/todo-model');

const signToken = userID => {
  return jwt.sign({
    iss: 'user',
    sub: userID
  }, 'secret', {expiresIn: '1d'});
};

// =======GET========
// =======POST========
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({username}, (err, user) => {
    if(err)
      res.status(500).json('Error has occured');

    if(user) 
      res.status(401).json('User already exists');
    else 
      new User({username, password, role})
        .save()
        .then(newUser => {
          res.status(201).json({
            msg: 'User created',
            newUser: {
              username: newUser.username,
              role: newUser.role
            }
          });
        })
        .catch(err => res.status(500).json(err.message));
  });
});

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  if(req.isAuthenticated()) {
    const {_id, username, role} = req.user;
    const token = signToken(_id);
    res.cookie('access_token', token, {httpOnly: true, sameSite: true});
    res.status(200).json({isAuthenticated: true, user: {username, role, token}});
  };
});

router.post('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.clearCookie('access_token');
  res.status(200).json({user: {username: '', role: ''}, success: true});
});

// =====TODO POST=====
router.post('/todo', passport.authenticate('jwt', {session: false}), (req, res) => {
  new Todo(req.body)
    .save()
    .then(todo => {
      req.user.todos.push(todo);
      req.user.save(err => {
        if(err) 
          res.status(500).json({message: 'Error has occured'});
        else 
          res.status(201).json({ message: 'Todo created.'});
      })
    })
    .catch(err => res.status(500).json(err.message));
});

router.get('/todos', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById({_id: req.user._id}).populate("todos").exec((err, doc) => {
    if(err)
      res.status(500).json(err.message);
    else 
      res.status(200).json({todos: doc.todos});
  });
});

router.get('/admin', passport.authenticate('jwt', {session: false}),(req, res) => {
  if(req.user.role === 'admin') {
    res.status(200).json({message: 'You are an admin'});
  } else {
    res.status(403).json({message: 'You are not an admin.'});
  }
});

router.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {username, role} = req.user;
  res.status(200).json({isAuthenticated: true, user: {username, role}});
});

module.exports = router;