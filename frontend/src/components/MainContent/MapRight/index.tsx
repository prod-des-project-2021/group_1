import Showmap from "../../showmap/Showmap";

import { useContext } from "react";
import { StoresContext } from "../../../contexts/StoresContext";

interface Props {
    selectStore: (id: string) => any;
}

const MapRight: React.FC<Props> = ({selectStore}) => {

    const { stores } = useContext(StoresContext);

    return (
        <div style = {{height: '90vh', width: '40vw', borderRadius: '10px', overflow: 'hidden' }}>
            <Showmap stores={stores} selectStore = {selectStore}/>
        </div>

    );
};

export default MapRight;
