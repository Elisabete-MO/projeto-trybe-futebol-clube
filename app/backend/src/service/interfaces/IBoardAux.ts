import { IMatchData } from './IBoardService';

export default interface IBoardAux {
  calculateRanking(matches: IMatchData[], type: 'string'): any
}
