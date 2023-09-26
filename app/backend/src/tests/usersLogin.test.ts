import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Token from '../auth/Token';
import User from '../database/models/Users';
import { user , payload, token } from './mocks/user.mock';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota Login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Ao enviar o um usuário com email e senha retorna um token', async () => {
    sinon.stub(User, 'findOne').resolves(User.build(user))

    const response = await chai.request(app)
      .post('/login')
      .send({ email: user.email, password: 'secret_admin'});

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
  });

  it('Ao enviar o um usuário sem email retorna uma mensagem de erro', async () => {
    sinon.stub(User, 'findOne').resolves(User.build(user))

    const response = await chai.request(app)
      .post('/login')
      .send({ password: 'secret_admin' });

    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.eq({ message: 'All fields must be filled' });
  });

  it('Ao enviar o um usuário sem password retorna uma mensagem de erro', async () => {
    sinon.stub(User, 'findOne').resolves(User.build(user))

    const response = await chai.request(app)
      .post('/login')
      .send({ email: user.email });

    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.eq({ message: 'All fields must be filled' });
  });

  it('Ao enviar o um usuário com email inválido retorna uma mensagem de erro', async () => {
    sinon.stub(User, 'findOne').resolves(User.build(user))

    const response = await chai.request(app)
      .post('/login')
      .send({ email:  'a@a', password: 'secret_admin' });

    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.eq({ message: 'Invalid email or password' });
  });

  it('Ao enviar o um usuário com password inválido retorna uma mensagem de erro', async () => {
    sinon.stub(User, 'findOne').resolves(User.build(user))

    const response = await chai.request(app)
      .post('/login')
      .send({ email: user.email, password: 'secret_adm' });

    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.eq({ message: 'Invalid email or password' });
  });

  describe('Rota /login/role', () => {
    it('ao enviar o token válido retora o role do usuário', async () => {
      sinon.stub(Token.prototype, 'verify').returns(payload)
      const response = await chai.request(app).get('/login/role')
        .set('authorization', `Bearer ${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.deep.eq({ role: 'admin' });
    })

    it('caso token não seja encontrado, retorna uma mensagem de erro', async () => {
      sinon.stub(Token.prototype, 'verify').returns(payload)
      const response = await chai.request(app).get('/login/role')
        .set('authorization', '');

    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.eq({ message: 'Token not found' });
    })

    // it('caso token seja inválido, retorna uma mensagem de erro', async () => {
    //   sinon.stub(Token.prototype, 'verify').returns(payload)
    //   const response = await chai.request(app).get('/login/role')
    //     .set('authorization', `invalid token`);

    // expect(response).to.have.status(401);
    // expect(response.body).to.be.deep.eq({ message: 'Token must be a valid token' });
    // })
  })
});
