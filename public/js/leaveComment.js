const leaveComment = async (event) => {
  try {
    event.preventDefault();

    const comment = document.querySelector(
      '.comment-textarea'
    ).value;
    const pathName = location.pathname.split("/post/")
    const postNum = parseInt(pathName[1])

    if (comment) {
      const res = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, post_id: postNum }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        document.location.reload()
      } else {
        const message = await res.json()
        alert(message.message)
        document.location.replace('/logIn')
      }
    } else {
      return;
    }
  } catch (err) {
    console.error('Server error')
  }
};

const commentForm = document.querySelector('.comment-form');
commentForm.addEventListener('submit', leaveComment);
