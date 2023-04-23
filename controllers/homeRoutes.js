const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// main page, get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
          model: User,
          attributes: ["user_name"]
        }],
    });
    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    res.status(200).render('homePage',{
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// single post page, get specific post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["user_name"]
        },
        {
          model: Comment,
          include: [{
            model: User,
            attributes: ["user_name"]
          }] 
        }
      ],
    });
    
    if (!postData) {
      res.status(404).json({message: "No post found by this id"})
    } else {
      const postDetail = postData.get({ plain: true });
      res.status(200).render('postPage',{
        postDetail,
        logged_in: req.session.logged_in,
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// sign in, sign up page
router.get('/logIn', async (req, res) => {
  try {
    res.render('logInPage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const myPostsData = await Post.findAll({
      where: { user_id: userId }
    });
    const myPosts = myPostsData.map((myPost) =>
      myPost.get({ plain: true })
    );
    const isAny = !!myPosts.length
    res.render('dashboardPage', {
      logged_in: req.session.logged_in,
      myPosts,
      isAny: isAny
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new post page
router.get('/dashboard/newPost', withAuth, async (req, res) => {
  try {
    res.render('editPostPage', {
      logged_in: req.session.logged_in,
      isNewPost: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit my specific post page
router.get('/dashboard/post/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      res.status(404).json({message: "No post found by this id"})
    } else {
      const postDetail = post.get({ plain: true });
      res.status(200).render('editPostPage',{
        postDetail,
        logged_in: req.session.logged_in,
        isNewPost: false
      })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;