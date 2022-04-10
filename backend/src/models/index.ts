import { Sequelize, Model, DataType } from 'sequelize';

const db = {};
const sequelize = new Sequelize(`mysql://${process.env.USER}:${process.env.PASSWORD}@mysql/${process.env.DATABASE}`);
