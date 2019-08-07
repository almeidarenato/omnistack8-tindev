const Dev = require("../models/Dev");

module.exports = {
  async store(request, response) {
    const { user } = request.headers;
    const { devId } = request.params;
    console.log(request.params.devId);
    const loggedDev = await Dev.findById({ user });
    const targetDev = await Dev.findById({ devId });

    //console.log(targetDev);
    //if (!targetDev) {
    //  return response.status(400).json({ error: "Dev does not exists" });
    //}
    return response.json({ ok: true });
  }
};
