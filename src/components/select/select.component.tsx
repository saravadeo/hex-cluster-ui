import React, { Component } from 'react';
import Select               from 'react-select';

type ASelectProps = {
    value: any,
    onChange: Function,
    onBlur: Function,
    error: any,
    touched: any,
    name: string,
    label?: string,
    options: any,
    style?: Object,
}

class ASelect extends Component<ASelectProps> {
    
    handleChange = (value: any) => {
        this.props.onChange(this.props.name, value);
    };
    
    handleBlur = () => {
        this.props.onBlur(this.props.name, true);
    };
    
    renderLabel(id: string, label?: string) {
        if ( !label ) {
            return null;
        }
        return (
            <label htmlFor={ id } className="mb-0"><strong>{ label }</strong></label>
        );
    }
    
    render() {
        const { name, label, options, style } = this.props;
        return (
            <div style={ style }>
                { this.renderLabel(name, label) }
                <Select
                    id={ name }
                    options={ options }
                    isMulti={ false }
                    onChange={ this.handleChange }
                    onBlur={ this.handleBlur }
                    value={ this.props.value }
                    styles={ {
                        control: (provided, state) => ({
                            ...provided,
                            border: !!(this.props.error && this.props.touched) ? '1px solid #e55353' : '1px solid #cccccc',
                        }),
                    } }
                    theme={ theme => ({
                        ...theme,
                        outline       : 0,
                        boxShadow     : '0 0 0 0.2rem rgba(43, 150, 136, 0.25)',
                        backgroundClip: 'padding-box',
                        border        : !!(this.props.error && this.props.touched) ? '1px solid #e55353' : '1px solid #e4e7ea',
                        colors        : {
                            ...theme.colors,
                            primary: 'rgba(43, 150, 136, 0.25)',
                        },
                    }) }
                />
                { !!(this.props.error &&
                     this.props.touched) ? (
                      <div style={ { fontSize: '80%', color: '#e55353' } }>{ this.props.error }</div>
                  ) : null }
            </div>
        );
    }
}

export default ASelect;