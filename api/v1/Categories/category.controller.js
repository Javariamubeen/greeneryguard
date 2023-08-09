const Category = require('../../../models').category;
exports.create = (request, response) => {
  const newCategory = request.body;
  Category.create(newCategory)
  .then(role => response.status(201).send(role))
  .catch(error => response.status(400).send(error));
};
exports.listCategories = (request, response) => {
  Category.findAll({where:{isDeleted:false} }).then(users => response.status(200).send(users))
      .catch(error => {
        console.log(error);
        response.status(400).send(error)
      });
};

exports.byId = (request, res) => {
  const productId = request.params.id;
  Category.findOne({where :{id:productId}})
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return res.status(200).send(product);
      })
      .catch(error => res.status(400).send(error));
};

exports.remove = (req, res) => {
  Category.update({isDeleted:true},{where :{id: req.params.id}})
      .then((product) => res.status(200).send(product))  // Send back the updated todo.
      .catch((error) => { console.log("Error",error);
        res.status(400).send(error)});
};

exports.updateCategory = (req, res) => {
    const id=req.params.id;
    const userObj = req.body;
    Category.
    findOne({where:{id:id}})
        .then(user=>{
            if (!user) {
                return res.status(404).send({
                    message: 'Todo Not Found',
                });
            }
            return user.update(userObj)
                .then(() => res.status(200).send(user))  // Send back the updated todo.
                .catch((error) => { console.log("Error",error);
                    res.status(400).send(error)});
        })
        .catch((error) =>{console.log("Error",error); res.status(400).send(error)});
}
