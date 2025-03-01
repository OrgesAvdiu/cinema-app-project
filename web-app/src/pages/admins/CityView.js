import CustomMaterialTable from "../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { SelectTableCell, TextFieldTableCell } from "../../component/TableCells";
import { QueryKeys } from "../../services/QueryKeys";
import { CityService } from "../../services/CityService";
import { OffersService } from "../../services/OffersService";
import { useQuery } from "react-query";

const cityService = new CityService();
const offerService = new OffersService();
export default function CityView({}) {
  const errorRef = useRef();
const {data: allOfers} = useQuery(QueryKeys.OFFER, () => offerService.findAll());
  const columns = [
   {
      title: "Name",
      field: "name",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
   },
   {
    title: "Offer",
    field: "offer",
    render: (rowData) => rowData.offer?.title,
    editComponent: (props) =>
      SelectTableCell(
        props,
        errorRef,
        allOfers?.map((x) => ({ value: x, label: x.title })) || [],
        "id",
      ),
  },
  ];

  return (
    <CustomMaterialTable
      title="Manage Cities"
      columns={columns}
      service={cityService}
      queryKey={QueryKeys.CITY}
      errorRef={errorRef}
      // disableDeleteAction
    />
  );
}
