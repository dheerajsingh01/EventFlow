module.exports = (req, res, next) => {
  if (req.user?.role !== 'organizer') {
    return res.status(403).json({ message: 'Only organizers can create events' });
  }
  next();
};
