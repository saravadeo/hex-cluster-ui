import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon } from 'react-hexgrid';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-light shadow-sm">
                <a className="navbar-brand d-flex" href="#">
                    <HexGrid width={30} height={30}>
                        <Layout size={{ x: 48, y: 48 }}>
                            <Hexagon q={0} r={0} s={0} />
                        </Layout>
                    </HexGrid>
                    <div className='ml-3'>Welcome to Hex-Cluster</div>
                </a>
            </nav>
        );
    }
}

export default Header;