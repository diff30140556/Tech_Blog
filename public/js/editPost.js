const updateFormEl = document.querySelector('.update-form');
const deleteBtnEl = document.querySelector('.del-btn');

const updatePost = async (event) => {
  event.preventDefault();
  const title = document.querySelector(
    '.title-input'
  ).value;
  const content = document.querySelector(
    '.content-textarea'
  ).value;
  const pathName = location.pathname.split("/dashboard/post/")
  const postNum = parseInt(pathName[1])

  if (title && content) {
    const res = await fetch('/api/post', {
      method: 'PUT',
      body: JSON.stringify({ title, content, post_id: postNum }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      document.location.replace('/dashboard')
    }
  }
};

const deletePost = async (event) => {
  event.preventDefault();
  const pathName = location.pathname.split("/dashboard/post/")
  const postNum = parseInt(pathName[1])

  const res = await fetch('/api/post', {
    method: 'DELETE',
    body: JSON.stringify({ post_id: postNum }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.ok) {
    document.location.replace('/dashboard')
  }
}

updateFormEl.addEventListener('submit', updatePost);
deleteBtnEl.addEventListener('click', deletePost);
