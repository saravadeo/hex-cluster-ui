import { combineReducers } from 'redux';
import homeReducer         from 'src/screens/home/home.reducer';

const app = combineReducers(
    {
        home: homeReducer,
    },
);

export default app;