import React, {useCallback} from 'react';
import '@inovua/reactdatagrid-community/index.css';
import ReactDataGrid from '@inovua/reactdatagrid-community';

const columns = [
    {name: 'name', header: 'Name', minWidth: 50, defaultFlex: 2},
    {name: 'vbat', header: 'V/Bat', maxWidth: 1000, defaultFlex: 1},
    {name: 'vpanel', header: 'V/Panel', maxWidth: 1000, defaultFlex: 1},
    {name: 'press', header: 'Presion', maxWidth: 1000, defaultFlex: 1},
    {name: 'temp', header: 'Temperatura', maxWidth: 1000, defaultFlex: 1},
    {name: 'fecha', header: 'Fecha', maxWidth: 1000, defaultFlex: 1}
];

const gridStyle = {minHeight: 550};

const dataSource = [
    {
        id: 1,
        name: '00xxCC88-01',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    },
    {
        id: 2,
        name: '00xxCC88-02',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    },
    {
        id: 3,
        name: '00xxCC88-03',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    },
    {
        id: 4,
        name: '00xxCC88-04',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    },
    {
        id: 5,
        name: '00xxCC88-05',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    },
    {
        id: 6,
        name: '00xxCC88-06',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    },
    {
        id: 7,
        name: '00xxCC88-07',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    },
    {
        id: 8,
        name: '00xxCC88-08',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    },
    {
        id: 9,
        name: '00xxCC88-09',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    },
    {
        id: 10,
        name: '00xxCC88-10',
        vbat: 13,
        vpanel: 15,
        press: 50,
        temp: 40,
        fecha: '(2022/01/16) \n 11:26:00'
    }
];

const filterValue = [
    {name: 'name', operator: 'startsWith', type: 'string', value: ''},
    {name: 'vbat', operator: 'gte', type: 'number', value: ''},
    {name: 'vpanel', operator: 'gte', type: 'number', value: ''},
    {name: 'press', operator: 'gte', type: 'number', value: ''},
    {name: 'temp', operator: 'gte', type: 'number', value: ''},
    {
        name: 'fecha',
        operator: 'before',
        type: 'date',
        value: ''
    }
];

export default function DataTabla() {
    const [selected, setSelected] = useState({ 1: true, 2: true })

    const onSelectionChange = useCallback(({ selected: selectedMap, data }) => {
      setSelected(selectedMap)
    }, [])
    console.log(selected);
    return (
        <ReactDataGrid
            idProperty="id"
            columns={columns}
            defaultFilterValue={filterValue}
            pagination
            limit={5}
            dataSource={dataSource}
            checkboxColumn
            style={{
                minHeight: 323,
                gridStyle
            }}
        />
    );
}
