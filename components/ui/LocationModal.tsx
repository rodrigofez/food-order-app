import { FC, useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import BarButton from "./BarButton";






const MapContainer = dynamic<any>(() => import('react-leaflet').then((module) => module.MapContainer),
    { ssr: false });
const Marker = dynamic<any>(() => import('react-leaflet').then((module) => module.Marker),
    { ssr: false });
const Popup = dynamic<any>(() => import('react-leaflet').then((module) => module.Popup),
    { ssr: false });
const TileLayer = dynamic<any>(() => import('react-leaflet').then((module) => module.TileLayer),
    { ssr: false });





interface Props {
    show: boolean;
    handleClose: () => void;
}

export const LocationModal: FC<Props> = ({ show = false, handleClose }) => {
    const position = [13.68935, -89.18718]


    return show ? (
        <ModalContainer>
            <div className="z-40 w-full h-screen fixed top-0 left-0
                flex justify-center items-center">
                <div className="bg-white fixed z-50 w-11/12 h-4/6 md:w-3/4 md:h-3/4 
                rounded-3xl overflow-hidden border flex flex-col justify-between">
                    <div className="pt-4 flex justify-center items-center font-bold text-lg">
                        Selecciona tu ubicación
                    </div>

                    <MapContainer style={{ height: '60%', width: '100%' }} center={position} zoom={13}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                    <div className="p-6">
                        <BarButton title="Seleccionar" />
                    </div>

                </div>
                <div className="z-30 bg-black w-full h-screen fixed 
                top-0 left-0 bg-opacity-25 cursor-pointer"
                    onClick={handleClose}>
                </div>
            </div>
        </ModalContainer>
    ) : null;

}


export default LocationModal;