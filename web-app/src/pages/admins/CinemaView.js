import CustomMaterialTable from "../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { TextFieldTableCell } from "../../component/TableCells";
import { QueryKeys } from "../../services/QueryKeys";
import { useQuery } from "react-query";
import { SelectTableCell } from "../../component/TableCells";
import { CinemaService } from "../../services/CinemaService";
import {RoomService} from "../../services/RoomService";

const cinemaService = new CinemaService();
const roomService = new RoomService();
export default function CinemaView({}) {
  const errorRef = useRef();
  const {data: allRooms} = useQuery(QueryKeys.ROOM, () => roomService.findAll());
  const columns = [
    {
      title: "Name",
      field: "name",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Location",
      field: "location",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "ContanctInfo",
      field: "contanctInfo",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Room",
      field: "room",
      render: (rowData) => rowData.room?.roomNumber,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allRooms?.map((x) => ({ value: x, label: x.roomNumber })) || [],
          "id",
        ),
    },
  ];

  return (
    <CustomMaterialTable
      title="Manage Cinema"
      columns={columns}
      service={cinemaService}
      queryKey={QueryKeys.CINEMA}
      errorRef={errorRef}
      // disableDeleteAction
    />
  );
}
