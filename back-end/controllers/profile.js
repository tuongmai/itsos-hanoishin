import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { MatchingTour, Account } from "../../models";

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
    },
  cancelRequest: async (req, res) => {
    try {
      const matchingId = req.params.matchingId; // Assuming the matching tour id is passed in the request parameters

      // Find the matching tour by id
      const matchingTour = await MatchingTour.findByPk(matchingId);

      // If the matching tour is found, update the status to "cancel"
      if (matchingTour) {
        await matchingTour.update({ status: 'キャンセル' });

        return res.status(StatusCodes.OK).json({ message: 'Matching tour canceled successfully' });
      } else {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Matching tour not found' });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
};

export default ProfileController;
