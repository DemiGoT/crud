import './home.css';
import React, { useEffect, useState } from 'react';
import { crudLoaded } from "../../actions/actions"
import CrudService from '../../services/crud-services';
import Spinner from "../spinner/spinner";
import { connect } from 'react-redux';

const { getCrud } = new CrudService();

const Home = ({ crud, crudLoadedFunc, dataLoaded }) => {

    const [loading, setLoading] = useState(!dataLoaded);

    useEffect(() => {
        if (!dataLoaded) {
            getCrud().then((crudData) => {
                crudLoadedFunc(crudData.data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="home">
            <div className="container">
                {loading &&
                    <Spinner />
                }
                {!loading &&
                    <div className="crud-list row">
                        {
                            crud.map((post) => {
                                return (
                                    <div key={post.id} className="col crud-list-item">
                                        <div className="crud-list-item-img">
                                            <img className="img-thumbnail" src={post.image} alt="" />
                                        </div>
                                        <p className="crud-list-item__text">{post.title}</p>
                                        <p className="crud-list-item__text">{post.text}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = ({ crud, dataLoaded }) => {
    return { crud, dataLoaded };
};

const mapDispatchToProps = {
    crudLoadedFunc: crudLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
