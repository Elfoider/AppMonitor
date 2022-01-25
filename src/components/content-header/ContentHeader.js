import React from 'react';
import Logo from "../../assets/img/LogoSolinpet.png"

const ContentHeader = ({title}) => {
    return (
        <section className="content-header">
            <div className="container-fluid">
			<div className="row mb-2">
                    <div className="col-sm-6">
                        <span className='title-new'>{title}</span>
                    </div>
                    <div className="col-sm-6">
						<img src={Logo} className="logo float-sm-right" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentHeader;
