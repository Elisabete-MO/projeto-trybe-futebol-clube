import { Request, Response, NextFunction } from 'express';

const requiredFields = {
  login: ['email', 'password'],
  team: ['teamName'],
  username: ['username', 'role', 'email', 'password'],
  matches: ['homeTeamId', 'awayTeamId'],
  goals: ['homeTeamGoals', 'awayTeamGoals'],
};

const verifyRequiredFields = (key: keyof typeof requiredFields) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    for (let i = 0; i < requiredFields[key].length; i += 1) {
      if (!req.body[requiredFields[key][i]]) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }
    next();
  };

const verifyGoals = (key: keyof typeof requiredFields) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    for (let i = 0; i < requiredFields[key].length; i += 1) {
      if (req.body[requiredFields[key][i]] === null) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }
    next();
  };

export { verifyRequiredFields, verifyGoals };
