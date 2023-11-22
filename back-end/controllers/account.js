import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { sequelize } from "../../models";
import { Account } from "../../models";

let clients = [];

export function sendConnectionEvents(clientKey, error) {
  clients.forEach((client) => {
    if (client.id === clientKey) {
      console.log("client", client.response);
      if (error) {
        client.response.write(`error: ${error}\n\n`);
      } else {
        client.response.write(`data: Connected complete!\n\n`);
      }
      client.response.end();
    }
  });
}

const AccountController = {
  register: async (req, res) => {
    try {
      const { email, username, password, role } = req.body;
      const existingUser = await Account.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email already registered' });
      }
      const newUser = await Account.create({
        email,
        username,
        password,
        role,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Account.findOne({
        where: {
          username: username,
          password: password,
        },
      });

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials' });
      }
      return res.status(StatusCodes.OK).json({ status: 'Login successfully!', user });
    } catch (err) {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  logout: async (req, res) => {},
};

export default AccountController;
