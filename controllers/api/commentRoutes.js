const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userId = req.session.user_id;
    if (!req.session.logged_in) {
      res.status(401).json({message: 'Please log in first'})
      return;
    }
    const post = await Comment.create({
      comment_body: req.body.comment,
      post_id: req.body.post_id,
      user_id: userId,
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;
