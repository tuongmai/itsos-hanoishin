import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Matching, Account } from "../../models";

const ProfileController = {
  profileView: async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming the user id is passed in the request parameters

      // Retrieve all matching tours for the specified user id
      const user = await Account.findAll({
        where: { id: userId },
      });
  
      return res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        console.error(error);
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
    }
};

export default ProfileController;
