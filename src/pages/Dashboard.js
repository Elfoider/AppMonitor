// eslint-disable-next-line react/prefer-stateless-function
import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {map, uniqueId} from 'lodash';
import {Link} from 'react-router-dom';
import {Table, Icon} from 'semantic-ui-react';
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import {ContentHeader} from '@components';
import app from '../utils/Firebase';

const db = getFirestore(app);

const Dashboard = () => {
    const [tableData, setTableData] = useState([]);
    const [Alarma, setAlarma] = useState(null);
    const [UpdateTime, setUpdateTime] = useState(null);
    const update = new Date().toLocaleTimeString();
    useEffect(() => {
        fetch('https://testingapps-2048c-default-rtdb.firebaseio.com/.json')
            .then((data) => data.json())
            .then((data) => setTableData(data));
        const timeId = setInterval(() => {
            fetch('https://testingapps-2048c-default-rtdb.firebaseio.com/.json')
                .then((data) => data.json())
                .then((data) => setTableData(data));
            const time = new Date().toLocaleTimeString();
            setUpdateTime(time);
        }, 15000);
        return () => clearInterval(timeId);
    }, []);
    useEffect(() => {
        getDocs(collection(db, 'Alarmas')).then((response) => {
            map(response?.docs, (datos) => {
                const data = datos.data();
                setAlarma(data);
            });
        });
    }, [setAlarma]);
    const arr = [];
    if (tableData) {
        Object.values(tableData).forEach((item) => {
            arr.push(item);
        });
    }
    let arrAlarm = {};
    if (Alarma) {
        Object.values(Alarma).forEach((item) => {
            arrAlarm = item;
        });
    }
    return (
        <div>
            <ContentHeader title="Vision General" />
            <div className="container-fluid">
                {tableData && (
                    <>
                        <span>{`Ultima vez actuaizado a las ${
                            UpdateTime || update
                        }`}</span>
                        <Table
                            compact
                            celled
                            striped
                            textAlign="center"
                        >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell className="id">
                                        ID
                                    </Table.HeaderCell>
                                    <Table.HeaderCell className="vbat">
                                        V/Bateria
                                    </Table.HeaderCell>
                                    <Table.HeaderCell className="vpanel">
                                        V/Panel
                                    </Table.HeaderCell>
                                    <Table.HeaderCell className="pressure">
                                        Presion
                                    </Table.HeaderCell>
                                    <Table.HeaderCell className="temp">
                                        Temperatura
                                    </Table.HeaderCell>
                                    <Table.HeaderCell className="input">
                                        Input
                                    </Table.HeaderCell>
                                    <Table.HeaderCell className="output">
                                        Output
                                    </Table.HeaderCell>
                                    <Table.HeaderCell className="status">
                                        Estado
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {map(arr, (items) => (
                                    <Table.Row key={uniqueId()}>
                                        <Table.Cell selectable>
                                            <Link
                                                to={`/historico/${items.zona}`}
                                            >
                                                {items.zona}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell
                                            className={classNames({
                                                down:
                                                    items.vbat <=
                                                    arrAlarm.vbatbaja,
                                                up:
                                                    items.vbat >=
                                                    arrAlarm.vbatalta,
                                                normal:
                                                    items.vbat >
                                                        arrAlarm.vbatbaja &&
                                                    items.vbat <
                                                        arrAlarm.vbatalta
                                            })}
                                        >
                                            <span>{items.vbat}</span>
                                        </Table.Cell>
                                        <Table.Cell
                                            className={classNames({
                                                down:
                                                    items.vpanel <=
                                                    arrAlarm.vpanelbaja,
                                                up:
                                                    items.vpanel >=
                                                    arrAlarm.vpanelalta,
                                                normal:
                                                    items.vpanel >
                                                        arrAlarm.vpanelbaja &&
                                                    items.vpanel <
                                                        arrAlarm.vpanelalta
                                            })}
                                        >
                                            <span>{items.vpanel}</span>
                                        </Table.Cell>
                                        <Table.Cell
                                            className={classNames({
                                                down:
                                                    items.presion <=
                                                    arrAlarm.presionbaja,
                                                up:
                                                    items.presion >=
                                                    arrAlarm.presionalta,
                                                normal:
                                                    items.presion >
                                                        arrAlarm.presionbaja &&
                                                    items.presion <
                                                        arrAlarm.presionalta
                                            })}
                                        >
                                            <span>{items.presion}</span>
                                        </Table.Cell>
                                        <Table.Cell
                                            className={classNames({
                                                down:
                                                    items.temperatura <=
                                                    arrAlarm.temperaturabaja,
                                                up:
                                                    items.temperatura >=
                                                    arrAlarm.temperaturaalta,
                                                normal:
                                                    items.temperatura >
                                                        arrAlarm.temperaturabaja &&
                                                    items.temperatura <
                                                        arrAlarm.temperaturaalta
                                            })}
                                        >
                                            <span>{items.temperatura}</span>
                                        </Table.Cell>
                                        <Table.Cell
                                            className={
                                                items.input === 1
                                                    ? 'open'
                                                    : 'cerrado'
                                            }
                                        >
                                            {items.input === 1 ? (
                                                <span>ON</span>
                                            ) : (
                                                <span>OFF</span>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell
                                            className={
                                                items.output === 1
                                                    ? 'open'
                                                    : 'cerrado'
                                            }
                                        >
                                            {items.output === 1 ? (
                                                <span>ON</span>
                                            ) : (
                                                <span>OFF</span>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>Activo</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
