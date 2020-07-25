import { CLUSTER_ALL_NODES_FETCHED, CLUSTER_NODE_NEIGHBOUR_FETCHED } from 'src/screens/home/home.constant';
import { Action }                                                    from 'src/types/reducer.types';

export type HomeStateProps = {
    nodes: Array<any> | null,
    neighbourDetails: any
}

const defaultState: HomeStateProps = {
    nodes           : null,
    neighbourDetails: null,
};

export default function(state = defaultState, action: Action) {
    switch ( action.type ) {
        case CLUSTER_ALL_NODES_FETCHED:
            return Object.assign({}, state, {
                nodes: action.data,
            });
        case CLUSTER_NODE_NEIGHBOUR_FETCHED:
            return Object.assign({}, state, {
                neighbourDetails: action.data,
            });
        default:
            return state;
    }
}