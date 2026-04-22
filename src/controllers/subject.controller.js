const Subject = require('../models/Subject.model');

exports.createSubject = async (req, res) => {
  const subject = await Subject.create({
    ...req.body,
    tutorId: req.user.id
  });

  res.json(subject);
};

exports.getSubjects = async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
};

exports.searchSubjects = async (req, res) => {
  const { q } = req.query;

  const subjects = await Subject.find({
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ]
  });

  res.json(subjects);
};
exports.addMaterial = async (req, res) => {
  const { subjectId, fileUrl } = req.body;

  const subject = await Subject.findById(subjectId);

  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  subject.materials.push(fileUrl);
  await subject.save();

  res.json(subject);
};