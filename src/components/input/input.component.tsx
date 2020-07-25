import { ErrorMessage, Field } from 'formik';
import React, { Component }    from 'react';
import 'src/components/input/input.style.scss';

type AInputProps = {
    id: string,
    label?: string,
    placeholder?: string,
    errors: any,
    touched: any,
    values: any,
}

class AInput extends Component<AInputProps> {
    
    renderLabel(id: string, label?: string) {
        if ( !label ) {
            return null;
        }
        return (
            <label htmlFor={ id } className="mb-0"><strong>{ label }</strong></label>
        );
    }
    
    render() {
        
        const { id, label, values, placeholder, errors, touched } = this.props;
        const value                                               = (values[id] instanceof Object) ? values[id].value : values[id];
        return (
            <div className="w-100">
                { this.renderLabel(id, label) }
                <Field
                    as={ 'input' }
                    name={ id }
                    type={ 'text' }
                    value={ value }
                    placeholder={ placeholder || '' }
                    className={ `input-field form-control` + (errors[id] && touched[id] ? ' is-invalid' : '') }
                />
                <div className={ (errors[id] && touched[id] ? 'd-none' : 'input-error') }>&nbsp;</div>
                <ErrorMessage name={ id } component="div" className="invalid-feedback input-error-message"/>
            </div>
        );
    }
}

export default AInput;