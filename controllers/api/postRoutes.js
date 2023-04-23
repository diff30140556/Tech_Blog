const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');

// create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const user_id = req.session.user_id;
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put('/', withAuth, async (req, res) => {
  try {
    const post = await Post.update(
      {
      title: req.body.title,
      content: req.body.content,
      },
      {
        where: { id: req.body.post_id}
      }
    );

    if (!post) {
      res.status(404).json({message: "No post found by this id"})
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post
router.delete('/', withAuth, async (req, res) => {
  try {
    const post = await Post.destroy({
        where: { id: req.body.post_id}
      });
    if (!post) {
      res.status(404).json({message: "No post found by this id"})
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;