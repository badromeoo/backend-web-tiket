import userModel from "../model/user.model.ts";

function findUserByUserId(userId: string) {

return userModel.findOne({userId})
}

export default findUserByUserId;