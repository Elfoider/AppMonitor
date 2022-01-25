/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react';
import {map} from 'lodash';
import {Link, useParams} from 'react-router-dom';
import {ContentHeader} from '@components';
import {Button} from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {collection, onSnapshot, getFirestore, query, orderBy} from 'firebase/firestore';
import app from '../utils/Firebase';

const db = getFirestore(app);

const Blank = () => {
    const [ArrayD, setArray] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        onSnapshot(query(collection(db, id), orderBy('id', 'desc')), (response) => {
            const arrayAux = [];
            map(response?.docs, (datos) => {
                const data = datos.data();
                data.id = datos.id;
                arrayAux.push(data);
            });
            setArray(arrayAux);
        });
    }, [setArray]);
    const ArrLabels = [];
    const ArrVBat = [];
    const ArrVPanel = [];
    const ArrPresion = [];
    const ArrTemperatura = [];
    ArrayD.forEach((x) => {
        ArrLabels.push(
            `${x.fecha} ${x.hora}`
        );
        ArrVBat.push(x.vbat);
        ArrVPanel.push(x.vpanel);
        ArrPresion.push(x.presion);
        ArrTemperatura.push(x.temperatura);
    });
    console.log(ArrVBat);
    const chartData = {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: `Grafica Historica del equipo ${id}`
        },
        yAxis: [
            {
                title: {
                    text: 'V/Bateria'
                }
            },
            {
                title: {
                    text: 'V/Panel'
                }
            },
            {
                title: {
                    text: 'Presion'
                },
                opposite: true
            },
            {
                title: {
                    text: 'Temperatura'
                },
                opposite: true
            }
        ],
        xAxis: {
			labels: {
				enabled: false
			},
            categories: ArrLabels
        },

        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'top',
			borderWidth: 0
        },

        series: [
            {
                yAxis: 0,
                name: 'V/Bateria',
                data: ArrVBat
            },
            {
                yAxis: 1,
                name: 'V/Panel',
                data: ArrVPanel
            },
            {
                yAxis: 2,
                name: 'Presion',
                data: ArrPresion
            },
            {
                yAxis: 3,
                name: 'Temperatura',
                data: ArrTemperatura
            }
        ]
    };
    return (
        <div>
            <section className="content">
                <div className="margin-graph">
                    <Button
                        as={Link}
                        to={`/historico/${id}`}
                        variant="secondary"
                    >
                        Regresar
                    </Button>
                </div>
                <HighchartsReact highcharts={Highcharts} options={chartData} />
            </section>
        </div>
    );
};

export default Blank;
