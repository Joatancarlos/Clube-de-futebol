import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Token from '../auth/Token';
import User from '../database/models/Users';
import { user , payload, token } from './mocks/user.mock';
import { app } from '../app';
import Matches from '../database/models/Matches';
import {
  allMatches,
  allMatchesInProgress,
  allMatchesFinished,
} from './mocks/matches.mock';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Rota GET sem filtro', async () => {
    sinon
    .stub(Matches, 'findAll')
    .resolves(Matches.bulkBuild(allMatches));
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(allMatches);
  });

  it('Rota GET com filtro inProgress = true', async () => {
    sinon
    .stub(Matches, 'findAll')
    .resolves(Matches.bulkBuild(allMatchesInProgress));
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(allMatchesInProgress);
  });

  it('Rota GET com filtro inProgress = false', async () => {
    sinon
    .stub(Matches, 'findAll')
    .resolves(Matches.bulkBuild(allMatchesFinished));
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(allMatchesFinished);
  });

  it('Rota PATCH altera o progresso da partida com sucesso', async () => {
    sinon
    .stub(Matches, 'findByPk')
    .resolves(Matches.build(allMatchesInProgress[0]));
    sinon
    .stub(Matches, 'update')
    .resolves();
    const validateToken = new Token().sign(payload);
    const response = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('authorization', `Bearer ${validateToken}`);
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq({ message: 'Finished' });
  });
})