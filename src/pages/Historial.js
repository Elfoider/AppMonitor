import React, {useEffect, useState} from 'react';
import {map, uniqueId} from 'lodash';
import {Link, useParams} from 'react-router-dom';
import {Icon, Table} from 'semantic-ui-react';
import {collection, getDocs, getFirestore, orderBy, query, onSnapshot} from 'firebase/firestore';
import {Button} from 'semantic-ui-react';
import {ContentHeader} from '@components';
import app from '../utils/Firebase';

const db = getFirestore(app);

export default function Historial() {
    const [ArrayD, setArray] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        onSnapshot(query(collection(db, id), orderBy('id', 'desc')), (response) => {
            const arrayAux = [];
            map(response?.docs, (datos) => {
                const data = datos.data();
                arrayAux.push(data);
            });
            setArray(arrayAux);
        });
    }, [setArray]);
    console.log(ArrayD);
    return (
        <div>
            <ContentHeader title="Vision Historica" />
            <div className="margin-table">
                <Button className="btn-plot" as={Link} to={`/blank/${id}`}>
					<Icon name='chart area' />
					 PLOT
                </Button>

                <Table compact celled striped textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className="id">
                                Fecha
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
                        {map(ArrayD, (item) => (
                            <Table.Row key={uniqueId()}>
                                <Table.Cell>{`${item.fecha} \n ${item.hora}`}</Table.Cell>
                                <Table.Cell>{item.vbat}</Table.Cell>
                                <Table.Cell>{item.vpanel}</Table.Cell>
                                <Table.Cell>{item.temperatura}</Table.Cell>
                                <Table.Cell>{item.presion}</Table.Cell>
                                <Table.Cell>{item.input}</Table.Cell>
                                <Table.Cell>{item.output}</Table.Cell>
                                <Table.Cell>Activo</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}
