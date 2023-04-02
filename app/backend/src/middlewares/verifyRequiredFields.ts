import { Request, Response, NextFunction } from 'express';

const requiredFields = {
  team: ['teamName'],
  username: ['username', 'role', 'email', 'password'],
  matches: ['homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals'],
};

const verifyRequiredFields = (key: keyof typeof requiredFields) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    for (let i = 0; i < requiredFields[key].length; i += 1) {
      if (!req.body[requiredFields[key][i]]) {
        return res.status(400).json({ message: `${requiredFields[key][i]} is required` });
      }
    }
    next();
  };

export default verifyRequiredFields;
