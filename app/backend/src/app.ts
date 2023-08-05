import express from 'express';
import http from 'http';
import errorMiddleware from './middlewares/error.middleware';
import teamRouter from './routes/team.router';
import loginRouter from './routes/login.router';
import userRouter from './routes/user.router';
import matchRouter from './routes/match.router';
import leaderBoardRouter from './routes/board.router';

class App {
  public app: express.Express;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(loginRouter);
    this.app.use(userRouter);
    this.app.use(teamRouter);
    this.app.use(matchRouter);
    this.app.use(leaderBoardRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.server = this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
