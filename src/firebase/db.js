import { db } from './firebase'

import * as dateFormat from '../Utils/dateFormat'


// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');


// Sleep data API

export const doCreateNight = (id) =>
  db.ref(`sleep/${id}/records`).push({
    nightOf: dateFormat.getCurrentDate(),
    start: dateFormat.getCurrentDateAndTime(),
  });

export const doChangeStatus = (id, isSleeping) =>
  db.ref(`sleep/${id}/status`).set({
    sleeping: isSleeping,
  })