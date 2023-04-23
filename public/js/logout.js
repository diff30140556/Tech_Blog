const logout = async (e) => {
  e.preventDefault();
  
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  }
};

document
  .querySelector('nav #logout')
  .addEventListener('click', logout);
document
  .querySelector('.sidenav #logout')
  .addEventListener('click', logout);