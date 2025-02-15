import CustomMaterialTable from "../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { MultipleCheckboxTableCell, NumberFieldTableCell, PriceFieldTableCell,  TextFieldTableCell } from "../../component/TableCells";
import { QueryKeys } from "../../services/QueryKeys";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { RoomService } from "../../services/RoomService";


const roomService = new RoomService();
const initialStartTime = new Date(); 
const initialEndTime = new Date();
export default function RoomView({}) {
    const errorRef = useRef();

    const columns = [
        {
          title: "RoomNumber",
          field: "RoomNumber",
          editComponent: (props) => NumberFieldTableCell(props, errorRef),
        },
        {
          title: "Capacity",
          field: "Capacity",
          editComponent: (props) => NumberFieldTableCell(props, errorRef),
        },
        {
          title: "Features",
          field: "Features",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
    
            
      ];

      return (
        <CustomMaterialTable
          title="Manage Rooms"
          columns={columns}
          service={roomService}
          queryKey={QueryKeys.ROOM}
          errorRef={errorRef}
        />
      );
  }