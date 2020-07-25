import React, { Component }                                                from 'react';
import { AlertComponentProps, AlertManager, withAlert }                    from 'react-alert';
import { Hexagon, HexGrid, Layout, Text }                                  from 'react-hexgrid';
import { connect }                                                         from 'react-redux';
import Header                                                              from 'src/components/header';
import Sidebar                                                             from 'src/components/sidebar';
import { addNode, deleteNode, fetchAllNodes, getNeighbours, resetCluster } from 'src/screens/home/home.action';
import { CLUSTER_NODE_NEIGHBOUR_FETCHED }                                  from 'src/screens/home/home.constant';
import { HomeStateProps }                                                  from 'src/screens/home/home.reducer';
import { GlobalState }                                                     from 'src/types/reducer.types';
import './home.style.scss';

interface HomeProps extends HomeStateProps, AlertComponentProps {
    fetchAllNodes: Function,
    addNode: Function,
    alert: AlertManager,
    getNeighbours: Function,
    deleteNode: Function,
    resetCluster: Function,
    clearNeighbors: Function
}

class Home extends Component<HomeProps> {
    
    public componentDidMount(): void {
        this.props.fetchAllNodes();
    }
    
    getHexColor = (name: string) => {
        const { neighbourDetails } = this.props;
        if ( neighbourDetails ) {
            if ( neighbourDetails.currentNode === name ) {
                return 'blue';
            } else if ( neighbourDetails.neighbours.length > 0 ) {
                const filteredNode = neighbourDetails.neighbours.filter((neighbour: any) => neighbour.name === name);
                if ( filteredNode && filteredNode.length > 0 ) {
                    return 'red';
                }
            }
        }
        return 'burlywood';
    };
    
    renderCluster() {
        const { nodes } = this.props;
        if ( !nodes ) {
            return null;
        }
        if ( nodes && nodes.length === 0 ) {
            return null;
        }
        return (
            <HexGrid width={ 950 }>
                <Layout size={ { x: 4, y: 4 } } flat={ true } spacing={ 1.1 }>
                    {
                        nodes?.map((node: any) => {
                            const q = node.x;
                            const r = node.y - (node.x + (node.x & 1)) / 2;
                            const s = -q - r;
                            
                            return (
                                <React.Fragment>
                                    <Hexagon key={ node.name } q={ q } r={ r } s={ s } cellStyle={ { fill: this.getHexColor(node.name) } }>
                                        <Text className='home-hex-name'>{ node.name }</Text>
                                    </Hexagon>
                                </React.Fragment>
                            );
                        })
                    }
                </Layout>
            </HexGrid>
        );
    }
    
    renderSidebar() {
        const { nodes, alert, getNeighbours, addNode, deleteNode, resetCluster, clearNeighbors } = this.props;
        if ( !nodes ) {
            return null;
        }
        return (<Sidebar nodes={ nodes }
                         alert={ alert }
                         resetCluster={ resetCluster }
                         addNode={ addNode }
                         clearNeighbors={ clearNeighbors }
                         getNeighbours={ getNeighbours } deleteNode={ deleteNode }/>);
    }
    
    render() {
        
        return (
            <React.Fragment>
                <Header/>
                <div className='d-flex home-body'>
                    <div className='flex-grow-1'>
                        { this.renderCluster() }
                    </div>
                    <div className='bg-light w-25 border-left overflow-auto'>
                        { this.renderSidebar() }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps    = (state: GlobalState) => {
    return {
        nodes           : state.home.nodes,
        neighbourDetails: state.home.neighbourDetails,
    };
};
const mapDispatchToProps = (dispatch: Function) => {
    return {
        fetchAllNodes : () => dispatch(fetchAllNodes()),
        addNode       : (request: any, ref: any, alert: any) => dispatch(addNode(request, ref, alert)),
        getNeighbours : (name: string, alert: any) => dispatch(getNeighbours(name, alert)),
        deleteNode    : (name: string, ref: any, alert: any) => dispatch(deleteNode(name, ref, alert)),
        resetCluster  : (alert: any) => dispatch(resetCluster(alert)),
        clearNeighbors: () => dispatch({ type: CLUSTER_NODE_NEIGHBOUR_FETCHED })
}
    ;
};
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(Home));