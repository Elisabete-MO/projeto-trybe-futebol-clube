// import NotFoundError from '../../middlewares/errors/notFound.error';
// import UnprocessableContentError from '../../middlewares/errors/unprocessable.error';
// import InvalidParamsError from '../../middlewares/errors/invalidParams.error';
// import { IBoard } from '../interfaces/IBoardService';
// import IBoardValidations from '../interfaces/IBoardValidations';
// import { ITeamWithId } from '../interfaces/ITeamService';

// export default class BoardValidations implements IBoardValidations {
//   validateNumbers = (data: IBoard): void => {
//     if (
//       typeof data.homeTeamId !== 'number'
//       || typeof data.awayTeamId !== 'number'
//       || typeof data.homeTeamGoals !== 'number'
//       || typeof data.awayTeamGoals !== 'number'
//     ) {
//       throw new InvalidParamsError('All teams IDs and goals must be numbers');
//     }
//   };

//   validateIds = (data: IBoard): void => {
//     if (
//       data.homeTeamId === data.awayTeamId) {
//       throw new
//       UnprocessableContentError('It is not possible to create a board with two equal teams');
//     }
//   };

//   validateTeams = (homeTeamExists: ITeamWithId, awayTeamExist: ITeamWithId): void => {
//     if (!homeTeamExists || !awayTeamExist) {
//       throw new NotFoundError('There is no team with such id!');
//     }
//   };

//   validateBoard(data: IBoard, homeTeamExists: ITeamWithId, awayTeamExist: ITeamWithId): void {
//     this.validateNumbers(data);
//     this.validateIds(data);
//     this.validateTeams(homeTeamExists, awayTeamExist);
//   }
// }
