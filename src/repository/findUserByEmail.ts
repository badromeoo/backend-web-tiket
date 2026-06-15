import userModel from "../model/user.model.ts";

function findUserByEmail(email: string) {
 return userModel.findOne({email});
}

export default findUserByEmail;
