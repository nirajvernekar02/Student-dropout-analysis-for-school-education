const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
  empNo: {
    type: String,
    default: null,
  },
  usrName: {
    type: String,
    required: true,
  },
  emailUsr: {
    type: String,
    required: true,
    unique: true,
  },
  usrNumb: {
    type: Number,
    required: true,
  },
  usrPwd: {
    type: String,
    required: true,
  },
  profilePictureLink: {
    type: String,
    required: false,
  },
  is_admin: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Admin', AdminSchema);
