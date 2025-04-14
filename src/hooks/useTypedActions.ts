import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { allActions } from '../store/action';

export const useTypedActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
