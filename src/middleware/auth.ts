export function auth (req, res, next) {
  if(!req.session.user) {
      console.log(req.session.user);
      let err = new Error('You are not authenticated!');
      return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      let err = new Error('You are not authenticated!');
      return next(err);
    }
  }
};
