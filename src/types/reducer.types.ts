import { HomeStateProps } from 'src/screens/home/home.reducer';

export type Action = {
    type: string,
    data: any,
}

export type GlobalState = {
    home: HomeStateProps
}