import React from 'react';
import styled, {css} from 'styled-components';
import { hslToCss } from '../common/colour';

const StyledColourInput = styled.div`
    display: block;
    position: relative;
    margin: 0;
    
    flex-grow: 1;
`;

const Target = styled.div.attrs(props => {
    // console.log(props.colour);
    return ({
    style: {
        backgroundColor: hslToCss.apply(null, props.colour) || '#fff',
        padding: '3px',
    }
});})`
    height: 100%;
    width: 100%;
    transition: 150ms ease;
    cursor: pointer;
    outline: none;
    /* background-color: ${props => props.colour}; */

    ${props => props.active && css`
        box-shadow: 
            inset 0 0 0 2px rgba(200,200,200,1),
            inset 0 0 0 4px rgba(255,255,255,1)
        ;
    `}
`;

export default class ColourInput extends React.Component {
    render() {
        return (
            <StyledColourInput>
                <Target
                    active={this.props.active}
                    colour={this.props.value}
                    data-id={this.props.index}
                    onClick={this.props.setActiveColour.bind(this)} />
            </StyledColourInput>
        )
    }
}