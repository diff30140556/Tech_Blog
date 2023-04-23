const createNewPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector(
    '.title-input'
  ).value;
  const content = document.querySelector(
    '.content-textarea'
  ).value;

  if ( title && content ) {
    const res = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      document.location.replace('/dashboard')
    } 
  }
};

const postFormEl = document.querySelector('.post-form');
postFormEl.addEventListener('submit', createNewPost);
