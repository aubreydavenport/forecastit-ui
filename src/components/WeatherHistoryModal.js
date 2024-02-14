import React, {useCallback, useEffect, useRef} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
function WeatherHistoryModal({city}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [rowData, setRowData] = React.useState([]);
    const [isLoading, setIsloading] = React.useState(true);
    const gridRef = useRef();

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }
    const columnDefs = [
        { headerName: 'Days Ago*', field: 'daysAgo' },
        { headerName: 'Temperature (°F)', field: 'temp' },
        { headerName: 'Main Weather', field: 'main' },
        { headerName: 'Description', field: 'desc' }
    ];

    const gridOptions = {
        overlayLoadingTemplate: '<span>Loading...</span>',
        suppressHorizontalScroll: false,
    };

    useEffect(() => {
        fetch(window.host + "/past/weather?city=" + city)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unsuccessful call to /past/weather API");
                }
                return response.json();
            })
            .then(data => {
                setRowData(data);
            })
            .catch(error => {
                console.log("Errors: ", error);
            })
            .finally(() => {
                setIsloading(false);
            });
    }, [city]);

    const exportWeather = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);

    return(
        <>
            <Button variant="primary" onClick={toggleModal}>
                View Last Week's Weather
            </Button>
            <Modal show={modalOpen} onHide={toggleModal} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Last Week's Weather</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="ag-theme-alpine" style={{height: '500px', width: '100%'}}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={isLoading ? null : rowData}
                            gridOptions={gridOptions}
                            ref={gridRef}
                        />
                    </div>
                    <p>(*Incremented in exact 24 hour periods from current time)</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={exportWeather}>
                        Export
                    </Button>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default WeatherHistoryModal;