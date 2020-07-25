import { Formik }           from 'formik';
import React, { Component } from 'react';
import AInput               from 'src/components/input';
import ASelect              from 'src/components/select';
import { BORDER }           from 'src/components/sidebar/sidebar.constant';
import { Utils }            from 'src/helper/utils';

import * as Yup from 'yup';

type SiderbarProps = {
    nodes: Array<any>,
    addNode: Function,
    alert: any,
    getNeighbours: Function,
    deleteNode: Function,
    resetCluster: Function,
    clearNeighbors: Function
}

class Sidebar extends Component<SiderbarProps> {
    
    addNodeForm: any;
    neighbourNodeForm: any;
    deleteNodeForm: any;
    
    constructor(props: any) {
        super(props);
        this.addNodeForm       = React.createRef();
        this.neighbourNodeForm = React.createRef();
        this.deleteNodeForm    = React.createRef();
    }
    
    renderDropdown(id: string, label: string, options: any, values: any,
                   setFieldTouched: any, setFieldValue: any, errors: any, touched: any) {
        return (
            <ASelect
                style={ { margin: '-.5rem 0 1rem 0' } }
                name={ id }
                label={ label }
                value={ values[id] }
                onChange={ setFieldValue }
                onBlur={ setFieldTouched }
                error={ errors[id] }
                touched={ touched[id] }
                options={ options }
            />
        );
    }
    
    onAddNode = (values: any) => {
        const request = Utils.createRequestFromObject(values);
        this.props.addNode(request, this.addNodeForm.current, this.props.alert);
    };
    
    createOptionFromNode = () => {
        const { nodes } = this.props;
        return nodes.map((node: any) => {
            return {
                value: node.name,
                label: node.name,
            };
        });
    };
    
    renderAddNodeForm() {
        return (
            <Formik
                initialValues={ {
                    name            : '',
                    existingNodeName: '',
                    border          : '',
                } }
                validationSchema={ Yup.object().shape(
                    {
                        name            : Yup.string().required('Node name required').length(2),
                        existingNodeName: Yup.object().required('Existing node required.'),
                        border          : Yup.object().required('Border required.'),
                    })
                }
                innerRef={ this.addNodeForm }
                onSubmit={ (values) => {
                    this.onAddNode(values);
                } }
            >
                { ({ errors, touched, values, setFieldTouched, setFieldValue, resetForm, submitForm }) => (
                    <div className='p-3 border-bottom'>
                        <AInput id='name' values={ values }
                                placeholder='2 character (a-z)'
                                label='New node name'
                                errors={ errors }
                                touched={ touched }/>
                        { this.renderDropdown('existingNodeName', 'Existing node',
                                              this.createOptionFromNode(), values, setFieldTouched, setFieldValue, errors, touched) }
                        { this.renderDropdown('border', 'Border',
                                              BORDER,
                                              values, setFieldTouched, setFieldValue, errors, touched) }
                        <div className='d-flex flex-row-reverse'>
                            <button className='btn btn-sm btn-secondary' onClick={ () => submitForm() }>Add Node</button>
                            <button className='btn btn-sm btn-secondary mr-3' onClick={ () => {
                                resetForm();
                            } }>Clear
                            </button>
                        </div>
                    </div>
                )
                }
            </Formik>
        );
    }
    
    getNeighbours = (values: any) => {
        const name = values.selectedNode.value;
        this.props.getNeighbours(name, this.props.alert);
    };
    
    renderNeighbourNodeForm() {
        return (
            <Formik
                initialValues={ {
                    selectedNode: '',
                } }
                validationSchema={ Yup.object().shape(
                    {
                        selectedNode: Yup.object().required('Please select node.'),
                    })
                }
                innerRef={ this.neighbourNodeForm }
                onSubmit={ (values) => {
                    this.getNeighbours(values);
                } }
            >
                { ({ errors, touched, values, setFieldTouched, setFieldValue, resetForm, submitForm }) => (
                    <div className='p-3 border-bottom'>
                        { this.renderDropdown('selectedNode', 'Select node',
                                              this.createOptionFromNode(), values, setFieldTouched, setFieldValue, errors, touched) }
                        <div className='d-flex flex-row-reverse'>
                            <button className='btn btn-sm btn-secondary' onClick={ () => submitForm() }>Get Neighbours</button>
                            <button className='btn btn-sm btn-secondary mr-3' onClick={ () => {
                                resetForm();
                                this.props.clearNeighbors();
                            } }>Clear
                            </button>
                        </div>
                    </div>
                )
                }
            </Formik>
        );
    }
    
    deleteNode = (values: any) => {
        const name = values.selectedNode.value;
        this.props.deleteNode(name, this.deleteNodeForm.current, this.props.alert);
    };
    
    renderDeleteNodeForm() {
        return (
            <Formik
                initialValues={ {
                    selectedNode: '',
                } }
                validationSchema={ Yup.object().shape(
                    {
                        selectedNode: Yup.object().required('Please select node.'),
                    })
                }
                innerRef={ this.deleteNodeForm }
                onSubmit={ (values) => {
                    this.deleteNode(values);
                } }
            >
                { ({ errors, touched, values, setFieldTouched, setFieldValue, resetForm, submitForm }) => (
                    <div className='p-3 border-bottom'>
                        { this.renderDropdown('selectedNode', 'Select node',
                                              this.createOptionFromNode(),
                                              values, setFieldTouched, setFieldValue, errors, touched) }
                        <div className='d-flex flex-row-reverse'>
                            <button className='btn btn-sm btn-secondary' onClick={ () => submitForm() }>Delete Node</button>
                            <button className='btn btn-sm btn-secondary mr-3' onClick={ () => resetForm() }>Clear</button>
                        </div>
                    </div>
                )
                }
            </Formik>
        );
    }
    
    resetCluster = () => {
        this.props.resetCluster();
    };
    
    renderResetCluster() {
        return (
            <div className='d-flex mt-3 justify-content-center align-items-center'>
                <button className='btn btn-sm btn-secondary' onClick={ this.resetCluster }>Reset Cluster</button>
            </div>
        );
    }
    
    render() {
        return (
            <div>
                { this.renderAddNodeForm() }
                { this.renderNeighbourNodeForm() }
                { this.renderDeleteNodeForm() }
                { this.renderResetCluster() }
            </div>
        );
    }
}

export default Sidebar;