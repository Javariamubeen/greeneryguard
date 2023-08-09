const Enquiry = require('../../../models').enquiries;
const User = require('../../../models').users;
const {
  handle404,
} = require("../../../components/errors");

exports.create = (request, response) => {
  const newEnquiry = request.body;
  Enquiry.create(newEnquiry)
  .then(enquiry => response.status(201).send(enquiry))
  .catch(error => response.status(400).send(error));
};

exports.listEnquiries = (request, response) => {
  const businessId = request.query.id;
  let whereClause = {};
  if (businessId) {
    whereClause.businessId = businessId;
  }
  Enquiry.findAll({
    where:whereClause, include: [User]
  }).then(data => response.status(200).send(data))
      .catch(error => {
        console.log(error);
        response.status(400).send(error)
      })
};

exports.byId = (request, response) => {
  const enquiryId = request.params.id;

  Enquiry.findOne({ _id: enquiryId }, (error, data) => {
    if (error || !data._id) {
      return handle404(response, error);
    }
    return response.status(200).json(data);
  });
};

exports.remove = (req, res) => {

  Enquiry.findOne({
    _id: req.params.id,
  }).then((item) => {
    item.isDeleted = true;
    item.save((err) => {
      if (err) console.log("Error", err);
      const back = {
        status: 200,
        message: "Deleted Successfully",
      };
      return res.status(200).json(back);
    });
  });
};

exports.updateEnquiry = (request, response) => {
  const enquiryInfo = request.body;
  Enquiry.findOneAndUpdate({ _id: enquiryInfo.id }, enquiryInfo, (error, data) => {
    if (error || !data) {
      return handle404(response, error);
    }
    const back = {
      status: 200,
      message: "Updated Successfully",
    };
    return response.status(200).json(back);
  });
};
