import bankConstants from '../constants/constants';
import { EventEmitter } from 'fbemitter';
import AppDispatcher from '../dispatchers/AppDispatcher';

const CHANGE_EVENT = 'change';
let _emitter = new EventEmitter();
let balance = 0;

let BankBalanceStore = {
  getState() {
    return balance;
  },
  addListener: (callback) => {
    return _emitter.addListener(CHANGE_EVENT, callback);
  }
};

BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
  switch(action.type) {
    case bankConstants.CREATED_ACCOUNT:
      balance = 0;
      _emitter.emit(CHANGE_EVENT);
      break;
    case bankConstants.DEPOSITED_INTO_ACCOUNT:
      balance = balance + action.ammount;
      _emitter.emit(CHANGE_EVENT);
      break;
    case bankConstants.WITHDREW_FROM_ACCOUNT:
      balance = balance - action.ammount;
      _emitter.emit(CHANGE_EVENT);
      break;
  }
});

export default BankBalanceStore;
