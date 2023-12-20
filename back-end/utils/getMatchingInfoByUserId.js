const { Matching, Account, MatchingLocation, Location } = require('../../models');

async function getMatchingInfoByUserId(currentUserId) {
  try {
    const matchingList = await Matching.findAll({
      order: [["matchingId", "ASC"]],
      include: [
        {
          model: Account,
          as: 'japUser',
          attributes: ['username'],
          where: {
            user_id: currentUserId,
          },
        },
        {
          model: Account,
          as: 'tourGuide',
          attributes: ['username', 'userId'],
        },
        {
          model: MatchingLocation,
          include: [
            {
              model: Location,
              attributes: ['locationId', 'name', 'address', 'description', 'image', 'averageRating'],
            },
          ],
        },
      ],
    });

    const formattedList = matchingList.map(formatMatchingInfo);

    return formattedList;
  } catch (error) {
    console.error('Error getting matching info:', error);
    throw error; // You can handle the error as needed
  }
}

function formatMatchingInfo(matching) {
  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split('/');
    return `${day}/${month}/${year}`;
  };
  return {
    key: matching.matchingId.toString(),
    matchingDate: formatDate(matching.matchingDate),
    tourGuideUserName: matching.tourGuide.username,
    tourGuide: matching.tourGuide,
    createdAt: formatDate(matching.createdAt),
    status: matching.status,
    location: matching.MatchingLocations,
  };
}

module.exports = { getMatchingInfoByUserId };
