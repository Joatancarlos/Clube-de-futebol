import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import allTeams from './mocks/teams.mock';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota Teams', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Rota Get com sucesso', async () => {
    sinon.stub(Teams, 'findAll')
    .resolves(allTeams.map(({ id, teamName }) => Teams.build({ id, teamName })));

    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(allTeams);
  });

  it('Rota Get/:id com sucesso', async () => {
    sinon.stub(Teams, 'findByPk').resolves(Teams.build(allTeams[6]));

    const response = await chai.request(app).get('/teams/7');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(allTeams[6]);

  });

  it('Rota Get/:id retorna uma mensagem de erro caso não ache o time', async () => {
    sinon.stub(Teams, 'findByPk').resolves(null);

    const response = await chai.request(app).get('/teams/20');
    expect(response.status).to.be.eq(404);
    expect(response.body).to.be.deep.equal({ message: 'team not found' });
  });
});
