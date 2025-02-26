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
      field: "Location",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "ContanctInfo",
      field: "ContanctInfo",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Room",
      field: "room",
      render: (rowData) => rowData.room?.RoomNumber,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allRooms?.map((x) => ({ value: x, label: x.name })) || [],
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
