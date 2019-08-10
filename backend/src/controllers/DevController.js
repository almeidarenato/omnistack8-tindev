const axios = require("axios");
const Dev = require("../models/Dev");
module.exports = {
  async index(req, res) {
    const { user } = req.headers;
    try {
      const loggedUser = await Dev.findById(user);
      const users = await Dev.find({
        $and: [
          { _id: { $ne: user } },
          { _id: { $nin: loggedUser.likes } },
          { _id: { $nin: loggedUser.dislikes } }
        ]
      });
      return res.json(users);
    } catch (error) {
      return res.json({ message: "Erro ao se conectar com a base de dados" });
    }
  },
  async store(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });
    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const { name, bio, avatar_url: avatar } = response.data;
    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar: avatar
    });
    //console.log(response.data);
    return res.json(dev);
  }
};
