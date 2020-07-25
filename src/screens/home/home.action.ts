import { Utils }                                                     from 'src/helper/utils';
import Api                                                           from 'src/libs/api';
import { CLUSTER_ALL_NODES_FETCHED, CLUSTER_NODE_NEIGHBOUR_FETCHED } from 'src/screens/home/home.constant';

export const fetchAllNodes = () => {
    return (dispatch: Function) => {
        return Api.get('/cluster').then(({ data }) => {
            dispatch(
                {
                    type: CLUSTER_ALL_NODES_FETCHED,
                    data: data,
                },
            );
        }).catch(() => {
            dispatch(
                {
                    type: CLUSTER_ALL_NODES_FETCHED,
                    data: [],
                },
            );
        });
    };
};

export const resetCluster = (alert: any) => {
    return (dispatch: Function) => {
        return Api.delete(`/cluster`).then(() => {
            dispatch(fetchAllNodes());
        }).catch(({ response }) => {
            Utils.onError(response, alert);
        });
    };
};

export const getNeighbours = (name: string, alert: any) => {
    return (dispatch: Function) => {
        return Api.get(`/cluster/node/neighbours?name=${ name }`).then(({ data }) => {
            dispatch(
                {
                    type: CLUSTER_NODE_NEIGHBOUR_FETCHED,
                    data: {
                        neighbours : data,
                        currentNode: name,
                    },
                },
            );
        }).catch(({ response }) => {
            Utils.onError(response, alert);
        });
    };
};
export const deleteNode    = (name: string, ref: any, alert: any) => {
    return (dispatch: Function) => {
        return Api.delete(`/cluster/node?name=${ name }`).then(() => {
            ref.resetForm();
            dispatch(fetchAllNodes());
        }).catch(({ response }) => {
            Utils.onError(response, alert);
        });
    };
};

export const addNode = (request: any, ref: any, alert: any) => {
    return (dispatch: Function) => {
        return Api.post('/cluster/node', request).then(({ data }) => {
            dispatch(fetchAllNodes());
            ref.resetForm();
        }).catch(({ response }) => {
            Utils.onError(response, alert);
        });
    };
};